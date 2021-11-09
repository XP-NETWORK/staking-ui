import { useWeb3React } from '@web3-react/core'
import React, {useEffect} from 'react'
import { injected, walletconnect } from '../../utils/connectors'




export default function Connection() {

    const { chainId, active, account, library, connector, activate, deactivate } = useWeb3React()

    const connect = async () => {
        try {
            await activate(injected)

        } catch (error) {
            console.log(error);
        }
    }

    const connectToWalletConnect = async () => {
        try {
            await activate(walletconnect)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log(account, 'account')

    }, [active])
    return (
        <div>
            <div onClick={() => connect()}>Connect to MetaMask</div>
            <div onClick={() => connectToWalletConnect()}>Connect to WalletConnect</div>
        </div>
    )
}
