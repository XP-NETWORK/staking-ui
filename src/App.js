import './App.css';
import './Normalize.css'
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import { initMetaMask } from "../src/utils/metamask"
import { getActualTime, updateCurrentPrice} from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { logXPContract, checkBalance, checkAllowence } from "../src/utils/xpnet"
import { logStakeContract } from "../src/utils/stake"
import moment from 'moment';
import axios from 'axios';




function App() {

const dispatch = useDispatch()
const address = useSelector(state => state.data.account)

const getCurrentPrice = async () => {
  const currentPrice = (await axios.get("https://api.xp.network/current-price")).data
  console.log("price", currentPrice)
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

useEffect(() => {
 if(address) updateBalance()
 checkAllowence(address)
}, [address])

useEffect(() => {
  getCurrentPrice()
  setInterval(getCurrentPrice, 200000)
}, [])

useEffect(() => {
  doDate()
  setInterval(doDate, 1000);
  initMetaMask()
  // logXPContract()
  logStakeContract()
}, [])

  return (
    <div className="app__wraper">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
