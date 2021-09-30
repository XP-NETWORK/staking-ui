import Web3 from "web3"
import ABI from "../ABI/XpNetStaker.json"
import { store } from "../redux/store"
import { chengeStatus } from "../redux/counterSlice";

let contract = '0x31444E7110f33Db6CD6F23663BA21ea764139d78'
const W3 = new Web3(window.ethereum)

let accounts
const { ethereum } = window

const getAccounts = async () => {
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    console.log(accounts)
    return accounts
}

export const connectMetaMask = function() { 
    ethereum.request({ method: 'eth_requestAccounts' })
    // store.dispatch(chengeStatus())
}


const queryData = async () => {
    // debugger
        const Contract = await new W3.eth.Contract(ABI, contract)
        console.log(Contract)


}

export const initMetaMask = async () => {
    // debugger

    if (typeof ethereum !== 'undefined' && ethereum.isMetaMask) {
        accounts = await getAccounts()
        if(accounts && accounts.length > 0) {
            store.dispatch(chengeStatus(true))
            queryData()
        } else {
            store.dispatch(chengeStatus(false))
            console.log("Need to connect.")
        }
    }
    else{
        console.log("MetaMask is required.")
    }

  
    //   if(ethereum){ 
    //     const chainId = await W3.eth.getChainId()
    //     ethereum.on('chainChenged', chainId => {window.location.reload()})
    //     if(chainId === 56){
    //         ethereum.on('accountsChenged', a => {
    //             accounts = a
    //             console.log("metaMask connected.")
    //             queryData()
    //     })
    //     if(typeof ethereum !== 'undefined' && ethereum.isMetaMask){
    //             accounts = await getAccounts()
    //             console.log(accounts)
    //             if(accounts && accounts.loggedIn > 0){
    //                 queryData()
    //                 }
    //                 else{

    //                 }
    //             }
    //         }
    //         }
    //         else{
    //         console.log("MetaMask is required.")
    //     }

}