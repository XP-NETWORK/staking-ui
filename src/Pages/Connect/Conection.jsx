import React, { useState, useEffect } from 'react'
import { toggleConnection, updateAccount } from "../../redux/counterSlice"
import { useDispatch } from 'react-redux'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { initMetaMask, connectMetaMask } from '../../utils/metamask';
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useMoralis } from "react-moralis";


export default function Conection() {
    const {
        authenticate,
        isWeb3Enabled,
        isAuthenticated,
        user,
        enableWeb3,
        Moralis,
        logout
      } = useMoralis();

    const { ethereum } = window
    const dispatch = useDispatch()
  
    const connectionHandler =  async str  => {
        if(str === "MetaMask"){
            dispatch(toggleConnection("MetaMask"))
            await authenticate()
        }
        else{
            dispatch(toggleConnection("WalletConnect"))
                await authenticate({ provider: "walletconnect" })   
        }
    }

    // useEffect(() => {
    //     if(user && user.attirub
    //         ) {
    //         console.log(user)
    //         dispatch(updateAccount(user.attributes.accounts[0]))
    //     }
    // },[user, isAuthenticated])

    return (
        <div className="connection__wrapper">
            <div className="metaMask__init">
                <div className="init__icon">
                    ICON
                </div>
                <div onClick={() => connectionHandler('MetaMask')} className="init__button">
                    { !ethereum ? <a href="https://metamask.app.link/dapp/stake-testing.xp.network/">MetaMask</a> : "MetaMask" }
                </div>
            </div>
            <div className="walletConnect__init">
                <div className="init__icon">
                    ICON
                </div>
                <div onClick={() => connectionHandler('WalletConnect')} className="init__button">
                    WalletConnect
                </div>
            </div>
        </div>
    )
}
