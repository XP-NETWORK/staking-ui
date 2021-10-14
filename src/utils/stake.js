import Web3 from "web3"
import stakeABI from "../ABI/XpNetStaker.json"
import { store } from "../redux/store"
import { updateStakeInfo, updateAproveLockLoader } from "../redux/counterSlice"
import { updateAmount, addLoader, updateWithdrawed, updateDuration, updateAvailableRewards ,updateStartTime, updateNftTokenId, updateNftTokenIndex, updateTokensArray, updateTokensAmount, updateTokensAmountFlag, updateIsUnlocked } from "../redux/stakeSlice"



export let stakeAddress = '0x8c60FA038f5A269D131978fAf9d3d7072A1a0396'
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
    const Contract = await stakeContract()
    console.log(Contract)
    }

// Lock the XPNet.
export const stake = async (amount, duration, account) => {
    const weiValue = Web3.utils.toWei(amount.toString(), 'ether');
    let durInSec
    if(duration!==1){
         durInSec = 60*60*24*(duration * 30)
    }
    else{
         durInSec = 31622400 
    }
    try{
        store.dispatch(updateAproveLockLoader(true))
        const Contract = await stakeContract()
        Contract.methods.stake(weiValue, durInSec).send({from:account})
        .once('receipt', async function(receipt){
            // debugger
            store.dispatch(updateAproveLockLoader(false))
            await getAmountOfTokens(account)
            // console.log(receipt)
        })
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
    const Contract = await stakeContract()
    if(owner){
        try{
            const tokensAmount = await Contract.methods.balanceOf(owner).call()
            store.dispatch(updateTokensAmount(tokensAmount))
            }
            catch(error){
                console.log(error)
            }
    }
}


// Take the amount of tokens, open loop. In each iteraction take owner addres and index, push token to array.
export const tokenOfOwnerByIndex = async (flag, tokenAmount, owner) => {
    let tokenArr = []
    if(flag === false){
        if(tokenAmount){
            const num = parseInt(tokenAmount)
            const Contract = await stakeContract()
            for (let i = 0; i < num; i++) {
                try{
                    // debugger
                    const token = await Contract.methods.tokenOfOwnerByIndex(owner,i).call()
                    tokenArr.push(token)
                    store.dispatch(addLoader({id:token, loader:false}))
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
    const Contract = await stakeContract()
    try{
        const info = await Contract.methods.stakes(id).call()
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


export const showAvailableRewards = async (nftId) => {
    const Contract = await stakeContract()
    try{
    const available = await Contract.methods.showAvailableRewards(nftId).call()

    store.dispatch(updateAvailableRewards(available))
    return available
    }
    catch(error){
        console.log(error)
    }
}

// Claim the rewards of choesen token.
export const claimXpNet = async (nftId,rewards, account) => {
    debugger
    // store.dispatch(updateWithdrawed(true))
    const Contract = await stakeContract()
    try{
        await Contract.methods.withdrawRewards(nftId, rewards).send({from:account})
        .once('receipt', () => {
            store.dispatch(updateWithdrawed(false))
        })
        .on('error', () => {
            store.dispatch(updateWithdrawed(false))
        })
    }
    catch(error){
        console.log(error)
    }
}

// Withdrow token and rewards. 
export const withrow = async ( nftId, adress ) => {
    debugger
    const Contract = await stakeContract()
    try{
        const result = await Contract.methods.withdraw(nftId).send({from:adress})
    }
    catch(error){
        console.log(error)
    }
} 


export const checkIsUnLocked = async (id) => {
    const Contract = await stakeContract()
    try{
        const isUnlocked = await Contract.methods.checkIsUnlocked(id).call()
        store.dispatch(updateIsUnlocked(isUnlocked))
    }
    catch(error){
        console.log(error)
    }
}