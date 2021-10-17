import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStakingAmount } from "../../../redux/counterSlice"
import { nf } from "../../../utils/helper"

export function StakeAmount() {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(1500)
    const balance = useSelector(state => state.data.balance)

    const amountHandler = (e) => {
        const reg = new RegExp('^[0-9]+$');
        const num = Number(e.target.value)
        if(reg.test(num)){
            setAmount(e.target.value)
            dispatch(changeStakingAmount(num))
        }
    }

    const putMax = () => {
        setAmount(balance)
    }

    const onBlurHandler = (e) => {
        const num = e.target.value
        if(num === "0"){
            setAmount("")
        }
    }

    return (
        <div className="stake__amount">
            <div className="amount__header">
                <div className="amount__title">Enter XPNET amount</div>
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



export function StakeAmountMob() {

    const dispatch = useDispatch()
    const [amount, setAmount] = useState(1500)
    const balance = useSelector(state => state.data.balance)

    const amountHandler = (e) => {
        const reg = new RegExp('^[0-9]+$');
        const num = Number(e.target.value)
        if(reg.test(num)){
            setAmount(e.target.value)
            dispatch(changeStakingAmount(num))
        }
    }

    const putMax = () => {
        setAmount(balance)
    }

    const onBlurHandler = (e) => {
        const num = e.target.value
        if(num === "0"){
            setAmount("")
        }
    }

    return (
        <div className="stake__amount--mobile">
            <div className="amount__title">Enter your XPNET amount</div>
            <div className="amount__input">
                <input value={amount} onChange={item => amountHandler(item)} onBlur={item => onBlurHandler(item)} type="text" />
                <div className="input__items">
                    <div className="xpnet">XPNET</div>
                    <div onClick={ () => putMax()} className="max">MAX</div>
                </div>
            </div>
            <div className="amount__subtitle">Availabe for Staking:<span>{(nf.format(balance))} XPNET</span></div>
        </div>
    )
}

