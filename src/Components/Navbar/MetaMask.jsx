import React from 'react'
import metaLogo from "../../assets/MetaMask_Fox.svg"
import { useSelector } from 'react-redux'
import './MetaMask.css'

export default function MetaMask() {

    const account = useSelector(state => state.data.account)

    return (
        <div className="metamask">
            <div className="account">
                {account}
            </div>
           <div className="account__icon"></div>
        </div>
    )
}
