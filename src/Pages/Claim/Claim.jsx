import React, { useState } from 'react'
import Web3 from "web3"
import "./Claim.css"
import unlock from "../../assets/unlock.png"
import bigart from "../../assets/bigart.png"
import { useEffect } from 'react'
import { balanceOf, showAvailableRewards, claimXpNet, getStakeById, withrow } from "../../utils/stake"
import { useSelector } from "react-redux"
import { useHistory } from 'react-router'
import NFT from '../../Components/NFT/NFT'
import ClaimReward from '../../Components/ClaimReward.jsx/ClaimReward'
import ClaimAmount from './Parts/ClaimAmount'
import ClaimAPY from './Parts/ClaimAPY'
import ClaimStart from './Parts/ClaimStart'
import ProgressBar from './Parts/ProgressBar'
import End from './Parts/End'
import NFTAdres from './Parts/NFTAdres'
import ClaimButton from './Parts/ClaimButton'
import UnStakeButton from './Parts/UnStakeButton'
import Loader from '../../Components/Loader/Loader'
import Widget from './Parts/Widget'
 
export default function Claim() {
    const balance = useSelector(state => state.data.balance)
    const address = useSelector(state => state.data.account)
    const tokens = useSelector(state => state.data.tokenIDs)
    const stakeInfo = useSelector(state => state.data.stakeInfo)
    const stakedAmount = useSelector(state => state.stakeData.amount)
    const period = useSelector(state => state.stakeData.duration)
    const startTime = useSelector(state => state.stakeData.startTime)
    const startDate = useSelector(state => state.stakeData.startDate)
    const rewardsWai = useSelector(state => state.stakeData.availableRewards)
    let history = useHistory();
    // console.log("start date: ", startDate)
    // console.log("start time: ", startTime)
    // console.log("period :", period)
    // console.log("token ids: ",tokens)
    // console.log("account: ", address, typeof address)
    // console.log("staker:", stakeInfo[5], typeof stakeInfo[5])
    const stakedAmountEther = Web3.utils.fromWei(stakedAmount, 'ether');

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if(!address || !balance){
            history.push("/stake")
        }
    }, [])

    const showUnStake = () => {
        if(address && stakeInfo){
            if(address.toLowerCase() === stakeInfo[5].toLowerCase()){
                return (
                    <div className="un-stake">
                        <img src={unlock} alt="" />
                        <span>Un-Stake</span>
                    </div>
                    )
                }
        }
    }

    const showTokens = () => {
        // debugger
        if (tokens.length > 0) return tokens.map((item, i) => { return <NFT item={item} index={i} key={i}/> })
    }

    useEffect(async() => {
        if(stakeInfo){
            setInterval(() => {
        showAvailableRewards(stakeInfo[1])
                // console.log('hello')
            },5000)
        await showAvailableRewards(stakeInfo[1])
        }
    }, [stakeInfo])
    
    useEffect(async() => {
        if(!tokens){
        await balanceOf(address)
        }

    }, [])

    useEffect( async () => {
        if(tokens){
            await getStakeById(tokens[0])
            setLoader(false)
        }
    }, [tokens])

        if(!loader){
            return (
                <div className="claim__container">
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
                    <div className="nft__wrapper">
                        <div className="nft">
                            <div className="nft__title">NFT</div>
                            <div className="line"></div>
                            <div className="nft__content">
                                <Widget />
                                <NFTAdres address={address}/>
                            </div>
                        </div>
                        <div style={{display:`${!tokens ? "none": "flex"}`}} className="nfts__toggler">
                            { showTokens() }
                        </div>  
                    </div>
                </div>
            )
        }
        else{
            return <Loader />
        }
   
}