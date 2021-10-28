import Web3 from "web3"
import stakeABI from "../ABI/XpNetStaker.json"
import { store } from "../redux/store"
import { updateStakeInfo, updateAproveLockLoader } from "../redux/counterSlice"
import { updateImage, updateAmount, addLoader, updateWithdrawed, updateDuration, updateAvailableRewards ,updateStartTime, updateNftTokenId, updateNftTokenIndex, updateTokensArray, updateTokensAmount, updateTokensAmountFlag, updateIsUnlocked, updateWithdrawnAmount } from "../redux/stakeSlice"
import axios from "axios"







export let stakeAddress = '0xB61692F3425435203DD65Bb5f66a7A9Eac16CCc4'
// process.env.NODE_ENV === "development" ? '0xB61692F3425435203DD65Bb5f66a7A9Eac16CCc4' : 
// '0xbC9091bE033b276b7c2244495699491167C20037'
const W3 = new Web3(window.ethereum)

// ! GENERATE CONTRACT FOR FUNCTIONS.
const giveMeContract = async (Moralis, provider) => {

    // debugger
    let Contract
    if(provider === "MetaMask"){
        const web3 = await Moralis.enableWeb3();
        Contract = new web3.eth.Contract(stakeABI, stakeAddress);
    }
    else if(provider === "WalletConnect"){
        const web3 = await Moralis.enableWeb3({ provider: "walletconnect" });
        Contract = new web3.eth.Contract(stakeABI, stakeAddress);
    }
    return Contract
}



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
// export const logStakeContract = async () => {
//     const Contract = await stakeContract()
//     console.log(Contract)
//     }

// Lock the XPNet.
export const stake = async (amount, duration, account, history, Moralis, connection) => {
    debugger
    const weiValue = Web3.utils.toWei(amount.toString(), 'ether');
    let durInSec
    if(duration!==12){
         durInSec = 60*60*24*(duration * 30)
    }
    else{
         durInSec = 86400 * 365 
    }
    try{
        store.dispatch(updateAproveLockLoader(true))
        const Contract = await giveMeContract(Moralis, connection)
        Contract.methods.stake(weiValue, durInSec).send({from:account})
        .once('receipt', async function(receipt){
            console.log("stake: ", receipt);
            store.dispatch(updateAproveLockLoader(false))
            const t = await getAmountOfTokens(account)
            const {tokensAmountFlag, tokenAmount} = store.getState().data

            await tokenOfOwnerByIndex(t, account)
            history.push('/claim')
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
export const getAmountOfTokens = async (owner, Moralis, connection) => {
    debugger
    console.log("getAmountOfTokens: ", owner);
    const Contract = await giveMeContract(Moralis, connection)
    if(owner){
        try{
            const tokensAmount = await Contract.methods.balanceOf(owner).call()
            store.dispatch(updateTokensAmount(tokensAmount))
            // console.log("getAmountOfTokens: ", tokensAmount, "owner: ",owner);
            return tokensAmount
            }
            catch(error){
                console.log(error)
            }
    }
}



// Take the amount of tokens, open loop. In each iteraction take owner addres and index, push token to array.
export const tokenOfOwnerByIndex = async (tokenAmount, owner, Moralis, connection) => {
    let tokenArr = []
        if(parseInt(tokenAmount)){
            const num = tokenAmount
            const Contract = await giveMeContract(Moralis, connection)
            for (let i = 0; i < num; i++) {
                try{
                    const token = await Contract.methods.tokenOfOwnerByIndex(owner,i).call()
                    tokenArr.push(token)
                    const res = await axios.get(`https://staking-api.xp.network/staking-nfts/${token}/image`)
                    if(res) {
                        const { image } = res.data
                        store.dispatch(updateImage({ url: image, token }))
                    }
                }
                catch(error){
                    console.log(error)
                }
            }
            store.dispatch(updateTokensArray(tokenArr))
        }
}

// Get token by id.
export const getStakeById = async (id, index) => {
    // console.log("getStakeById", id);
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

export const stakes = async (id) => {
    const Contract = await stakeContract()
    try {
        const nft = await Contract.methods.stakes(id).call()
        console.log(nft);
        store.dispatch(updateStakeInfo(Object.values(nft)))
        store.dispatch(updateAmount(nft.amount))
        store.dispatch(updateDuration(nft.lockInPeriod))
        store.dispatch(updateStartTime(nft.startTime))
        store.dispatch(updateNftTokenId(nft.nftTokenId))
        store.dispatch(updateWithdrawnAmount(nft.rewardWithdrawn))
        // debugger
        const res = await axios.get(`https://staking-api.xp.network/staking-nfts/${id}/image`)
                    if(res) {
                        // debugger
                        const { image } = res.data
                        store.dispatch(updateImage({ url: image, token:id }))
                    }

    } catch (error) {
        console.log(error);
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

// Claim the rewards of chosen token.
export const claimXpNet = async (nftId,rewards, account) => {
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