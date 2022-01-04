import React from 'react'
import { useCallback } from 'react'
import { useDispatch } from "react-redux"
import { setAgreementMod } from '../../../redux/counterSlice'
import "./Agreement.css"
import Radio from './Radio'
import PDF from "../../../assets/Terms.pdf"

export default function Agreement() {
    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => {
        dispatch(setAgreementMod(true))
        }
    )

    return (
        <div className="agreement">
            <Radio />
            <div className="agreement__text">
            <span>I have read and I agree to <a href={PDF} target='_blank'>XPNET Staking Service Agreement</a></span>
            </div>
        </div>
    )
}
