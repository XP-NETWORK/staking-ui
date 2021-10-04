import Web3 from "web3"
import stakeABI from "../ABI/XpNetStaker.json"

let stakeAddress = '0xe01D2743E56aaAFc7A8c27bA2F9623FA2e0D11D5'
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

export const stake = async (amonut, duration, account) => {
    debugger
    const weiValue = Web3.utils.toWei(amonut, 'ether');
    const durInSec = duration*2629746
    try{
        const Contract = await stakeContract()
        Contract.methods.stake(weiValue,durInSec).send({from:account})
        .once('receipt', function(receipt){
            console.log(receipt)})
    }
    catch(error){
        console.log(console.error())
    }
}