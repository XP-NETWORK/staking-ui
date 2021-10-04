import './App.css';
import './Normalize.css'
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import { initMetaMask } from "../src/utils/metamask"
import { getActualTime } from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { logXPContract, checkBalance, checkAllowence } from "../src/utils/xpnet"
import { logStakeContract } from "../src/utils/stake"
import moment from 'moment';




function App() {

const dispatch = useDispatch()
const address = useSelector(state => state.data.account)
// console.log(address)

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
