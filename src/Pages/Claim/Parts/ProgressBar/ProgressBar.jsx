import moment from 'moment'
import React from 'react'
import { getEndDate, getProgress } from "../../../../utils/helper"

export default function ProgressBar({ period, startTime, startDate }) {
    const end = getEndDate(period, startDate)
    const daysFromStart = (moment().unix() - startTime) / (60*60*24)
    const p = (period/(60*60*24)) - daysFromStart
    return (
    <div className="progress-bar">
        <div className="progress__header">
            <div className="progress__title">Staking Duration</div>
            <div className="progress__remaining">{p.toFixed(0)} days remaining</div>
        </div>
        <div className="bar">
            <div style={{width: `${getProgress(period, startTime)}%`}} className="bar__prog"></div>
        </div>
    </div>
    )
}
