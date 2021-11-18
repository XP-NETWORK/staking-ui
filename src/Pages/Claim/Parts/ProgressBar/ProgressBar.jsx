import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProgress } from "../../../../utils/helper"



export default function ProgressBar({ startTime }) {
    const [remain, setRemain] = useState()
    const period = useSelector(state => state.stakeData.duration)
    const startDayUnix = useSelector(state => state.stakeData.startTime)


    useEffect(() => {
        const today = moment().unix()
        const num = Math.round(((period/60/60/24) - (today - startDayUnix)/60/60/24))
        console.log('123812398321', num)
        setRemain(num)
    }, [startDayUnix])

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
