import React, { useEffect } from 'react'
import { stake } from "../../utils/stake"
import { approve } from "../../utils/xpnet"
import "./Buttons.css"
import lock from "../../assets/lock.png"
import { useSelector } from 'react-redux'

export function Approvance({ approvance, amount, duration, account, agreement }) {
    const approveloader = useSelector(state => state.data.aproveLoader)
    console.log(approvance)
    // debugger
    if(approvance){
        return <div className="summary__button lock">Approved</div>
    }
    else if(!approvance && agreement){
        return <div onClick={() => approve(account)} className="summary__button button">{approveloader ? "Loading..." : "Approve"}</div>
    }
    else{
        return <div className="summary__button lock">Approve</div>
    }
}

export function Lock({ approvance, amount, duration, account, agreement }){
    const lockloader = useSelector(state => state.data.lockLoader)
    
    if(approvance && agreement && amount){
        return <div onClick={() => stake(amount, duration, account)} className="summary__button button"><img src={lock} alt=""/><span>{lockloader ? "Loading..." : "Lock"}</span></div>
    }
    else{
        return <div className="summary__button lock"><img src={lock} alt=""/><span>Lock</span></div>
    }
}
