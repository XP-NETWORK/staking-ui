import React from 'react'
import Web3 from "web3"
import "./Stake.css"
import image from "../../assets/Rectangle.png"
import i from "../../assets/i.svg"
import lock from "../../assets/lock.png"
import Duration from "../../Components/Duration/Duration"
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { useState } from 'react'
import { changeStakingAmount } from "../../redux/counterSlice"
import { approve } from "../../utils/xpnet"


export default function Stake() {
const dispatch = useDispatch()
const [amount, setAmount] = useState("")
const account = useSelector(state => state.data.account)
const duration = useSelector(state => state.data.duration)
const startDate = useSelector(state => state.data.startDate)
const balance = useSelector(state => state.data.balance)
const endDate = duration !== 1 ? moment(startDate).add(duration, 'month').format('YYYY-MM-DD hh:mm') : moment(startDate).add(1, 'year').format('YYYY-MM-DD hh:mm')
const durations = [
    {d:3, p: 45},
    {d:6, p: 75},
    {d:9, p: 100},
    {d:1, p: 125},
]

const getPercent = () => {
    let percent
    durations.forEach(item => {
        // debugger
        if(item.d === duration){
            percent = item.p
        }
    })
    return percent
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

const onBlurHandler = (e) => {
    // debugger
    const num = e.target.value
    if(num === "0"){
        setAmount("")
    }
}

getPercent()

    return (
        <div className="stake__container">
            <div className="stake">
                <div className="stake__title">My Stake</div>
                <div className="line"></div>
                <div className="stake__duration">
                    <div className="duration__header">
                        Staking Duration
                    </div>
                    <div className="durations__container">
                        {durations.map((e,i) => {
                           return <Duration month={e.d} apy={e.p} key={i} index={i} />
                        })}
                    </div>
                </div>
                <div className="stake__amount">
                    <div className="amount__header">
                        <div className="amount__title">Enter your XPNET amount</div>
                        <div className="amount__subtitle">Availabe for Staking: <span>{balance} XPNET</span></div>
                    </div>
                    <div className="amount__input">
                        <input value={amount} onChange={item => amountHandler(item)} onBlur={item => onBlurHandler(item)} type="text" />
                        <div className="input__items">
                            <div className="xpnet">XPNET</div>
                            <div onClick={ () => putMax()} className="max">MAX</div>
                        </div>
                    </div>
                </div>
                <div className="stake__rewards">
                    <div className="rewards__header">
                        <div className="rewards__title">Staking Rewards</div>
                        <div className="rewards__percent">{getPercent()}%</div>
                    </div>
                    <div className="rewards">
                        <div className="rewards__widget">
                            <img src={image} alt="Reward art" />
                        </div>
                        <div className="rewards__content">
                            <div className="rewards__subtitle">Don't wait 3 month - get your NFT Reward right NOW</div>
                            <div className="rewards__text">It is a long established fact that a reader will be content of a page when.</div>
                        </div>
                    </div>
                </div>
                <div className="stake__info">
                    <div className="info__title">
                        <img src={i} alt="" />
                        <span>It is a long</span>
                    </div>
                    <div className="info__text">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </div>
                </div>
            </div>
            <div className="summary">
                <div className="stake__title">Summary</div>
                <div className="line"></div>
                <div className="summary__details">
                    <div className="details details__amount">
                        <div className="details__capture">Staking Amount</div>
                        <div className="details__text">{amount} XPNET<span>$ 0.070</span></div>
                    </div>
                    <div className="details details__start">
                        <div className="details__capture">Start Date</div>
                        <div className="details__text">{startDate}</div>
                    </div>
                    <div className="details details__end">
                        <div className="details__capture">End Date</div>
                        <div className="details__text">{endDate}</div>
                    </div>
                    <div className="line"></div>
                    <div className="details details__apy">
                        <div className="details__capture">Est. APY</div>
                        <div className="details__text">{getPercent()}%</div>
                    </div>
                    <div className="details details__rewards">
                        <div className="details__capture">Estimated APY</div>
                        <div className="details__text">368 XPNET<span>$ 12.050</span></div>
                    </div>
                    <div className="line"></div>
                    <div className="agreement">
                     <input type="checkbox" name="agree" id="agree" />
                     <div className="agreement__text">
                      I have read and I agree to <a href="#">XPNET Staking Service Agreement</a>
                     </div>
                    </div>
                <div onClick={() => approve(account)} className="summary__button button">Approve</div>
                <div className="summary__button lock"><img src={lock} alt=""/><span>Lock</span></div>
                </div>
            </div>
        </div>
    )
}
