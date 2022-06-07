import React from 'react'
import './NoItems.css'

export default function NoItems({onBackToItems}) {
    return (
        <div className="no-items__container">
            <div className="no-items-result">0 results</div>
            <div className="no-items-msg">No items found for this search</div>
            <div onClick={onBackToItems} className="no-items-btn">
                Back to all items
            </div>
        </div>
    )
}
