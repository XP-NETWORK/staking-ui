import React from 'react'
import { useDispatch } from "react-redux"
import "./Agreement.css"
import Radio from './Radio'

export default function Agreement() {

    // const dispatch = useDispatch()
    // const agreement = useSelector(state => state.data.agreement)
    // const agreementHandler = () => {
    //     dispatch(updateAgreement())
    // }

    return (
        <div className="agreement">
            <Radio />
            <div className="agreement__text">
             I have read and I agree to <a href="#">XPNET Staking Service Agreement</a>
            </div>
        </div>
    )
}
