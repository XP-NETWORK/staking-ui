import React from 'react'
import "./Claim.css"
import unlock from "../../assets/unlock.png"
import pages from "../../assets/pages.png"
import bigart from "../../assets/bigart.png"
import { useState, useEffect } from 'react'
import { getProgress } from '../../utils/helper'
import { balanceOf } from "../../utils/xpnet"


 
export default function Claim() {

    useEffect(() => {
        getProgress()
        balanceOf()
    }, [])

    return (
        <div className="claim__container">
            <div className="claim">
                <div className="claim__title">Staking Reward</div>
                <div className="line"></div>
                <div className="claim__details">
                    <div className="claim__det claim__amount">
                        <div className="claim__capture">Staking Amount</div>
                        <div className="claim__text">100 XPNET</div>
                    </div>
                    <div className="claim__det claim__apy">
                        <div className="claim__capture">APY</div>
                        <div className="claim__text">100%</div>
                    </div>
                    <div className="claim__det claim__reward">
                        <div className="claim__capture">Staking Reward</div>
                        <div className="claim__text">115 XPNET</div>
                    </div>
                    <div className="claim__det claim__start">
                        <div className="claim__capture">Start day</div>
                        <div className="claim__text">2021-09-27 12:34</div>
                    </div>
                    <div className="claim__det claim__end">
                        <div className="claim__capture">End day</div>
                        <div className="claim__text">2021-12-27 12:34</div>
                    </div>
                    <div className="progress-bar">
                        <div className="progress__header">
                            <div className="progress__title">Staking Duration</div>
                            <div className="progress__remaining">60 days remaining</div>
                        </div>
                        <div className="bar">
                            <div style={{width: `${getProgress()}%`}} className="bar__prog"></div>
                        </div>
                    </div>
                    <div className="claim__button">Claim XPNET</div>
                    <div className="un-stake">
                        <img src={unlock} alt="" />
                        <span>Un-Stake</span>
                    </div>
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
