import React from 'react'
import "./Duration.css"
import { useSelector, useDispatch } from 'react-redux'
import { changeDuraion } from "../../redux/counterSlice"

export default function Duration({ month, apy, index }) {

    const dispatch = useDispatch()
    const dur = useSelector(state => state.data.duration)
    const durationHandler = (i) => {
        const duration = i === 0 ? 3 : i === 1 ? 6 : i === 2 ? 9 : 1
        
        dispatch(changeDuraion(duration))
    }    

    return (
        <div onClick={() => durationHandler(index)} className={dur === month ? `duration duration--active`:`duration`}>
            <div className="duration__title">{month} {month === 1 ? `year` : `month`}</div>
            <div className="duration__subtitle">APY {apy}%</div>
        </div>
    )
}
