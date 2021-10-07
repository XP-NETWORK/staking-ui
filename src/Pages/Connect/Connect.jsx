import React from 'react'
import "./Connect.css"
import MetaMask from "../../assets/MetaMask_Big_Fox.svg"
import { connectMetaMask } from "../../utils/metamask"
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { chengeStatus } from "../../redux/counterSlice"

export default function Connect() {
    const dispatch = useDispatch()
    const { ethereum } = window

    const toggleMetaMask = () => {
        connectMetaMask()
        dispatch(chengeStatus(true))
    }

    return (
        <div className="connect__container">
            <div className="connect">
                <div className="fox">
                    <img src={MetaMask} alt="" />
                </div>
                <div className="connect__title">
                    Connect to MetaMask
                </div>
                <div onClick={() => toggleMetaMask()} className="connect__button">
                    Connect
                </div>
                { !ethereum ? <div className="required">MetaMask required</div> : null}
            </div>
        </div>
    )
}
