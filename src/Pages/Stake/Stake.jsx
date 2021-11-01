import React, { useEffect } from 'react'
import "./Stake.css"
// import Duration from "../../Components/Duration/Duration"
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { useState } from 'react'
import { changeStakingAmount } from "../../redux/counterSlice"
import { Approvance, Lock} from "../../Components/Buttons/Buttons"
import Reawards from './parts/Reawards'
import StakeInfo from './parts/StakeInfo'
import DetailsAmount from './parts/DetailsAmount'
import DetailsEnd from './parts/DetailsEnd'
import DetailsApy from './parts/DetailsApy'
import DetailsRewards from './parts/DetailsRewards'
import Agreement from './parts/Agreement'
import { StakeAmount, StakeAmountMob } from './parts/StakeAmount';
import StakeDuration from './parts/StakeDuration';


export default function Stake() {

const dispatch = useDispatch()
const [amount, setAmount] = useState('')
const allowence = useSelector(state => state.data.allowence)
const agreement = useSelector(state => state.data.agreement)
const currentPrice = useSelector(state => state.data.currentPrice)
const account = useSelector(state => state.data.account)
const duration = useSelector(state => state.data.duration)
const startDate = useSelector(state => state.data.startDate)
const balance = useSelector(state => state.data.balance)
const approveLoader = useSelector(state => state.data.aproveLoader)
const endDate = duration !== 1 ? moment(startDate).add(duration, 'month').format('YYYY-MM-DD hh:mm') : moment(startDate).add(1, 'year').format('YYYY-MM-DD hh:mm')

const durations = [
    {d:3, p: 45},
    {d:6, p: 75},
    {d:9, p: 100},
    {d:1, p: 125},
]

useEffect(() => {
}, [approveLoader])
 
        return (
            <div className="stake__container">
                <div className="stake">
                    <div className="stake__title">My Stake</div>
                    <div className="line"></div>
                    <StakeDuration durations={durations} />
                    <StakeAmount />
                    <StakeAmountMob />
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
                        <Agreement />
                        <Approvance agreement={agreement} approvance={allowence} amount={amount} duration={duration} account={account} />
                        <Lock approvance={allowence} amount={amount} duration={duration} account={account} />
                    </div>
                </div>
            </div>
        )   
}
