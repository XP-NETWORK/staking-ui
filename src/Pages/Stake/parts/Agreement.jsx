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
             <a href={PDF} target='_blank'> I have read and I agree to <span>XPNET Staking Service Agreement</span></a>
            </div>
        </div>
    )
}
