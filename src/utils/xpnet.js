import Web3 from "web3"
import XPNET from "../ABI/XPToken.json"
import { store } from "../redux/store"
import { updateBalance, updateApproved, updateAllowence, updateAproveButtonsLoader, setNotEnoughGas } from "../redux/counterSlice"
import { stakeAddress } from "./stake"


//! XPNET
export let xpAddress =  "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a"
const axios = require("axios");
// export let xpAddress =  process.env.NODE_ENV === "development" ? '0x067AC3B5fE293624C7d2e2c0fE463D1687763E8C' : "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a"

const xpContract = async (library) => {
    try{
        let W3
        if(library && library._provider) {
            W3 = new Web3(library._provider)
        }   else W3 = new Web3(window.ethereum)
        // console.log(W3)
        const contract = await new W3.eth.Contract(XPNET, xpAddress)
        return contract
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
export const checkBalance = async (address, library) => {
// debugger
    try{
        const Contract = await xpContract(library)
        const weiBalance = await Contract.methods.balanceOf(address).call()
        const balance = parseInt(Web3.utils.fromWei(weiBalance, 'ether'));
        store.dispatch(updateBalance(balance))
        return balance
    }
    catch(error){
        console.log(error)
    }
}

export const approve = async (account, library) => {
    // debugger
    let res
    try {
         res = await axios.get(`https://api.bscscan.com/api?module=account&action=balance&address=${account}&apikey=YourApiKeyToken`)
        
    } catch (error) {
        console.error(error)
    }
    store.dispatch(updateAproveButtonsLoader(true))
    const Contract = await xpContract(library)
    const web3 = new Web3(window.ethereum) || library;
    // let balance = res.data.status
    // await web3.eth.getBalance(account, "latest", function(error, result) {
    //     if(error)console.error(error)
    //     balance = result || undefined
    // })
    const ethBalance = parseFloat(web3.utils.fromWei(res.data.result))
    const gas = await Contract.methods.approve(stakeAddress, '10000000000000000000000000000000000000000000000000').estimateGas({from: account})
    const ethGas = parseFloat(web3.utils.fromWei(gas.toString(), "gwei"))
    if(ethBalance > ethGas){
        try{
            const Contract = await xpContract(library)
            await Contract.methods.approve(stakeAddress, '10000000000000000000000000000000000000000000000000').send({from: account})
            
            store.dispatch(updateAproveButtonsLoader(false))
            store.dispatch(updateApproved(true))
            checkAllowence(account, library)
        }
        catch(error){
            store.dispatch(updateAproveButtonsLoader(false))
            console.log(error)
        }
    }
    else{
        // alert("not enough");
        store.dispatch(updateAproveButtonsLoader(false))
        store.dispatch(setNotEnoughGas(true))
    }
}

// Check the allowence on this account.
export const checkAllowence = async (owner, library) => {
    if(owner){
        try{
            const Contract = await xpContract(library)
            const allowence = await Contract.methods.allowance(owner, stakeAddress).call()
            if(parseInt(allowence)) store.dispatch(updateAllowence(allowence))
        }
        catch(error){
            console.log(error)
        }
    }
}

