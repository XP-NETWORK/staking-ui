import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useWeb3React} from '@web3-react/core'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {useParams} from 'react-router'
import Web3 from 'web3'

import {stakesGallery} from '../../utils/stake'
import Withdrawn from '../Claim/Parts/Withdrown/Withdrown'
import ClaimReward from '../Claim/Parts/ClaimReward.jsx/ClaimReward'
import ProgressBar from '../Claim/Parts/ProgressBar/ProgressBar'
import ClaimAmount from '../Claim/Parts/ClaimAmount/ClaimAmount'
import ClaimStart from '../Claim/Parts/ClaimStart/ClaimStart'
import ClaimAPY from '../Claim/Parts/ClaimAPY/ClaimAPY'
import Total from '../Claim/Parts/Total/Total'
import copy from '../../assets/FileCopy.svg'
import {stakes} from '../../utils/stake'
import End from '../Claim/Parts/End/End'
import './CollectionNFT.css'

export default function CollectionNFT() {
    const dispatch = useDispatch()
    const stakedAmount = useSelector((state) => state.stakeData.amount)
    const stakedAmountEther = Web3.utils.fromWei(stakedAmount, 'ether')
    const period = useSelector((state) => state.stakeData.duration)
    const startDate = useSelector((state) => state.stakeData.startDate)
    const startTime = useSelector((state) => state.stakeData.startTime)
    const selected = useSelector((state) => state.totalSupply.selectedNFT)
    const collection = useSelector((state) => state.totalSupply.collection)
    const loaded = useSelector((state) => state.totalSupply.loaded)
    const rewardWithdrawn = useSelector((state) => state.stakeData.rewardWithdrawn)
    const {library} = useWeb3React()
    const {id} = useParams()
    const [nftUrl, setNftUrl] = useState('')
    const [nftID, setNftID] = useState('')
    const [staker, setStaker] = useState('')
    const [exist, setExist] = useState(true)
    const reg = new RegExp('^[0-9]+$')
    const stakerAdd = useSelector((state) => state.totalSupply.selectedNFTStaker)
    // console.log("sdfsdfsdfsdfsdf", stakerAdd);

    const setPicture = () => {
        if (collection.length > 0) {
            if (reg.test(id)) {
                if (collection) {
                    setExist(true)
                    setNftUrl(collection[0].url)
                    setNftID(collection[0].token)
                    setStaker(collection[0].staker)
                } else {
                    setExist(false)
                }
            } else if (selected || selected === '0') {
                setExist(true)
                setNftUrl(collection[0].url)
                setNftID(collection[0].token)
                setStaker(collection[0].staker)
            }
        } else {
            setExist(false)
        }
    }

    useEffect(() => {
        if (reg.test(id)) {
            if (collection.length <= 1) {
                stakesGallery(id, library)
                stakes(id, library)
            }
        }
    }, [])

    useEffect(() => {
        if (loaded) setPicture()
    }, [loaded, collection])

    useEffect(() => {}, [nftUrl, nftID])

    const showNft = () => {
        if (exist) {
            if (!nftUrl) {
                return <div className="search__loader"></div>
            } else if (id) {
                return (
                    <div className="not-exist">
                        <span>NFT does not exist</span>
                    </div>
                )
            } else {
                return (
                    <>
                        <div className="nft-from-collection">
                            <div className="nft-from-collection__title">Staking Reward</div>
                            <div className="line"></div>
                            <div className="nft-from-collection__details">
                                <ClaimAmount
                                    stakedAmount={stakedAmount}
                                    stakedAmountEther={stakedAmountEther}
                                />
                                <ClaimAPY period={period} />
                                <ClaimReward />
                                <Total
                                    stakedAmount={stakedAmount}
                                    stakedAmountEther={stakedAmountEther}
                                    period={period}
                                />
                                <Withdrawn withdrawn={rewardWithdrawn} />
                                <ClaimStart startTime={startTime} />
                                <End startTime={startTime} period={period} startDate={startDate} />
                                <ProgressBar
                                    period={period}
                                    startTime={startTime}
                                    startDate={startDate}
                                />
                            </div>
                        </div>
                        <div className="nft-from-collection__view">
                            <div className="nft-from-collection__title">
                                NFT #{id ? id : selected}
                            </div>
                            <div className="line"></div>
                            <div className="nft-from-collection__content">
                                <div className="nft-from-collection__pic">
                                    <img src={nftUrl} alt={`NFT#${nftID}`} />
                                </div>
                                <div className="nft-from-collection__address">
                                    <div>
                                        {stakerAdd.slice(0, 26) + '...' + stakerAdd.slice(38, 46)}
                                    </div>
                                    <CopyToClipboard text={stakerAdd}>
                                        <span className="copy__search">
                                            <img src={copy} alt="" />
                                        </span>
                                    </CopyToClipboard>
                                </div>
                                <Link className="gallery__btn" to="/gallery">
                                    Back to Collection
                                </Link>
                            </div>
                        </div>
                    </>
                )
            }
        } else
            return (
                <div className="not-exist">
                    <span>NFT does not exist</span>
                </div>
            )
    }

    return <div className="nft-from-collection__container">{showNft()}</div>
}
