import React from 'react'
import bigart from "../../../assets/bigart.png"
import leftArrow from "../../../assets/arrow_left.svg"
import rightArrow from "../../../assets/arrow_right.svg"

export default function Widget() {
    return (
        <div className="nft__widget">
            <div className="left-arrow arrow"><img src={leftArrow} alt="" /></div>
            <div className="widget__art">
                <img src={bigart} alt="widget" />
            </div>
            <div className="right-arrow arrow"><img src={rightArrow} alt="" /></div>
        </div>
    )
}
