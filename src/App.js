import './App.css';
import './Normalize.css'
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import { initMetaMask } from "../src/utils/metamask"
import { getActualTime, updateCurrentPrice, updateAccount, chengeStatus} from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { logXPContract, checkBalance, checkAllowence } from "../src/utils/xpnet"
import { logStakeContract, showAvailableRewards, getAmountOfTokens, tokenOfOwnerByIndex } from "../src/utils/stake"
import moment from 'moment';
import axios from 'axios';
import Web3 from "web3"




function App() {
const balance = useSelector(state => state.data.balance)
// console.log('app balance: ', balance)
const tokens = useSelector(state => state.data.tokenIDs)
console.log('app tokens: ', tokens)
const stakeInfo = useSelector(state => state.data.stakeInfo)
// console.log(stakeInfo)
const stakedAmount = useSelector(state => state.stakeData.amount)
// console.log("stakedAmount: ", stakedAmount)
const period = useSelector(state => state.stakeData.duration)
// console.log("period: ", period)
const startTime = useSelector(state => state.stakeData.startTime)
const startDate = useSelector(state => state.stakeData.startDate)
const rewardsWai = useSelector(state => state.stakeData.availableRewards)
const dispatch = useDispatch()
const address = useSelector(state => state.data.account)
const getCurrentPrice = async () => {
  const currentPrice = (await axios.get("https://api.xp.network/current-price")).data
  // console.log("price", currentPrice)
  dispatch(updateCurrentPrice(currentPrice))
}

const updateBalance = async () => {
  const balance = await checkBalance(address)
  // console.log(balance)
}

const doDate = () => {
    let str = moment().format('YYYY-MM-DD hh:mm')
    dispatch(getActualTime(str))
}

const accountsChanged = () => {
  const { ethereum } = window
  if(ethereum){
  // debugger
  ethereum.on("accountsChanged", accounts => {
    if (accounts.length > 0) {
       dispatch(updateAccount(accounts[0]))
       showAvailableRewards()
     }
 });
}
}


useEffect(async() => {
 if(address) updateBalance()
 await checkAllowence(address)
 await getAmountOfTokens(address)
 await tokenOfOwnerByIndex(tokens, address)
}, [address])

useEffect(() => {
  getCurrentPrice()
  doDate()
  setInterval(doDate, 1000);
  initMetaMask()
  logXPContract()
  logStakeContract()

  accountsChanged()
}, [])

  return (
    <div className="app__wraper">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
