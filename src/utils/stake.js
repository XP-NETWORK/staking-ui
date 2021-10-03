import Web3 from "web3"
import stakeABI from "../ABI/XpNetStaker.json"

let stakeAddress = '0x332CF8E0F619241E13731b0D7F002463F11c7a22'
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