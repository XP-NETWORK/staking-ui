import React, { useState } from 'react'
import Web3 from "web3"
import ClaimAmount from '../Claim/Parts/ClaimAmount/ClaimAmount'
import ClaimAPY from '../Claim/Parts/ClaimAPY/ClaimAPY'
import ClaimReward from '../Claim/Parts/ClaimReward.jsx/ClaimReward'
import ClaimStart from '../Claim/Parts/ClaimStart/ClaimStart'
import End from '../Claim/Parts/End/End'
import ProgressBar from '../Claim/Parts/ProgressBar/ProgressBar'
import { useSelector, useDispatch } from "react-redux"
import "./Search.css"
import Total from '../Claim/Parts/Total/Total'
import Withdrawn from '../Claim/Parts/Withdrown/Withdrown'
import { stake, stakesGallery } from "../../utils/stake"
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getStakeById, stakes } from "../../utils/stake"
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core' 
import copy from "../../assets/FileCopy.svg"
import copyHover from"../../assets/CopyHover.svg"
import {CopyToClipboard } from 'react-copy-to-clipboard';


export default function Search() {
    const dispatch = useDispatch()
    const stakedAmount = useSelector(state => state.stakeData.amount)
    const stakedAmountEther = Web3.utils.fromWei(stakedAmount, 'ether');
    const period = useSelector(state => state.stakeData.duration)
    const startDate = useSelector(state => state.stakeData.startDate)
    const startTime = useSelector(state => state.stakeData.startTime)
    const selected = useSelector(state => state.totalSupply.selectedNFT)
    const collection = useSelector(state => state.totalSupply.collection)
    const loaded = useSelector(state => state.totalSupply.loaded)
    const rewardWithdrawn = useSelector(state => state.stakeData.rewardWithdrawn)
    const stakerAdd = useSelector(state => state.totalSupply.selectedNFTStaker)
    // console.log("sdfsdfsdfsdfsdf", stakerAdd);
    const {library, connector} = useWeb3React()
    const { id } = useParams()
    const [nftUrl, setNftUrl] = useState('')
    const [nftID, setNftID] = useState('')
    const [staker, setStaker] = useState('')
    const [exist, setExist] = useState(true)
    const reg = new RegExp('^[0-9]+$');


    const setPicture = () => {
        debugger
        if(collection.length > 0){
            if(reg.test(id)){
                if(collection){
                    setExist(true)
                    setNftUrl(collection[0].url)
                    setNftID(collection[0].token)
                    setStaker(collection[id].staker)
                }
                else{
                    setExist(false)
                }
            }
            else if(selected || selected == "0"){
                setExist(true)
                setNftUrl(collection[0].url)
                setNftID(collection[0].token)
                setStaker(collection[selected].staker)
            }
        }
        else{
            setExist(false)
        }
    }
    
    useEffect(() => {
        if(reg.test(id)){
            if(collection.length <= 1){
                stakesGallery(id, library)
                stakes(id, library)
            }
        }
    }, [])

    const showNft = () => {
       
        if(exist){
            if(!nftUrl) return <div className="search__loader"></div>
            else if(!nftUrl && id){
                <div className="not-exist"><span>NFT does not exist</span></div>
            }
            else{
                return <>
                    <div className="claim claim-search">
                    <div className="claim__title">Staking Reward</div>
                    <div className="line"></div>
                    <div className="search__details">
                        <ClaimAmount stakedAmount={stakedAmount} stakedAmountEther={stakedAmountEther}/>
                        <ClaimAPY period={period} />
                        <ClaimReward />
                        <Total stakedAmount={stakedAmount} stakedAmountEther={stakedAmountEther}  period={period}/>
                        <Withdrawn withdrawn={rewardWithdrawn} />
                        <ClaimStart startTime={startTime} />
                        <End startTime={startTime} period={period} startDate={startDate} />
                        <ProgressBar period={period} startTime={startTime} startDate={startDate} />
                    </div>
                
                    </div>
                    <div className="claim__search">
                        <div className="search__title">NFT #{id ? id : selected}</div>
                        <div className="line"></div>
                        <div className="claim__search__content">
                           <div className="nft__pic">
                               <img src={nftUrl} alt={`NFT#${nftID}`} />
                           </div>
                           
                           <div className="staker">
                                <CopyToClipboard text={stakerAdd}>
                                    <div>{stakerAdd.slice(0,26) + '...' + stakerAdd.slice(38,46)}</div>
                                </CopyToClipboard>
                                    <span className="copy__search"><img src={copy} alt="" /></span>
                            </div>
                            <Link className="gallery__btn" to="/gallery">
                                Back to Collection
                            </Link>
                        </div>
                    </div>
                </>
            }
        }
        else return <div className="not-exist"><span>NFT does not exist</span></div> 
    }


    useEffect(() => {
       if(loaded)setPicture()
    }, [loaded, collection])
    
    useEffect(() => {
    }, [nftUrl, nftID ])

    return (
        <div className="search__container">
            {showNft()}
        </div>
    )
}
