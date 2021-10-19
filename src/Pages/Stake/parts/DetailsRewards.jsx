import React from 'react'
import { useSelector } from 'react-redux'
import { nf } from "../../../utils/helper"

export default function DetailsRewards({ currentPrice, duration }) {
    const amount = useSelector(s => s.data.stakingAmount)
    const getRewards = () => {
        // debugger
        const rewards = duration === 3 ? 
        amount*0.1125 :
        duration === 6 ?
        amount*0.375 :
        duration === 9 ?
        amount*0.75 :
        amount*1.25
        return rewards
    }

    return (
        <div className="details details__rewards">
            <div className="details__capture">Estimated XPNET</div>
            <div className="details__text">{nf.format((getRewards()).toFixed(2))} XPNET<span>$ {nf.format((getRewards()*currentPrice).toFixed(2))}</span></div>
        </div>
    )
}
