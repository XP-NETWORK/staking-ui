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
import { stakesGallery } from "../../utils/stake"
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getStakeById } from "../../utils/stake"
import { updateIndex, updateNftTokenIndex } from "../../redux/stakeSlice"
import { Link } from 'react-router-dom'


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
    
    const { id } = useParams()
    // console.log(id)
    
    const [nftUrl, setNftUrl] = useState('')
    const [nftID, setNftID] = useState('')
    const [staker, setStaker] = useState('')
    const [exist, setExist] = useState(true)

    
    const setPicture = () => {
        debugger
        if(collection.length > 0){
            const reg = new RegExp('^[0-9]+$');
            if(reg.test(id)){
                const index = parseInt(id) || parseInt(selected)

                if(collection.length <= index){
                    setExist(true)
                    setNftUrl(collection[0].url)
                    setNftID(collection[0].token)
                    setStaker(collection[0].staker)
                }
                else{
                    if(id){
                        setNftUrl(collection[index].url)
                        setNftID(collection[index].token)
                        setStaker(collection[index].staker)
                    }
                }
            }
            else if(selected){
                setNftUrl(collection[parseInt(selected)].url)
                setNftID(collection[parseInt(selected)].token)
                setStaker(collection[parseInt(selected)].staker)
            }
            else setExist(false)
        }
    }
    
    useEffect(() => {
        if(collection.length < 1){
            stakesGallery(id)
        }
        if(id){
            getStakeById(id, id)
            dispatch(updateIndex(id))
            dispatch(updateNftTokenIndex(id))  
        }
    }, [])

    const showNft = () => {
        // debugger
        if(exist){
            if(nftUrl){
                return <img src={nftUrl} alt={`NFT#${nftID}`} />
            }
            else return <div className="search__loader">Loading...</div>
        }
        else{
            return <div>NFT not exist</div>
        }
    }


    useEffect(() => {
        // debugger
       if(loaded)setPicture()
    }, [loaded, collection])
    
    useEffect(() => {
    }, [nftUrl, nftID ])

    return (
        <div className="search__container">
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
                        { showNft() }
                    </div>
                    <div className="staker">{staker.slice(0,26) + '...' + staker.slice(38,46)}</div>
                        <Link className="gallery__btn" to="/gallery">
                            Back to Collection
                        </Link>
                 </div>
             </div>
        </div>
    )
}
