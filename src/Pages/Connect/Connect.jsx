import React from 'react'
import "./Connect.css"
import MetaMask from "../../assets/MetaMask_Big_Fox.svg"
import walletconnect from "../../assets/walletconnect.svg"
import { connectMetaMask } from "../../utils/metamask"
import { useDispatch } from 'react-redux'
import { chengeStatus, setProvide } from "../../redux/counterSlice"
import { useMoralis } from "react-moralis";

export default function Connect() {
    const dispatch = useDispatch()
    const { ethereum } = window
    const {
        authenticate,
        isWeb3Enabled,
        isAuthenticated,
        user,
        enableWeb3,
        Moralis,
        logout
      } = useMoralis();

    const toggleMetaMask = () => {
        connectMetaMask()
        dispatch(chengeStatus(true))
        dispatch(setProvide('metamask'))
    }

    const toggWalletCOnnect = () => {
        if (!isAuthenticated){
            authenticate({ provider: "walletconnect"})
            
        }
        dispatch(setProvide('walletconnect'))
    }

    return (
        <div className="connect__container">
            <div className="connect">
                {
                    window.innerWidth <= 600 ? 
                    <>
                    <div className="fox">
                        <img src={MetaMask} alt="" />
                    </div>
                    <div className="connect__title">
                        { !ethereum ? <div className="connect__button"><a href="https://metamask.app.link/dapp/stake-testing.xp.network/">Connect MetaMask</a></div>
                        :
                        <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => toggleMetaMask()} className="connect__button">
                        Connect
                        </div>
                        }
                        
                    </div>
                    </>
                    :
                    <>
                        <div className="fox">
                            <img src={MetaMask} alt="" />
                        </div>
                        <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => toggleMetaMask()} className="connect__button">
                        MetaMask
                        </div>
                        <div className="fox">
                            <img src={walletconnect} alt="" />
                        </div>
                        <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => toggWalletCOnnect()} className="connect__button">
                        WalletConnect
                        </div>

                    </>
                }
                { !ethereum ? <div className="required">MetaMask is required</div> : null}
            </div>
        </div>
    )
}
