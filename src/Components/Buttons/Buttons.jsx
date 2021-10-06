import React from 'react'
import { stake } from "../../utils/stake"
import "./Buttons.css"
import lock from "../../assets/lock.png"

export function Approvance({ approvance, amount, duration, account, agreement }) {
    // console.log("approvance",typeof approvance, approvance)
    // console.log(amount)

    if(approvance){
        return <div className="summary__button lock">Approved</div>
    }
    else if(approvance && agreement && amount){
        return <div onClick={() => stake(amount, duration, account)} className="summary__button button">Approve</div>
    }
    else{
        return <div className="summary__button lock">Approve</div>
    }
}

export function Lock({ approvance, amount, duration, account, agreement }){
    if(approvance && agreement && amount){
        return <div onClick={() => stake(amount, duration, account)} className="summary__button button"><img src={lock} alt=""/><span>Lock</span></div>
    }
    else{
        return <div className="summary__button lock"><img src={lock} alt=""/><span>Lock</span></div>
    }
}
