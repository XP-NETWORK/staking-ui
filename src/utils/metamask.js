import Web3 from "web3"
import ABI from "../ABI/XpNetStaker.json"
import { store } from "../redux/store"
import { chengeStatus } from "../redux/counterSlice";

let contract = '0x332CF8E0F619241E13731b0D7F002463F11c7a22'
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
    
    if(ethereum){
        const chainId = await W3.eth.getChainId()
        ethereum.on('accountsChanged', a => {
            // debugger
            console.log("...")
            store.dispatch(chengeStatus(a.length > 0))
            // accounts = a
            // console.log("metaMask connected.")
            // queryData()
        })    
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
    }
}