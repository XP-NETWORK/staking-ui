import React from 'react'
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

export default function Search() {

    const stakedAmount = useSelector(state => state.stakeData.amount)
    const stakedAmountEther = Web3.utils.fromWei(stakedAmount, 'ether');
    const period = useSelector(state => state.stakeData.duration)
    const startTime = useSelector(state => state.stakeData.startTime)
    const startDate = useSelector(state => state.stakeData.startDate)
    const stakeInfo = useSelector(state => state.data.stakeInfo)
    const rewardsWai = useSelector(state => state.stakeData.availableRewards)
    const address = useSelector(state => state.data.account)

    return (
        <div classNmae="search">
            <div className="claim">
                    <div className="claim__title">Staking Reward</div>
                    <div className="line"></div>
                    <div className="claim__details">
                        <ClaimAmount stakedAmount={stakedAmount} stakedAmountEther={stakedAmountEther}/>
                        <ClaimAPY period={period} />
                        <ClaimReward />
                        <ClaimStart startTime={startTime} />
                        <End startTime={startTime} period={period} startDate={startDate} />
                        <ProgressBar period={period} startTime={startTime} />
                        <ClaimButton stakeInfo={stakeInfo[1]} rewardsWai={rewardsWai} address={address} />
                        <UnStakeButton stakeInfo={stakeInfo[1]} address={address} stakerAddress={stakeInfo[5]} />
                    </div>
                </div>
        </div>
    )
}
