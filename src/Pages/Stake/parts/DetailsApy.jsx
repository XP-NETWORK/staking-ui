import React from 'react'
import { getPercent, nf } from "../../../utils/helper"
import {useSelector } from "react-redux"

export default function DetailsApy({ durations,  duration}) {
    const { stakingAmount} = useSelector(s => s.data)
    return (
        <div className="details details__apy">
            <div className="details__capture">Est. APY</div>
            <div className="details__text">{nf.format(getPercent(durations, duration))}%</div>
        </div>
    )
}
