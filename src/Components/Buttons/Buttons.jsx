import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useWeb3React} from '@web3-react/core'
import {useHistory} from 'react-router'

import {stake} from '../../utils/stake'
import {approve} from '../../utils/xpnet'
import lock from '../../assets/lock.svg'
import lockWhite from '../../assets/lockWhite.svg'
import ButtonLoader from '../Loader/ButtonLoader'
import approved from '../../assets/approved_icon.svg'
import './Buttons.css'

export function Approvance({approvance, amount, duration, account}) {
    // console.log("useWeb3React()", useWeb3React());
    const {library, connector} = useWeb3React()
    const approveloader = useSelector((state) => state.data.aproveLoader)
    const agreement = useSelector((state) => state.data.agreement)
    const allowence = useSelector((state) => state.data.allowence)
    const {stakingAmount} = useSelector((s) => s.data)

    useEffect(() => {}, [approveloader, agreement, allowence])

    if (approvance) {
        return (
            <div className="summary__button approved">
                <img src={approved} alt=""></img>Approved
            </div>
        )
    } else if (!approvance && agreement && stakingAmount >= 1500) {
        return (
            <div onClick={() => approve(account, library)} className="summary__button button">
                {approveloader ? <ButtonLoader /> : 'Approve'}
            </div>
        )
    } else {
        return <div className="summary__button lock">Approve</div>
    }
}

export function Lock({approvance, duration, account}) {
    const {library, connector} = useWeb3React()
    const lockloader = useSelector((state) => state.data.lockLoader)
    const agreement = useSelector((state) => state.data.agreement)
    const amount = useSelector((state) => state.data.stakingAmount)
    const history = useHistory()
    if (approvance && agreement && amount >= 1500) {
        return (
            <div
                onClick={() =>
                    stake(amount, duration === 1 ? 12 : duration, account, history, library)
                }
                className={
                    !lockloader ? 'summary__button button' : 'summary__button loading button'
                }>
                {lockloader ? (
                    <ButtonLoader />
                ) : (
                    <>
                        <img src={lockWhite} alt="" />
                        <span>Stake</span>
                    </>
                )}
            </div>
        )
    } else {
        return (
            <div className="summary__button lock">
                <img src={lock} alt="" />
                <span>Stake</span>
            </div>
        )
    }
}
