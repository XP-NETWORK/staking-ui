import Web3 from "web3"
import stakeABI from "../ABI/XpNetStaker.json"
import { store } from "../redux/store"
import { updateTokenIDs, updateStakeInfo } from "../redux/counterSlice"
import { updateAmount, updateDuration, updateStartDate ,updateStartTime, updateNftTokenId } from "../redux/stakeSlice"


export let stakeAddress = '0x65b8B135a07b65D0f888cc324d6179d7533E2f81'
const W3 = new Web3(window.ethereum)

const stakeContract = async () => {
    try{
        const Contract = await new W3.eth.Contract(stakeABI, stakeAddress)
        return Contract
    }
    catch(error){
        console.log(error)
    }

}

export const logStakeContract = async () => {
    const stContract = await stakeContract()
    console.log("stake contract: ", stContract)
}

export const stake = async (amount, duration, account) => {
    const weiValue = Web3.utils.toWei(amount, 'ether');
    debugger
    const durInSec = 60*60*24*(duration * 30)
    try{
        console.log(durInSec, amount, duration)
        const Contract = await stakeContract()
        console.log(amount, 'helo')
        Contract.methods.stake(weiValue, durInSec).send({from:account})
        .once('receipt', function(receipt){
            console.log(receipt)})
    }
    catch(error){
        console.log(console.error())
    }
}



export const balanceOf = async (owner) => {
    // debugger
    console.log("Balance of: ", owner)
    try{
        const Contract = await stakeContract()
        const str = await Contract.methods.balanceOf(owner).call()
        console.log("balance arr", str)
        tokenOfOwnerByIndex(str, owner)
    }
    catch(error){console.log(error)}

}

const tokenOfOwnerByIndex = async (str, owner) => {
    // debugger
    if(str){
    const num = parseInt(str)
    const Contract = await stakeContract()
    let tokens;
    for (let i = 0; i < num; i++) {
        try{
            const token = await Contract.methods.tokenOfOwnerByIndex(owner,i).call()
            console.log("token", token)
            store.dispatch(updateTokenIDs(token))
        }
        catch(error){
            console.log(error)
        }
    }
    }
}

export const getStakeById = async (id) => {
    debugger
    
    const Contract = await stakeContract()
    try{
        const info = await Contract.methods.stakes(id).call()
        console.log(info)
        store.dispatch(updateStakeInfo(Object.values(info)))
        store.dispatch(updateAmount(info.amount))
        // console.log("Staked amount: ", info.amount)
        store.dispatch(updateDuration(info.lockInPeriod))
        // console.log("lockInPeriod: ", info.lockInPeriod)
        store.dispatch(updateStartTime(info.startTime))
        // console.log("start time: ", info.startTime)
        store.dispatch(updateNftTokenId(info.nftTokenId))
    }
    catch(error){
        console.log(error)
    }
}

export const showAvailableRewards = async (nftId) => {
    console.log("nftTokenId: ", nftId)
    const Contract = await stakeContract()
    try{
    const awailable = await Contract.methods.showAvailableRewards(nftId).call()
    console.log("awailable:", awailable)
    }
    catch(error){
        console.log(error)
    }
}