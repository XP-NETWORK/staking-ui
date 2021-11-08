import React, { useEffect } from 'react'
import "./Connect.css"
import MetaMask from "../../assets/MetaMask_Big_Fox.svg"
import  walletconnectLogo  from "../../assets/metaLogo.png"
import { connectMetaMask } from "../../utils/metamask"
import { useDispatch } from 'react-redux'
import { setProvide, updateAccount, changeStatus, setButtonPushed, updateChainId } from "../../redux/counterSlice"
import { useWeb3React } from '@web3-react/core'
import { injected, walletconnect } from '../../utils/connectors'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

export default function Connect() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { ethereum } = window

    const connectPushed = useSelector(state => state.data.connectPushed)
    console.log("connectPushed", connectPushed)
    const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React()


    const onMetamask = async () => {
        try {
            await activate(injected)
            dispatch(setProvide("MetaMask"))

        } catch (error) {
            console.log(error);
        }
        dispatch(setButtonPushed(true))
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
        dispatch(setButtonPushed(true))
    }

    useEffect(() => {
        if(account){
            dispatch(updateAccount(account))
            dispatch(changeStatus(true))
            dispatch(updateChainId(chainId))
            history.push("/stake")
        }
    }, [active])

    return (
        <div className="connect__container">
            <div className="connect">
                <div className="fox">
                    <img src={MetaMask} alt="" />
                </div>
                <div>
                    { !ethereum ? <div className="connect__button"><a href="https://metamask.app.link/dapp/stake.xp.network/">MetaMask</a></div>
                    :
                    <div onClick={() => onMetamask()} className="connect__button">
                    MetaMask
                    </div>
                    }
                </div>
            </div>
            <div className="connect">
                <div className="meta">
                    <img src={walletconnectLogo} alt="" />
                </div>
                <div className="connect__button" onClick={() => onWalletConnect()}>WalletConnect</div>
            </div>
        </div>
    )
}
