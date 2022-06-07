import React from 'react'

import Duration from '../../../Components/Duration/Duration'
import './StakeDuration.css'

export default function StakeDuration({durations}) {
    return (
        <div className="stake__duration">
            <div className="duration__header">Select staking period</div>
            <div className="durations__container">
                {durations.map((e, i) => {
                    return <Duration month={e.d} apy={e.p} key={i} index={i} />
                })}
            </div>
        </div>
    )
}
