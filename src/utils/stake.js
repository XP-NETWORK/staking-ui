import Web3 from "web3"
import stakeABI from "../ABI/XpNetStaker.json"
import { store } from "../redux/store"
import { updateTokenIDs, updateStakeInfo, updateAproveLockLoader } from "../redux/counterSlice"
import { updateAmount, updateDuration, updateAvailableRewards ,updateStartTime, updateNftTokenId, updateNftTokenIndex, updateTokensArray, updateTokensAmount, updateTokensAmountFlag, updateIndex } from "../redux/stakeSlice"


export let stakeAddress = '0xcd3eE3F9f01690abe6D8759D381047644b92e05F'
const W3 = new Web3(window.ethereum)

// Create staker smart contract.
const stakeContract = async () => {
    try{
        const Contract = await new W3.eth.Contract(stakeABI, stakeAddress)
        return Contract
    }
    catch(error){
        console.log(error)
    }
}

// Log the contract.
export const logStakeContract = async () => {
    const stContract = await stakeContract()
    console.log("stake contract: ", stContract)
}

// Lock the XPNet.
export const stake = async (amount, duration, account) => {
    const weiValue = Web3.utils.toWei(amount.toString(), 'ether');
    debugger
    let durInSec
    if(duration!==1){
         durInSec = 60*60*24*(duration * 30)
    }
    else{
         durInSec = 31622400 
    }
    try{
        // console.log(durInSec, amount, duration)
        store.dispatch(updateAproveLockLoader(true))
        const Contract = await stakeContract()
        // console.log(amount, 'helo')
        console.log(durInSec, 'seconds', duration)
        Contract.methods.stake(weiValue, durInSec).send({from:account})
        .once('receipt', function(receipt){
            store.dispatch(updateAproveLockLoader(false))
            console.log(receipt)})
        .on('error',() => {
            store.dispatch(updateAproveLockLoader(false))
        })
    }
    catch(error){
        store.dispatch(updateAproveLockLoader(false))
        console.log(console.error())
    }
}

// Take owner addres and get amount of tokens on owner. APP
export const getAmountOfTokens = async (owner) => {
    // debugger
    const Contract = await stakeContract()
    if(owner){
        try{
            const tokensAmount = await Contract.methods.balanceOf(owner).call()
            // console.log("getAmountOfTokens:", tokensAmount)
            store.dispatch(updateTokensAmount(tokensAmount))
            }
            catch(error){
                console.log(error)
            }
    }
}


// Take the amount of tokens, open loop. In each iteraction take owner addres and index, push token to array.
export const tokenOfOwnerByIndex = async (flag, tokenAmount, owner) => {
    // debugger
    let tokenArr = []
    if(flag === false){
        if(tokenAmount){
            const num = parseInt(tokenAmount)
            const Contract = await stakeContract()
            for (let i = 0; i < num; i++) {
                try{
                    const token = await Contract.methods.tokenOfOwnerByIndex(owner,i).call()
                    console.log(`toke: ${i}: `, token)
                    tokenArr.push(token)
                }
                catch(error){
                    console.log(error)
                }
            }
            store.dispatch(updateTokensArray(tokenArr))
            store.dispatch(updateTokensAmountFlag(true))
        
        }
    }
}

// Get token by id.
export const getStakeById = async (id, index) => {
    // debugger
    console.log("getStakeById")
    const Contract = await stakeContract()
    try{
        const info = await Contract.methods.stakes(id).call()
        console.log(info)
        store.dispatch(updateNftTokenIndex(index))
        store.dispatch(updateStakeInfo(Object.values(info)))
        store.dispatch(updateAmount(info.amount))
        store.dispatch(updateDuration(info.lockInPeriod))
        store.dispatch(updateStartTime(info.startTime))
        store.dispatch(updateNftTokenId(info.nftTokenId))
    }
    catch(error){
        console.log(error)
    }
}

// Show the rewards of the token.
export const showAvailableRewards = async (nftId) => {
    console.log("nftTokenId: ", nftId)
    const Contract = await stakeContract()
    try{
    const available = await Contract.methods.showAvailableRewards(nftId).call()
    console.log("available:", available)
    store.dispatch(updateAvailableRewards(available))
    return available
    }
    catch(error){
        console.log(error)
    }
}

// Claim the rewards of choesen token.
export const claimXpNet = async (nftId,rewards, account) => {
    const Contract = await stakeContract()
    try{
    const claimed = await Contract.methods.withdrawRewards(nftId, rewards).send({from:account})
    }
    catch(error){
        console.log(error)
    }
}

// Withdrow token and rewards. 
export const withrow = async ( nftId, adress ) => {
    const Contract = await stakeContract()
    try{
        const withdrawen = Contract.methods.withdraw(nftId).send({from:adress})
    }
    catch(error){
        console.log(error)
    }
} 