import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { updateAgreement } from "../../../redux/counterSlice"
import "./Agreement.css"
import Radio from './Radio'

export default function Agreement() {

    const dispatch = useDispatch()
    const agreement = useSelector(state => state.data.agreement)
    const agreementHandler = () => {
        dispatch(updateAgreement())
    }

    return (
        <div className="agreement">
            {/* <Radio /> */}
            {/* <input onChange={() => agreementHandler()} checked={agreement} type="checkbox" name="agree" id="agree" /> */}
            <Radio />
            <div className="agreement__text">
             I have read and I agree to <a href="#">XPNET Staking Service Agreement</a>
            </div>
        </div>
    )
}
