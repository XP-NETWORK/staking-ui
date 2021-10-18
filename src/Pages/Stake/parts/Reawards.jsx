import React from 'react'
import image from "../../../assets/xpnetart.jpeg"
import { getPercent } from "../../../utils/helper"
import "./Reawards.css"

export default function Reawards({ durations, duration }) {
    return (
        <div className="stake__rewards">
            <div className="rewards__header">
                {/* <div className="rewards__title">Reward rate</div>
                <div className="rewards__percent">{getPercent(durations, duration)}%</div> */}
            </div>
            <div className="rewards">
                <div className="rewards__widget">
                    <img src={image} alt="Reward art" />
                </div>
                <div className="rewards__content">
                    <div className="rewards__subtitle">Don't wait 3 month - get your NFT Reward right NOW</div>
                    <div className="rewards__text">A unique chain-agnostic NFT that serves as the access key to staking rewards.</div>
                </div>
            </div>
        </div>
    )
}



