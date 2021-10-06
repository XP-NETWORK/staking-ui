import React from 'react'
import "./Claim.css"
import unlock from "../../assets/unlock.png"
import pages from "../../assets/pages.png"
import bigart from "../../assets/bigart.png"
import { useState, useEffect } from 'react'
import { getProgress, getPercents, getStartDate, getEndDate } from '../../utils/helper'
import { balanceOf, getStakeById, showAvailableRewards } from "../../utils/stake"
import { useDispatch, useSelector } from "react-redux"
 
export default function Claim() {

    const address = useSelector(state => state.data.account)
    const tokens = useSelector(state => state.data.tokenIDs)
    const stakeInfo = useSelector(state => state.data.stakeInfo)
    const stakedAmount = useSelector(state => state.stakeData.amount)
    const period = useSelector(state => state.stakeData.duration)
    const startTime = useSelector(state => state.stakeData.startTime)
    const startDate = useSelector(state => state.stakeData.startDate)
    
    // console.log("start date: ", startDate)
    // console.log("start time: ", startTime)
    // console.log("period :", period)
    // console.log("token ids: ",tokens)
    console.log("account: ", address, typeof address)
    console.log("staker:", stakeInfo[5], typeof stakeInfo[5] )

    const showUnStake = () => {
        if(address.toLowerCase() === stakeInfo[5].toLowerCase()){
        return (
            <div className="un-stake">
                <img src={unlock} alt="" />
                <span>Un-Stake</span>
            </div>
            )
        }
    }

    useEffect((async) => {
        if(stakeInfo){
        showAvailableRewards(stakeInfo[1])
        }
    }, [stakeInfo])
    
    useEffect(() => {
        if(!tokens){
        balanceOf(address)
        }
    }, [tokens])

    useEffect(() => {
        getProgress()
    }, [])

    if(true){
        return (
            <div className="claim__container">
                <div className="claim">
                    <div className="claim__title">Staking Reward</div>
                    <div className="line"></div>
                    <select onClick={(item) => getStakeById(item.target.value)} style={{visibility:`${tokens ? 'visible':'hidden'}`}} name="" id="">
                        {tokens ? tokens.map( (item, i )=> {
                            return <option id={i} key={i}>{item}</option>
                        }):null}
                    </select>
                    <div className="claim__details">
                        <div className="claim__det claim__amount">
                            <div className="claim__capture">Staking Amount</div>
                            <div className="claim__text">{stakedAmount ? stakedAmount : "0"} XPNET</div>
                        </div>
                        <div className="claim__det claim__apy">
                            <div className="claim__capture">APY</div>
                            <div className="claim__text">{getPercents(period).percent}%</div>
                        </div>
                        <div className="claim__det claim__reward">
                            <div className="claim__capture">Staking Reward</div>
                            <div className="claim__text">115 XPNET</div>
                        </div>
                        <div className="claim__det claim__start">
                            <div className="claim__capture">Start day</div>
                            <div className="claim__text">{getStartDate(startTime)}</div>
                        </div>
                        <div className="claim__det claim__end">
                            <div className="claim__capture">End day</div>
                            <div className="claim__text">{getEndDate(period, startDate)}</div>
                        </div>
                        <div className="progress-bar">
                            <div className="progress__header">
                                <div className="progress__title">Staking Duration</div>
                                <div className="progress__remaining">{period/60/60/24} days remaining</div>
                            </div>
                            <div className="bar">
                                <div style={{width: `${getProgress(period, startTime)}%`}} className="bar__prog"></div>
                            </div>
                        </div>
                        <div className="claim__button">Claim XPNET</div>
                        { showUnStake() }
                    </div>
                </div>
                <div className="nft">
                    <div className="nft__title">NFT</div>
                    <div className="line"></div>
                    <div className="nft__content">
                        <div className="nft__widget">
                            <img src={bigart} alt="widget" />
                        </div>
                        <div className="nft__address">
                            <div className="address">dfghjklertyuiokjhgvrtyuiopkjh678ijbnm</div>
                            <div className="address__icon">
                                <img src={pages} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        <div>false</div>
    }
}
