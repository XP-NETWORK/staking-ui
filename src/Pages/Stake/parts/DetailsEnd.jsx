import React from 'react'

export default function DetailsEnd({ endDate }) {
    return (
        <div className="details details__end">
            <div className="details__capture">End Date</div>
            <div className="details__text">{endDate}</div>
        </div>
    )
}
