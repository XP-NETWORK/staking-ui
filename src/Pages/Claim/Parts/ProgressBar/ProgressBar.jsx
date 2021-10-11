import React from 'react'
import { getProgress } from "../../../../utils/helper"

export default function ProgressBar({ period, startTime }) {
    return (
    <div className="progress-bar">
        <div className="progress__header">
            <div className="progress__title">Staking Duration</div>
            <div className="progress__remaining">{period/60/60/24} days remaining</div>
        </div>
        <div className="bar">
            <div style={{width: `${getProgress(period, startTime)}%`}} className="bar__prog"></div>
        </div>
    </div>
    )
}
