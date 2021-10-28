import React, { useState } from 'react'
import { toggleConnection, updateAccount } from "../../redux/counterSlice"
import { useDispatch } from 'react-redux'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { initMetaMask, connectMetaMask } from '../../utils/metamask';
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useMoralis } from "react-moralis";


export default function Conection() {
    const { ethereum } = window
    const dispatch = useDispatch()
    const { authenticate, isAuthenticated, user, logout, Moralis } = useMoralis();
    // const toggler = useSelector(state => state.data.toggleConnection)

    // console.log(Moralis)

    const connectionHandler =  async str  => {
        if(str === "MetaMask"){
            dispatch(toggleConnection("MetaMask"))
            authenticate().then(()=>{
                dispatch(updateAccount(user.attributes.accounts[0]))
            })
        }
        else{
            dispatch(toggleConnection("WalletConnect"))
            if(authenticate){
                authenticate({ provider: "walletconnect" }).then(()=>{
                    dispatch(updateAccount(user.attributes.accounts[0]))
                })
            }
        }
    }

    return (
        <div className="connection__wrapper">
            <div className="metaMask__init">
                <div className="init__icon">
                    ICON
                </div>
                <div onClick={()=> connectionHandler('MetaMask') } className="init__button">
                    { !ethereum ? <a href="https://metamask.app.link/dapp/stake-testing.xp.network/">MetaMask</a> : "MetaMask" }
                    
                </div>
            </div>
            <div className="walletConnect__init">
                <div className="init__icon">
                    ICON
                </div>
                <div onClick={() => connectionHandler('WalletConnect') } className="init__button">
                    WalletConnect
                </div>
                { !isAuthenticated ? (
                <div>
                    <button onClick={() => authenticate()}>Authenticate</button>
                </div>
                )
                : null
                }
            </div>
        </div>
    )
}
