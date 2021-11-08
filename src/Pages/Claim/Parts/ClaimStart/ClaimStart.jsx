import React from 'react'
import ButtonLoader from '../../../../Components/Loader/ButtonLoader'
import { getStartDate } from "../../../../utils/helper"

export default function ClaimStart({ startTime }) {
    return (
    <div className="claim__det claim__start">
        <div className="claim__capture">Start day</div>
        <div className="claim__text">{getStartDate(startTime) !== "Invalid date" ? getStartDate(startTime): <ButtonLoader />}</div>
    </div>
    )
}
