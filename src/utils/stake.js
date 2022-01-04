import Web3 from "web3"
import stakeABI from "../ABI/XpNetStaker.json"
import { store } from "../redux/store"
import { createStore } from "redux"
import { totalSupplay, updateManyCollection, setAvgObj } from "../redux/totalSupplay"
import { updateCollection, updateLoaded } from "../redux/totalSupplay"
import { updateStakeInfo, updateAproveLockLoader } from "../redux/counterSlice"
import { updateImage, updateAmount, addLoader, updateWithdrawed, updateDuration, updateAvailableRewards ,updateStartTime, updateNftTokenId, updateNftTokenIndex, updateTokensArray, updateTokensAmount, updateWithdrawnAmount, updateIsUnlocked, setNFTNotExist } from "../redux/stakeSlice"
import axios from "axios"
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'



export const walletconnect = new WalletConnectConnector({ 
    rpc: { 
        // 1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        3: "https://ropsten.mycustomnode.com",
        56: 'https://bsc-dataseed.binance.org'
    },
})

// export let stakeAddress =  process.env.NODE_ENV === "development" ? '0xB61692F3425435203DD65Bb5f66a7A9Eac16CCc4' : '0xbC9091bE033b276b7c2244495699491167C20037'
export let stakeAddress = "0xbC9091bE033b276b7c2244495699491167C20037"
const state = store.getState()
const p = state.data.provider
const W3 = new Web3( p === "WalletCOnnect" ? walletconnect : window.ethereum )



// Create staker smart contract.
const stakeContract = async (library) => {
    try{
        let W3
        if(library && library._provider) {
            W3 = new Web3(library._provider)
        }   else W3 = new Web3(window.ethereum)
        console.log(W3)
        const contract = await new W3.eth.Contract(stakeABI, stakeAddress)
        return contract
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

// async function getAvg(){
    
//     let object = {}
//     const Contract = await stakeContract()
//     try {
//         const allNFTs = await Contract.methods.totalSupply().call() 
//         const length = +allNFTs
//         // const nfts = Number(allNFTs)
//         for (let index = 0; index < 2; index++) {
//             debugger
//             const nft = await Contract.methods.stakes(index).call()
//             const address = nft[5]
//             if(nft){
//                 if(object[address]){
//                     object[address].push(nft[0])
//                 } 
//                 else{
//                     object[nft[5]] = [nft[0]]
//                 }
//             }
//         }
        
//     } catch (error) {
//         console.log(error);
//     } 
    
//     const parsed = JSON.stringify(object)
//     console.log(parsed);
//     // const file = new Blob(parsed, {type: 'text/plain'});
//     // console.log(file);
//     // fs.writeFile("./test.txt", parsed, function(err) {
        
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     // });
// }

// getAvg()

// Lock the XPNet.
export const stake = async (amount, duration, account, history, library) => {

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
        const Contract = await stakeContract(library)
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
export const getAmountOfTokens = async (owner,library) => {
    const Contract = await stakeContract(library)
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
export const tokenOfOwnerByIndex = async (tokenAmount, owner, library) => {
    let tokenArr = []
        if(parseInt(tokenAmount)){
            const num = tokenAmount
            const Contract = await stakeContract(library)
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
export const getStakeById = async (id, index, library) => {
    const Contract = await stakeContract(library)
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



export const showAvailableRewards = async (nftId, library) => {
    const Contract = await stakeContract(library)
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
export const claimXpNet = async (nftId,rewards, account, library) => {
    // store.dispatch(updateWithdrawed(true))
    const Contract = await stakeContract(library)
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
export const withrow = async ( nftId, adress, library ) => {
    const Contract = await stakeContract(library)
    try{
        const result = await Contract.methods.withdraw(nftId).send({from:adress})
    }
    catch(error){
        console.log(error)
    }
} 


export const checkIsUnLocked = async (id, library) => {
    const Contract = await stakeContract(library)
    try{
        const isUnlocked = await Contract.methods.checkIsUnlocked(id).call()
        store.dispatch(updateIsUnlocked(isUnlocked))
    }
    catch(error){
        console.log(error)
    }
}

export const totalSupply = async (index, length, library) => {
    // debugger
    const Contract = await stakeContract(library)
    
    try {
        const allNFTs = await Contract.methods.totalSupply().call()
        // getAvg(allNFTs, library)
        const array = (await Promise.all(new Array(length).fill(0).map((n,i) => i+ index).map(async n => {
            const res = (await axios.get(`https://staking-api.xp.network/staking-nfts/${n}/image`)).data
            const nft = await Contract.methods.stakes(n).call()
            return { nft, ...res}
        }))).map((n,i)=> ({ url: n.image, token: i + index, staker: n.nft[5], period: n.nft[2], amount: n.nft[0] }))

        store.dispatch(updateManyCollection(array))
        store.dispatch(updateLoaded(true))
        
    } catch (error) {
        console.log(error);
    }
}


export const stakes = async (id, library) => {
    
    const Contract = await stakeContract(library)
    try {
        const nft = await Contract.methods.stakes(id).call()
        store.dispatch(updateStakeInfo(Object.values(nft)))
        store.dispatch(updateAmount(nft.amount))
        store.dispatch(updateDuration(nft.lockInPeriod))
        store.dispatch(updateStartTime(nft.startTime))
        store.dispatch(updateNftTokenId(nft.nftTokenId))
        store.dispatch(updateWithdrawnAmount(nft.rewardWithdrawn))
        const res = await axios.get(`https://staking-api.xp.network/staking-nfts/${id}/image`)
                    if(res) {
                        const { image } = res.data
                        store.dispatch(updateImage({ url: image, token: id}))
                    }

    } catch (error) {
        console.log(error);
    }
}

export const stakesGallery = async (id, library) => {
    debugger
    const Contract = await stakeContract(library)
    try {
        const nft = await Contract.methods.stakes(id).call()
        const res = await axios.get(`https://staking-api.xp.network/staking-nfts/${id}/image`)
            if(res) {
                const { image } = res.data
                store.dispatch(setNFTNotExist(false))
                store.dispatch(updateCollection({url: image, token: id, staker: nft[5], period: nft[2], amount: nft[0] }))
            }
    } catch (error) {
        console.log(error.message);
        store.dispatch(setNFTNotExist(true))
    }
}

