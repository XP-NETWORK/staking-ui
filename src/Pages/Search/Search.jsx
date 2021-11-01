import React, { useState } from 'react'
import Web3 from "web3"
import ClaimAmount from '../Claim/Parts/ClaimAmount/ClaimAmount'
import ClaimAPY from '../Claim/Parts/ClaimAPY/ClaimAPY'
import ClaimReward from '../Claim/Parts/ClaimReward.jsx/ClaimReward'
import ClaimStart from '../Claim/Parts/ClaimStart/ClaimStart'
import End from '../Claim/Parts/End/End'
import ProgressBar from '../Claim/Parts/ProgressBar/ProgressBar'
import ClaimButton from '../Claim/Parts/ClaimButton/ClaimButton'
import UnStakeButton from '../Claim/Parts/UnStakeButton/UnStakeButton'
import { useSelector, useDispatch } from "react-redux"
import "./Search.css"
import Total from '../Claim/Parts/Total/Total'
import Withdrawn from '../Claim/Parts/Withdrown/Withdrown'
import { totalSupply } from "../../utils/stake"
import { useEffect } from 'react'
import { useParams } from 'react-router'
import Loader from '../../Components/Loader/Loader'
import ButtonLoader from '../../Components/Loader/ButtonLoader'
import { getStakeById } from "../../utils/stake"
import { updateIndex, updateNftTokenIndex } from "../../redux/stakeSlice"


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
    const rewardsWai = useSelector(state => state.stakeData.availableRewards)
    const address = useSelector(state => state.data.account)
    
    const { id } = useParams()
    console.log(id)
    
    const [nftUrl, setNftUrl] = useState('')
    const [nftID, setNftID] = useState('')

    
    const setPicture = () => {
        debugger
        if(collection.length > 0){
            if(id){
                setNftUrl(collection[Number(id)].url)
                setNftID(collection[Number(id)].token)
            }
            else{
                setNftUrl(collection[Number(selected)].url)
                setNftID(collection[Number(selected)].token) 
            }
        }
    }
    
    useEffect(() => {
        if(collection.length < 1){
            totalSupply()
        }
        if(id){
            getStakeById(id, id)
            dispatch(updateIndex(id))
            dispatch(updateNftTokenIndex(id))  
        }
    }, [])

    


    useEffect(() => {
        debugger
       if(loaded)setPicture()
    }, [loaded])
    
    useEffect(() => {
    }, [nftUrl, nftID ])

    return (
        <div className="search__container">
            <div className="claim">
            <div className="claim__title">Staking Reward</div>
                <div className="line"></div>
                
                <div className="claim__details">
                    <ClaimAmount stakedAmount={stakedAmount} stakedAmountEther={stakedAmountEther}/>
                    <ClaimAPY period={period} />
                    <ClaimReward />
                    <Total stakedAmount={stakedAmount} stakedAmountEther={stakedAmountEther}  period={period}/>
                    <Withdrawn withdrawn={rewardWithdrawn} />
                    <ClaimStart startTime={startTime} />
                    <End startTime={startTime} period={period} startDate={startDate} />
                    <ProgressBar period={period} startTime={startTime} startDate={startDate} />
                    <ClaimButton stakeInfo={selected} rewardsWai={rewardsWai} address={address} />
                    <UnStakeButton stakeInfo={selected} address={address} stakerAddress={toString(selected)} />
                </div>
            
             </div>
             <div className="search">
                 <div className="search__title">NFT #{id ? id : selected}</div>
                 <div className="line"></div>
                 <div className="nft__content">
                    <div className="nft__pic">
                        { nftUrl ? <img src={nftUrl} alt={`NFT#${nftID}`} /> : <Loader />}
                    </div>
                 </div>
             </div>
        </div>
    )
}
