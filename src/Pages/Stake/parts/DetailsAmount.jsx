import React from 'react'
import { getPercent, nf } from "../../../utils/helper"
import "./Details.css"

export default function DetailsAmount({ amount, currentPrice }) {
    return (
        <div className="details details__amount">
            <div className="details__capture">Staking Amount</div>
            <div className="details__text">{amount} XPNET<span>$ {nf.format((amount*currentPrice).toFixed(2))}</span></div>
        </div>
    )
}
