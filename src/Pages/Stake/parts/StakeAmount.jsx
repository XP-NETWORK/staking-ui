import { React, useState} from 'react'
import { nf } from "../../../utils/helper"
import { useDispatch, useSelector } from 'react-redux'
import { changeStakingAmount } from "../../../redux/counterSlice"

export default function StakeAmount({ balance }) {

    const [amount, setAmount] = useState("")
    const dispatch = useDispatch()
    const onBlurHandler = (e) => {
        const num = e.target.value
        if(num === "0"){
            setAmount("")
        }
    }

    const putMax = () => {
        setAmount(balance)
    }

    const amountHandler = (e) => {
        const reg = new RegExp('^[0-9]+$');
        const num = Number(e.target.value)
        if(reg.test(num)){
            setAmount(e.target.value)
            dispatch(changeStakingAmount(num))
        }
    }

    return (
        <div className="stake__amount">
            <div className="amount__header">
                <div className="amount__title">Enter your XPNET amount</div>
                <div className="amount__subtitle">Availabe for Staking: <span>{nf.format(balance)} XPNET</span></div>
            </div>
            <div className="amount__input">
                <input value={amount} onChange={item => amountHandler(item)} onBlur={item => onBlurHandler(item)} type="text" />
                <div className="input__items">
                    <div className="xpnet">XPNET</div>
                    <div onClick={ () => putMax()} className="max">MAX</div>
                </div>
            </div>
        </div>
    )
}
