import Web3 from "web3"
import stakeABI from "../ABI/XpNetStaker.json"

let stakeAddress = '0x7Db98eD5d52c33329d66228c946a4D3c853E62B6'
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

// export const checkBalance = async (address) => {
//     // debugger
//     try{
//         const balance = await stakeContract.methods.balanceOf({from: address}).call()
//         return balance
//     }
//     catch(error){
//         console.log(error)
//     }
// }