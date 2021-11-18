import moment from 'moment'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getProgress } from "../../../../utils/helper"



export default function ProgressBar({ period, startTime }) {

    const [toDay, setToDay] = useState(moment().unix())
    const startDayUnix = useSelector(state => state.stakeData.startTime)
    const [remain, setRemain] = useState(Math.round((period/60/60/24) - ((toDay - startDayUnix)/60/60/24)))

    // Math.round((period/60/60/24) - ((toDay - startDayUnix)/60/60/24))

    return (
    <div className="progress-bar">
        <div className="progress__header">
            <div className="progress__title">Staking Duration</div>
            <div className="progress__remaining">{remain} days remaining</div>
        </div>
        <div className="bar">
            <div style={{width: `${getProgress(period, startTime)}%`}} className="bar__prog"></div>
        </div>
    </div>
    )
}
