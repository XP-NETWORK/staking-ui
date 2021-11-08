import React from 'react'
import { getStartDate, getEndDate } from "../../../../utils/helper"
import ButtonLoader from '../../../../Components/Loader/ButtonLoader'
import { nf } from '../../../../utils/helper'

export default function Total({ stakedAmountEther, period, startDate }) {
    const t = period / 60 / 60 / 24
    let total = parseInt(stakedAmountEther)
    // console.log(t, total)
    if(t === 90) total = total * 0.1125
    else if (t === 180) total = total * 0.3750
    else if(t === 270) total = total * 0.7500
    else if(t === 365) total = total * 1.25
    return (
    <div className="claim__det claim__end">
        <div className="claim__capture">Total Rewards</div>
        <div className="claim__text">{stakedAmountEther ? nf.format(total) : "0"} XPNET</div>

    </div>
    )
}
