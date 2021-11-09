import React from 'react'

export default function DetailsStart({ startDate }) {
    return (
        <div className="details details__start">
            <div className="details__capture">Start Date</div>
            <div className="details__text">{startDate}</div>
        </div>
    )
}
