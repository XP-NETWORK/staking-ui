import Web3 from "web3"
import stakeABI from "../ABI/XpNetStaker.json"

export let stakeAddress = '0x8de823911D793F0404c6Cc74C94c0a08AcB834B9'
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
    debugger
    // const weiValue = Web3.utils.toWei(amonut, 'ether');
    const durInSec = 60*60*24*(duration * 30)
    try{
        console.log(durInSec, amount, duration)
        const Contract = await stakeContract()
        Contract.methods.stake(Number(amount), durInSec).send({from:account})
        .once('receipt', function(receipt){
            console.log(receipt)})
    }
    catch(error){
        console.log(console.error())
    }
}