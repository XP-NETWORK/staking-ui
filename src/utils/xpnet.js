import Web3 from "web3"
import XPNET from "../ABI/XPToken.json"
import { store } from "../redux/store"
import { updateBalance, updateApproved, updateAllowence, updateAproveButtonsLoader } from "../redux/counterSlice"
import { stakeAddress } from "./stake"

// export let xpAddress =  "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a"
export let xpAddress =  process.env.NODE_ENV === "development" ? '0x067AC3B5fE293624C7d2e2c0fE463D1687763E8C' : "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a"

const xpContract = async (library) => {
    try{
        let W3
        if(library && library._provider) {
            W3 = new Web3(library._provider)
        }   else W3 = new Web3(window.ethereum)
        console.log(W3)
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

    try{
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

// Approve this account.
export const approve = async (account, library) => {
    try{
        store.dispatch(updateAproveButtonsLoader(true))
        const Contract = await xpContract(library)
        console.log(Contract)
        Contract.methods.approve(stakeAddress, '10000000000000000000000000000000000000000000000000').send({from: account})
        .once('receipt', function(receipt){
            store.dispatch(updateAproveButtonsLoader(false))
            store.dispatch(updateApproved(true))
            checkAllowence(account, library)
        })
        .on('error', () => {
            store.dispatch(updateAproveButtonsLoader(false))
        })
    }
    catch(error){
        store.dispatch(updateAproveButtonsLoader(false))
        console.log(error)
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

