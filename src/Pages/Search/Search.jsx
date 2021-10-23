import React, { useEffect, useState } from 'react'
import Web3 from "web3"
import ClaimAmount from '../Claim/Parts/ClaimAmount/ClaimAmount'
import ClaimAPY from '../Claim/Parts/ClaimAPY/ClaimAPY'
import ClaimReward from '../Claim/Parts/ClaimReward.jsx/ClaimReward'
import ClaimStart from '../Claim/Parts/ClaimStart/ClaimStart'
import End from '../Claim/Parts/End/End'
import ProgressBar from '../Claim/Parts/ProgressBar/ProgressBar'
import ClaimButton from '../Claim/Parts/ClaimButton/ClaimButton'
import UnStakeButton from '../Claim/Parts/UnStakeButton/UnStakeButton'
import { useSelector } from "react-redux"
import "./Search.css"
import Picture from '../Claim/Parts/Widget/Picture'
import { getStakeById, stakes } from "../../utils/stake"
import Total from '../Claim/Parts/Total/Total'
// import { useDispatch } from 'react-redux'
// import { updateIndex, updateNftTokenIndex } from "../../redux/stakeSlice"
// import {  goBack } from "../../redux/counterSlice"

export default function Search() {

    const stakedAmount = useSelector(state => state.stakeData.amount)
    const stakedAmountEther = Web3.utils.fromWei(stakedAmount, 'ether');
    const period = useSelector(state => state.stakeData.duration)
    const startDate = useSelector(state => state.stakeData.startDate)
    const startTime = useSelector(state => state.stakeData.startTime)
    const stakeInfo = useSelector(state => state.data.stakeInfo)
    // console.log("staker", stakeInfo[5])
    const rewardsWai = useSelector(state => state.stakeData.availableRewards)
    const address = useSelector(state => state.data.account)
    const [search, setSearch] = useState('')
    const searchHandler = (e) => {
        const pattern = new RegExp('^[0-9]+$')
        const input = Number(e.target.value)
        
        if(pattern.test(input)){
            setSearch(e.target.value)
        }
    }

    const onClickHandler = () => {
        stakes(search)
    }

    const flag = stakeInfo[5]==="0x0000000000000000000000000000000000000000" ? true : false

    useEffect(() => {
    }, [stakeInfo])

    return (
        <div className="search__container">
            <div className="claim">
            <div className="claim__title">Staking Reward</div>
                <div className="line"></div>
                { flag ? 
                <div className="claim__details">
                    <div className="not-exist">token not exist</div>
                </div>
                :
                <div className="claim__details">
                    <ClaimAmount stakedAmount={stakedAmount} stakedAmountEther={stakedAmountEther}/>
                    <ClaimAPY period={period} />
                    <ClaimReward />
                    <Total stakedAmount={stakedAmount} stakedAmountEther={stakedAmountEther}  period={period}/>
                    <ClaimStart startTime={startTime} />
                    <End startTime={startTime} period={period} startDate={startDate} />
                    <ProgressBar period={period} startTime={startTime} />
                    <ClaimButton stakeInfo={stakeInfo[1]} rewardsWai={rewardsWai} address={address} />
                    <UnStakeButton stakeInfo={stakeInfo[1]} address={address} stakerAddress={stakeInfo[5]} />
                </div>
                }
             </div>
             <div className="search">
                 <div className="search__title">Search</div>
                 <div className="line"></div>
                 <div className="nft__content">
                    <div className="nft__widget"><Picture id={flag ? -1 : stakeInfo[1]}/></div>
                    <div className="search__box">
                        <input onChange={(item) => searchHandler(item)} type="search" placeholder="Search NFT By ID"/>
                    <div onClick={() => onClickHandler()} className="search__btn">Search</div>
                 </div>
                 </div>
             </div>
        </div>
    )
}
