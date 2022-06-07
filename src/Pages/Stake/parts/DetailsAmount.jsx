import React from 'react'
import {useSelector} from 'react-redux'

import {nf} from '../../../utils/helper'
import './Details.css'

export default function DetailsAmount({amount, currentPrice}) {
    const stakingAmount = useSelector((state) => state.data.stakingAmount)

    return (
        <div className="details details__amount">
            <div className="details__capture">Staking Amount</div>
            <div className="details__text">
                {nf.format(stakingAmount)} XPNET
                <span>$ {nf.format((stakingAmount * currentPrice).toFixed(2))}</span>
            </div>
        </div>
    )
}
