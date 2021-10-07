import React from 'react'
import { claimXpNet } from "../../../utils/stake"

export default function ClaimButton({ stakeInfo, rewardsWai, address }) {
    return (
        <div onClick={() => claimXpNet(stakeInfo, rewardsWai, address)} className="claim__button">Claim XPNET</div>
    )
}
