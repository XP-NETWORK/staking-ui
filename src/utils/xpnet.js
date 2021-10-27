import Web3 from "web3"
import XPNET from "../ABI/XPToken.json"
import { store } from "../redux/store"
import { updateBalance, updateApproved, updateAllowence, updateAproveButtonsLoader } from "../redux/counterSlice"
import { stakeAddress } from "./stake"
import WalletConnectProvider from "@walletconnect/web3-provider"
// import { Moralis } from "react-moralis"




const supportedChainIds = [
    3, // ropsten
]
export let xpAddress = "0x067AC3B5fE293624C7d2e2c0fE463D1687763E8C"
// process.env.NODE_ENV === "development" ? '0x067AC3B5fE293624C7d2e2c0fE463D1687763E8C' : 
// "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a"
const state = store.getState();
let W3
let contract

export const schooseProvider = provider => {
// debugger
console.log("schooseProvider: ", provider );
    if(provider === "MetaMask"){ 
        console.log("Selected Provider: ", window.ethereum)
        W3 = new Web3(window.ethereum) 
    }
    else if(provider === "WalletConnect"){
       const provider = new WalletConnectProvider({
        infuraId: '20c6beb49cd1402db84120a858bc74af',
        bridge: 'https://bridge.walletconnect.org',
        supportedChainIds,
        rpc: {
            3: 'https://ropsten.infura.io/v3/20c6beb49cd1402db84120a858bc74af'
            }
        })
        console.log("Selected Provider: ", provider)
        W3 = new Web3(provider)
        // const getAccounts = async () => {
        //     debugger
        //     const accounts = await provider.enable()
        //     console.log(accounts)
        // }
        // getAccounts()
    }
}

// !!! 
// export const checkProvider = () => {
//     // debugger
//     const provider = new WalletConnectProvider({
//         infuraId: '20c6beb49cd1402db84120a858bc74af',
//         bridge: 'https://bridge.walletconnect.org',
//         supportedChainIds,
//         rpc: {
//             3: 'https://ropsten.infura.io/v3/20c6beb49cd1402db84120a858bc74af'
//         }
        
//     })
//     // const toggler = state.data.toggleConnection
//     // console.log("checkProvider: ", toggler);
//     if(toggler === "MetaMask"){
//         W3 = new Web3(window.ethereum)
//     }
//     else if(toggler === "provider"){
//         W3 = new Web3(provider)
//     }

//     // W3 = new Web3( toggler === "MetaMask" ? window.ethereum : provider)
//     // W3 = new Web3(provider)
// }

// const W3 = new Web3(window.ethereum)


// Create xpNet smart contract.
const xpContract = async () => {
    console.log("xpContract: ", W3);
    try{
        console.log("xpContract: ", W3);
        const Contract = await new W3.eth.Contract(XPNET, xpAddress)
        contract = Contract
        return Contract
    }
    catch(error){
        console.log(error)
    }
}

// Log XPNet smart contract to console.
export const logXPContract = async () => {
    const XPContract = await xpContract()
  
}

// Check balance on this account.
export const checkBalance = async (address) => {
    console.log("checkBalance", address);
    if(address){
        try{
            debugger
            const Contract = await xpContract()
            const weiBalance = await Contract.methods.balanceOf(address).call()
            const balance = parseInt(Web3.utils.fromWei(weiBalance, 'ether'));
            store.dispatch(updateBalance(balance))
            return balance
        }
        catch(error){
            console.log(error)
        }
    }
}

// Approve this account.
export const approve = async (account, Moralis, provider) => {
    debugger
    // console.log("approve: ", account, "stake: ", stakeAddress);
    // console.log("approve: ", W3._provider.connected);
    let Contract
    if(provider === "Metamask"){
        const web3 = await Moralis.enableWeb3();
        Contract = new web3.eth.Contract(XPNET, xpAddress);
    }
    else if(provider === "WalletConnect"){
        const web3 = await Moralis.enableWeb3({ provider: "walletconnect" });
        Contract = new web3.eth.Contract(XPNET, xpAddress);
    }
    try{
        store.dispatch(updateAproveButtonsLoader(true))
        // const Contract = await xpContract()
        // console.log("approve: ", contract);
        // debugger
        
        // console.log(Contract)
        await Contract.methods.approve(stakeAddress, '10000000000000000000000000000000000000000000000000').send({from: account})
        .once('receipt', function(receipt){
            store.dispatch(updateAproveButtonsLoader(false))
            store.dispatch(updateApproved(true))
            checkAllowence(account)
        })
        .on('error', () => {
            store.dispatch(updateAproveButtonsLoader(false))
        })
    }
    catch(error){
        // debugger
        store.dispatch(updateAproveButtonsLoader(false))
        console.log(error)
    }
}

// Check the allowence on this account.
export const checkAllowence = async (owner) => {
    // debugger
    console.log("checkAllowence: ", owner);
    if(owner){
        try{
            const Contract = await xpContract()
            const allowence = await Contract.methods.allowance(owner, stakeAddress).call()
            console.log("checkAllowence: ", allowence);
            if(parseInt(allowence)) store.dispatch(updateAllowence(allowence))
            // console.log("checkAllowence");
        }
        catch(error){
            console.log(error)
        }
    }
}

