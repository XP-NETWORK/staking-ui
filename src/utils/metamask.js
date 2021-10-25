import { store } from "../redux/store"
import { chengeStatus, updateAccount } from "../redux/counterSlice";

let accounts
const { ethereum } = window

const getAccounts = async () => {
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    store.dispatch(updateAccount(accounts[0]))
    return accounts
}

export const connectMetaMask = function() { 
    ethereum.request({ method: 'eth_requestAccounts' })
    getAccounts()
}

export const initMetaMask = async () => {
    if(ethereum){
        if (typeof ethereum !== 'undefined' && ethereum.isMetaMask) {
            accounts = await getAccounts()
            if(accounts && accounts.length > 0) {
                store.dispatch(chengeStatus(true))
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