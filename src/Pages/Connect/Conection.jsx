import React from 'react'
import { toggleConnection, updateAccount } from "../../redux/counterSlice"
import { useDispatch } from 'react-redux'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { initMetaMask, connectMetaMask } from '../../utils/metamask';
export default function Conection() {
    const { ethereum } = window
    const dispatch = useDispatch()
    // const toggler = useSelector(state => state.data.toggleConnection)


    const connectionHandler =  async str  => {
        // console.log(str);
        if(str === "MetaMask"){
            dispatch(toggleConnection("MetaMask"))
            // initMetaMask()
            connectMetaMask()
        }
        else{
            console.log("wallet");
            // dispatch(toggleConnection("WalletConnect"))
            const provider = new WalletConnectProvider({
                infuraId: '20c6beb49cd1402db84120a858bc74af',
                qrcode: true,
                rpc: {
                    3: 'https://ropsten.infura.io/v3/20c6beb49cd1402db84120a858bc74af'
                }
            })
            try {
                const accounts = await provider.enable()
                // console.log(accounts, 'assdadsa')
                dispatch(updateAccount(accounts[0]))
                provider.on("open", () => {
                    console.log("open");
                  });
                  // Subscribe to session disconnection/close
                provider.on("close", (code, reason) => {
                    console.log(code, reason);
                  });
            }catch(err) {
                console.log(err)
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
                <div onClick={()=> connectionHandler('WalletConnect') } className="init__button">
                    WalletConnect
                </div>
            </div>
        </div>
    )
}
