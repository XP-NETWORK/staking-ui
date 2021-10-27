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
        // console.log(str);
        if(str === "MetaMask"){
            dispatch(toggleConnection("MetaMask"))
            // initMetaMask()
            // connectMetaMask()
            authenticate().then(()=>{
                dispatch(updateAccount(user.attributes.accounts[0]))
                // console.log(user.attributes.accounts[0]);
            })

        }
        else{
            dispatch(toggleConnection("WalletConnect"))
            authenticate({ provider: "walletconnect" }).then(()=>{
                dispatch(updateAccount(user.attributes.accounts[0]))
            })
            // console.log("wallet");
            // dispatch(toggleConnection("WalletConnect"))
            // const supportedChainIds = [
            //     3, // ropsten
            // ]
            // const provider = new WalletConnectProvider({
            //     infuraId: '20c6beb49cd1402db84120a858bc74af',
            //     bridge: 'https://bridge.walletconnect.org',
            //     supportedChainIds,
            //     qrcodeModal: QRCodeModal,
            //     rpc: {
            //         3: 'https://ropsten.infura.io/v3/20c6beb49cd1402db84120a858bc74af'
            //     }
            // })
           
            // try {
            //     debugger
            //     const accounts = await provider.enable()
            //     // console.log(accounts, 'assdadsa')
            //     dispatch(updateAccount(accounts[0]))
            //     provider.on("open", () => {
            //         console.log("open");
            //       });
            //       // Subscribe to session disconnection/close
            //     provider.on("close", (code, reason) => {
            //         console.log(code, reason);
            //       });

            //     provider.on("connect", (error, payload) => {
            //         if (error) {
            //           throw error;
            //         }
            //         // Get provided accounts and chainId
            //         const { accounts, chainId } = payload.params[0];
            //       });
            // }catch(err) {
            //     console.log(err)
            // }
  
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
