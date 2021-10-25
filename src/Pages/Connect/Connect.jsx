import React, { useEffect } from 'react'
import "./Connect.css"
import MetaMask from "../../assets/MetaMask_Big_Fox.svg"
import { connectMetaMask } from "../../utils/metamask"
import { provider } from "../../utils/walletConnect"
import { useDispatch } from 'react-redux'
import { chengeStatus, schooseMetaMask, schooseWalletConnect } from "../../redux/counterSlice"


export default function Connect() {
    const dispatch = useDispatch()
    const { ethereum } = window
    const toggleMetaMask = () => {
        connectMetaMask()
        dispatch(chengeStatus(true))
    }

     const QR = async () => {
        try {
            await provider.enable();
        } catch (error) {
            console.log(error);
        }
    } 
    
    return (
        <div className="connect__container">
            <div className="connect">
                {
                    window.innerWidth <= 600 ?
                    <>
                    { ethereum ? 
                        <>
                        <div className="fox">
                            <img src={MetaMask} alt="" />
                        </div>
                        <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => toggleMetaMask()} className="btn-metamask">
                            Connect MetaMask
                        </div>
                        <div  onClick={() => QR()} className="btn-metamask">
                            Connect WalletConnect
                        </div>
                        </>
                        :
                        <>
                        <div className="fox">
                            <img src={MetaMask} alt="" />
                        </div>
                        <div className="connect__title">
                            <div className="connect__button"><a href="https://metamask.app.link/dapp/stake-testing.xp.network/">MetaMask</a></div> 
                        </div>
                        <div  onClick={() => QR()} className="btn-metamask">
                            Connect WalletConnect
                        </div>
                        </>
                        }
                    </>
                    :
                    <>
                    { ethereum ?
                        <>
                        <div className="fox">
                            <img src={MetaMask} alt="" />
                        </div>
                        <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => toggleMetaMask()} className="btn-metamask">
                            Connect
                        </div>
                        </>
                        :
                        <div  onClick={() => QR()} className="btn-metamask">
                            Connect WalletConnect
                        </div>
                    }
                    </>
                }
            </div>
        </div>
    )
}