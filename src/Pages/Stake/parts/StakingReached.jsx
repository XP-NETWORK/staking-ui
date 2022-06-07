import React from 'react'
import { useDispatch } from 'react-redux'

import './StakingReached.css'
import smile from '../../../assets/emoji.svg'

import { setNotifyForm } from '../../../redux/counterSlice'

export default function StakingReached() {
    // const history = useHistory()
    const dispatch = useDispatch()

    return (
        <div className="staking-reached-container">
            <div className="staking-reached__icon">
                <img src={smile} alt="" />
            </div>
            <div className="staking-reached__title">50M Staking Limit is reached!</div>
            <div className="staking-reached__text">
                Good news that more tokens are coming. Subscribe to get notified.
            </div>
            <div onClick={() => dispatch(setNotifyForm(true))} className="staking-reached__button">
                Notify me
            </div>
        </div>
    )
}
