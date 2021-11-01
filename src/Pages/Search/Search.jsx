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
import { stakes } from "../../utils/stake"
import Total from '../Claim/Parts/Total/Total'
import Withdrawn from '../Claim/Parts/Withdrown/Withdrown'

// import { totalSupplay } from '../../redux/totalSupply'
import NFTAdres from '../Claim/Parts/NFTAdres/NFTAdres'


export default function Search() {

    const stakedAmount = useSelector(state => state.stakeData.amount)
    const stakedAmountEther = Web3.utils.fromWei(stakedAmount, 'ether');
    const period = useSelector(state => state.stakeData.duration)
    const startDate = useSelector(state => state.stakeData.startDate)
    const startTime = useSelector(state => state.stakeData.startTime)
    const selected = useSelector(state => state.totalSupply.selectedNFT)
    const collection = useSelector(state => state.totalSupply.collection)
    const rewardWithdrawn = useSelector(state => state.stakeData.rewardWithdrawn)
    const rewardsWai = useSelector(state => state.stakeData.availableRewards)
    const address = useSelector(state => state.data.account)
    const [search, setSearch] = useState('')
    const connectionToggler = useSelector(state => state.data.toggleConnection)
    // const params = useSelector(state => state.totalSupplay.params)


    
    const nft = collection[Number(selected)].url
    const nftID = collection[Number(selected)].token
    const staker = collection[Number(selected)].staker
    // console.log(nft[0].url);
    // {if(item.token === Number(selected)){return item.url}}

    const searchHandler = (e) => {
        const pattern = new RegExp('^[0-9]+$')
        const input = Number(e.target.value)
        
        if(pattern.test(input)){
            setSearch(e.target.value)
        }
    }

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
                 <div className="search__title">NFT #10</div>
                 <div className="line"></div>
                 <div className="nft__content">
                    <div className="nft__pic">
                        <img src={nft} alt={`NFT#${nftID}`} />
                    </div>
                 </div>
             </div>
        </div>
    )
}
