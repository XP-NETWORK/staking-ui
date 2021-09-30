import React from 'react'
import "./Duration.css"

export default function Duration({ month, apy }) {
    return (
        <div className="duration duration--active">
            <div className="duration__title">{month} {month === 1 ? `year` : `month`}</div>
            <div className="duration__subtitle">APY {apy}%</div>
        </div>
    )
}
