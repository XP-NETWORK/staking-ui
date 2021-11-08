import React from 'react'
import { nf } from '../../../../utils/helper'

export default function ClaimAmount({stakedAmount, stakedAmountEther}) {
    return (
        <div className="claim__det claim__amount">
            <div className="claim__capture">Amount</div>
            <div className="claim__text">{stakedAmount ? nf.format(stakedAmountEther) : "0"} XPNET</div>
        </div>
    )
}
