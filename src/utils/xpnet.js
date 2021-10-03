import Web3 from "web3"
import XPNET from "../ABI/XPToken.json"
import { store } from "../redux/store"
import { updateXPNetToken } from "../redux/counterSlice";


let xpContract = "0xbc53f71E12007b93Ed2868E5f6CAE1D2ceB7287C"
const W3 = new Web3(window.ethereum)

const getXPToken = async () => {
    const Contract = await new W3.eth.Contract(XPNET, xpContract)
    return Contract
}

export const updateXPToken = () => {
    getXPToken()
}