import React from 'react'
import Web3 from "web3"
import "./Stake.css"
// import image from "../../assets/Rectangle.png"
// import i from "../../assets/i.svg"

import Duration from "../../Components/Duration/Duration"
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { useState, useEffect } from 'react'
import { changeStakingAmount, updateAgreement } from "../../redux/counterSlice"
// import { updateTokensArray } from "../../redux/stakeSlice"
import { getPercent, nf } from "../../utils/helper"
// import { stake } from "../../utils/stake"
// import { approve } from "../../utils/xpnet"
import { Approvance, Lock} from "../../Components/Buttons/Buttons"
// import Connect from '../Connect/Connect'
// import NFT from '../../Components/NFT/NFT'
import Reawards from './parts/Reawards'
import StakeInfo from './parts/StakeInfo'
import DetailsAmount from './parts/DetailsAmount'
// import DetailsStart from './parts/DetailsStart'
import DetailsEnd from './parts/DetailsEnd'
import DetailsApy from './parts/DetailsApy'
import DetailsRewards from './parts/DetailsRewards'
import Agreement from './parts/Agreement'
// import StakeAmount from './parts/StakeAmount'


export default function Stake() {
const dispatch = useDispatch()
const [amount, setAmount] = useState("")
const allowence = useSelector(state => state.data.allowence)
console.log(allowence)
// console.log("Allowence: ",allowence)
// const etherValue = Web3.utils.fromWei(allowence, 'ether');
// console.log("Allowence etherValue: ",etherValue)
const agreement = useSelector(state => state.data.agreement)
const currentPrice = useSelector(state => state.data.currentPrice)
// const approved = useSelector(state => state.data.approved)
const account = useSelector(state => state.data.account)
const duration = useSelector(state => state.data.duration)
const startDate = useSelector(state => state.data.startDate)
// console.log(startDate)
const balance = useSelector(state => state.data.balance)
const endDate = duration !== 1 ? moment(startDate).add(duration, 'month').format('YYYY-MM-DD hh:mm') : moment(startDate).add(1, 'year').format('YYYY-MM-DD hh:mm')
const durations = [
    {d:3, p: 45},
    {d:6, p: 75},
    {d:9, p: 100},
    {d:1, p: 125},
]

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

const onBlurHandler = (e) => {
    // debugger
    const num = e.target.value
    if(num === "0"){
        setAmount("")
    }
}

const getRewards = () => {
    // debugger
    const rewards = duration === 3 ? 
    amount*0.1125 :
    duration === 6 ?
    amount*0.375 :
    duration === 9 ?
    amount*0.75 :
    amount*1.25
    return rewards
}

const agreementHandler = () => {
    dispatch(updateAgreement())
}

useEffect(() => {
}, [allowence])

        return (
            <div className="stake__container">
                <div className="stake">
                    
                    <div className="stake__title">My Stake</div>
                    <div className="line"></div>
                    <div className="stake__duration">
                        <div className="duration__header">
                        Select staking period
                        </div>
                        <div className="durations__container">
                            {durations.map((e,i) => {
                               return <Duration month={e.d} apy={e.p} key={i} index={i} />
                            })}
                        </div>
                    </div>
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
    
                    <Reawards durations={durations} duration={duration} />
                    <StakeInfo />
                </div>
                <div className="summary">
                    
                    <div className="stake__title">Summary</div>
                    <div className="line"></div>
                    <div className="summary__details">
                        <DetailsAmount amount={amount} currentPrice={currentPrice} />
                        <DetailsEnd endDate={endDate} />
                        <div className="line"></div>
                        <DetailsApy durations={durations} duration={duration} />
                        <DetailsRewards currentPrice={currentPrice} amount={amount} duration={duration} />
                        <div className="line"></div>
                        {/* <div className="agreement">
                            <input onChange={() => agreementHandler()} checked={agreement} type="checkbox" name="agree" id="agree" />
                            <div className="agreement__text">
                             I have read and I agree to <a href="#">XPNET Staking Service Agreement</a>
                            </div>
                        </div> */}
                        <Agreement />
                        <Approvance agreement={agreement} approvance={allowence} amount={amount} duration={duration} account={account} />
                        <Lock approvance={allowence} amount={amount} duration={duration} account={account} />
                    </div>
                </div>
            </div>
        )   
}
