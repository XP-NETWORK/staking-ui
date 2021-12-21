import React from 'react'
import { useCallback } from 'react'
import { useDispatch } from "react-redux"
import { setAgreementMod } from '../../../redux/counterSlice'
import "./Agreement.css"
import Radio from './Radio'

export default function Agreement() {
    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => {
        dispatch(setAgreementMod(true))
        }
    )

    return (
        <div className="agreement">
            <Radio />
            <div onClick={onClickHandler} className="agreement__text">
             I have read and I agree to <span>XPNET Staking Service Agreement</span>
            </div>
        </div>
    )
}
