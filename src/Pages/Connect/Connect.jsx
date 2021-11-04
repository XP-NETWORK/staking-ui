import React, { useEffect } from 'react'
import "./Connect.css"
import MetaMask from "../../assets/MetaMask_Big_Fox.svg"
import { connectMetaMask } from "../../utils/metamask"
import { useDispatch } from 'react-redux'
import { chengeStatus, setProvide, updateAccount } from "../../redux/counterSlice"
import { useWeb3React } from '@web3-react/core'
import { injected, walletconnect } from '../../utils/connectors'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export default function Connect() {
    const dispatch = useDispatch()
    const { ethereum } = window

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const onMetamask = async () => {
        try {
            await activate(injected)
            dispatch(setProvide("MetaMask"))

        } catch (error) {
            console.log(error);
        }
    }

    const onWalletConnect = async () => {
        try {
            const walletconnect = new WalletConnectConnector({ 
                rpc: { 
                    56: 'https://bsc-dataseed.binance.org'
                },
                supportedChainIds: [56],
                chainId: 56,
                qrcode: true,
            })
            walletconnect.networkId = 56
            await activate(walletconnect, undefined, true)
            dispatch(setProvide("WalletCOnnect"))

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        dispatch(updateAccount(account))
    }, [active])

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
                        <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => onMetamask()} className="connect__button">
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
                        <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => onMetamask()} className="connect__button">
                        MetaMask
                        </div>
                        <div onClick={() => onWalletConnect()}>WalletConnect</div>

                    </>
                }
                { !ethereum ? <div className="required">MetaMask is required</div> : null}
            </div>
        </div>
    )
}
