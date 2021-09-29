import React from 'react'
import "./Stake.css"

export default function Stake() {
    return (
        <div className="stake__container">
            <div className="stake">
                <div className="stake__title">My Stake</div>
                <div className="stake-line"></div>
                <div className="stake__duration">
                    <div className="duration__header">
                        Staking Duration
                    </div>
                    <div className="durations__container">
                        <div className="duration duration--active">
                            <div className="duration__title">3 month</div>
                            <div className="duration__subtitle">APY 45%</div>
                        </div>
                        <div className="duration">
                            <div className="duration__title">6 month</div>
                            <div className="duration__subtitle">APY 75%</div>
                        </div>
                        <div className="duration">
                            <div className="duration__title">9 month</div>
                            <div className="duration__subtitle">APY 100%</div>
                        </div>
                        <div className="duration">
                            <div className="duration__title">1 year</div>
                            <div className="duration__subtitle">APY 125%</div>
                        </div>
                    </div>
                </div>
                <div className="stake__amount">
                    <div className="amount__header">
                        <div className="amount__title">Enter your XPNET amount</div>
                        <div className="amount__subtitle">Availabe for Staking: <span>892.06 XPNET</span></div>
                    </div>
                    <div className="amount__input">
                        <input type="text" />
                    </div>
                    </div>
                <div className="stake__rewards">Rewards</div>
                <div className="stake__info">Info</div>
            </div>
            <div className="summary">Summary</div>
        </div>
    )
}
