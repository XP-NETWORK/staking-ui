import Web3 from "web3"
import XPNET from "../ABI/XPToken.json"
import { store } from "../redux/store"
import { updateBalance } from "../redux/counterSlice"

let xpAddress = "0xbc53f71E12007b93Ed2868E5f6CAE1D2ceB7287C"
const W3 = new Web3(window.ethereum)

const xpContract = async () => {
    try{
        const Contract = await new W3.eth.Contract(XPNET, xpAddress)
        return Contract
    }
    catch(error){
        console.log(error)
    }
}

export const logXPContract = async () => {
    const XPContract = await xpContract()
    console.log("xp contract", XPContract)
}


export const checkBalance = async (address) => {
    // debugger
    try{
        const Contract = await xpContract()
        const balance = await Contract.methods.balanceOf(address).call()
        console.log(balance)
        store.dispatch(updateBalance(balance))
        return balance
    }
    catch(error){
        console.log(error)
    }
}

export const approve = async (account) => {
    // console.log("heelo approve", balance)
    console.log("approve", account)
    // const weiValue = Web3.utils.toWei(balance, 'ether');

    // console.log(weiValue)
    try{
        const Contract = await xpContract()
        console.log("approve", Contract)
        Contract.methods.approve(xpAddress, '10000000000000000000000000000000000000000000000000').send({from: account})
        .once('receipt', function(receipt){ console.log(receipt) })
    }
    catch(error){
        console.log(error)
    }
} 

