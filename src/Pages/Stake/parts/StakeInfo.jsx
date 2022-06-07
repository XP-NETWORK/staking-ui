import React from 'react'

import i from '../../../assets/i.svg'
import './StakeInfo.css'

export default function StakeInfo() {
    return (
        <div className="stake__info">
            <div className="info__title">
                <img src={i} alt="" />
                <span>Important information</span>
            </div>
            <div className="info__text">
                If you sell this NFT, you’ll lose the right to claim the XPNET rewards, though
                you’ll still be able to withdraw the staking deposit once it matures.
            </div>
        </div>
    )
}
