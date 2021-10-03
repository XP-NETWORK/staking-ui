import Web3 from "web3"
import XPNET from "../ABI/XPToken.json"

let stakeAddress = "0xbc53f71E12007b93Ed2868E5f6CAE1D2ceB7287C"
const W3 = new Web3(window.ethereum)

const xpContract = async () => {
    try{
        const Contract = await new W3.eth.Contract(XPNET, stakeAddress)
        return Contract
    }
    catch(error){
        console.log(error)
    }
}

export const logXPContract = async () => {
    const XPContract = await xpContract()
    console.log("xp contract", XPContract)
}