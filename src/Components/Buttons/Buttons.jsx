import React, { useEffect } from 'react'
import { stake } from "../../utils/stake"
import { approve } from "../../utils/xpnet"
import lock from "../../assets/lock.svg"
import lockWhite from "../../assets/lockWhite.svg"
import { useSelector } from 'react-redux'
import ButtonLoader from '../Loader/ButtonLoader'
import approved from "../../assets/approved_icon.svg"
import "./Buttons.css"


export function Approvance({ approvance, amount, duration, account }) {
    const approveloader = useSelector(state => state.data.aproveLoader)
    const agreement = useSelector(state => state.data.agreement)
    
    useEffect(() => {
        
    }, [approveloader, agreement])
    

    if(approvance){
        return <div className="summary__button approved"><img src={approved} alt=""></img>Approved</div>
    }
    else if(!approvance && agreement){
        return <div onClick={() => approve(account)} className="summary__button button">{approveloader ? <ButtonLoader /> : "Approve"}</div>
    }
    else{
        return <div className="summary__button lock">Approve</div>
    }
}

export function Lock({ approvance, amount, duration, account}){
    const lockloader = useSelector(state => state.data.lockLoader)
    const agreement = useSelector(state => state.data.agreement)
    if(approvance && agreement && amount){
        return (
            <div onClick={() => stake(amount, duration, account)} className="summary__button button">
                {lockloader ? <ButtonLoader /> : <><img src={lockWhite} alt=""/><span>Lock</span></>}
            </div>)
    }
    else{
        return <div className="summary__button lock"><img src={lock} alt=""/><span>Lock</span></div>
    }
}
