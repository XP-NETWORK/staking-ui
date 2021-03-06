import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStakingAmount } from "../../../redux/counterSlice"
import { nf } from "../../../utils/helper"
import "./StakeAmount.css"

export function StakeAmount() {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState('')
    const [inputErr, setInputErr] = useState(false)
    const balance = useSelector(state => state.data.balance)
    const {stakingAmount} = useSelector(s => s.data)
    useEffect(() => {
        if(stakingAmount) setAmount(stakingAmount)
    },[])
    // console.log(useSelector(s => s.data))

    const amountHandler = (e) => {
        const reg = new RegExp('^[0-9]+$');
        const num = Number(e.target.value)
        if(reg.test(num)){
            setAmount(e.target.value)
            dispatch(changeStakingAmount(num))
        }
    }

    const putMax = () => {
        // console.log("putMax: ", balance)
        amountHandler({target: {value: balance}})
    }

    const onBlurHandler = (e) => {
        const num = parseInt(e.target.value)
        if(num < 1500){
            setAmount("")
            setInputErr(true)
        }
       else{
        setInputErr(false)
       }
    }


    return (
        <div className="stake__amount">
            <div className="amount__header">
                <div className="amount__title">Enter XPNET amount</div>
                <div className="amount__subtitle">Availabe for Staking: <span>{nf.format(balance)} XPNET</span></div>
            </div>
            <div className={ !inputErr ? "amount__input" : "amount__input--error"}>
                <input placeholder="Enter amount (minimum 1500 XPNET)" value={amount} onChange={item => amountHandler(item)} onBlur={item => onBlurHandler(item)} type="text" />
                <div className="input__items">
                    <div className="xpnet">XPNET</div>
                    <div onClick={ () => putMax()} className="max">MAX</div>
                </div>
            </div>
            <span style={{visibility:`${ !inputErr ? 'hidden': 'visible'}`}} className="error">The minimum staking amount is 1500 XPNET</span>
        </div>
    )
}


export function StakeAmountMob() {

    const dispatch = useDispatch()
    const [amount, setAmount] = useState('')
    const [inputErr, setInputErr] = useState(false)
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
        const num = parseInt(e.target.value)
        if(num < 1500){
            setAmount("")
            setInputErr(true)
        }
        else{
            setInputErr(false)
           }
    }


    return (
        <div className="stake__amount--mobile">
            <div className="amount__title">Enter your XPNET amount</div>
            <div className={ !inputErr ? "amount__input" : "amount__input--error"}>
                <input placeholder="Enter amount (minimum 1500 XPNET)" value={amount} value={amount} onChange={item => amountHandler(item)} onBlur={item => onBlurHandler(item)} type="text" />
                <div className="input__items">
                    <div className="xpnet">XPNET</div>
                    <div onClick={ () => putMax()} className="max">MAX</div>
                </div>
            </div>
            { !inputErr ? <div className="amount__subtitle">Availabe for Staking:<span>{(nf.format(balance))} XPNET</span></div> : <div style={{visibility:`${ !inputErr ? 'hidden': 'visible'}`}} className="error--mobile">The minimum staking amount is 1500 XPNET</div>}
            {/* // <div className="amount__subtitle">Availabe for Staking:<span>{(nf.format(balance))} XPNET</span></div> */}
        </div>
    )
}

