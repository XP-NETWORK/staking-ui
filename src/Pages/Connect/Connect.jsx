import React from 'react'
import "./Connect.css"
import MetaMask from "../../assets/MetaMask_Big_Fox.svg"

export default function Connect() {
    return (
        <div className="connect__container">
            <div className="connect">
                <div className="fox">
                    <img src={MetaMask} alt="" />
                </div>
                <div className="connect__title">
                    Connect to MetaMask
                </div>
                <div className="connect__button">
                    Connect
                </div>
            </div>
        </div>
    )
}
