import React from 'react'
import { getStartDate, getEndDate } from "../../../../utils/helper"
import ButtonLoader from '../../../../Components/Loader/ButtonLoader'

export default function End({ startTime, period, startDate }) {
    return (
    <div className="claim__det claim__end">
        <div className="claim__capture">End day</div>
        <div className="claim__text">{getStartDate(startTime) !== "Invalid date" ? getEndDate(period, startDate): <ButtonLoader />}</div>
    </div>
    )
}
