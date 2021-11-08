import React from 'react'
import { getPercents } from "../../../../utils/helper"

export default function ClaimAPY({ period }) {
    return (
        <div className="claim__det claim__apy">
            <div className="claim__capture">APY</div>
            <div className="claim__text">{period ? getPercents(period).percent : "0"}%</div>
        </div>
    )
}
