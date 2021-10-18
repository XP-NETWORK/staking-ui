import './App.css';
import './Normalize.css'
import { useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import { initMetaMask } from "../src/utils/metamask"
import { getAccounts } from "./utils/walletConnect"
import { getActualTime, updateCurrentPrice, updateAccount } from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { checkBalance, checkAllowence } from "../src/utils/xpnet"
import { getAmountOfTokens, tokenOfOwnerByIndex, logStakeContract } from "../src/utils/stake"
import moment from 'moment';
import axios from 'axios';




function App() {
const dispatch = useDispatch()
const tokensFlag = useSelector(state => state.stakeData.tokensAmountFlag)
const tokens = useSelector(state => state.stakeData.tokensAmount)
const address = useSelector(state => state.data.account)
const amountOfTokens = useSelector(state => state.data.tokenIDs)

const getCurrentPrice = async () => {
  const currentPrice = (await axios.get("https://api.xp.network/current-price")).data
  dispatch(updateCurrentPrice(currentPrice))
}

const updateBalance = async () => {
  await checkBalance(address)
}

const doDate = () => {
    let str = moment().format('YYYY-MM-DD hh:mm')
    dispatch(getActualTime(str))
}

const accountsChanged = () => {
  const { ethereum } = window
  if(ethereum){
  ethereum.on("accountsChanged", accounts => {
      if (accounts.length > 0) {
        dispatch(updateAccount(accounts[0]))
      }
    });
  }
}


useEffect( () => {
  const getData = async () =>{
    if(address) {
      await updateBalance()
      await checkAllowence(address)
      await getAmountOfTokens(address)
      await tokenOfOwnerByIndex(tokensFlag, tokens, address)
    }
  }
  getData()
}, [address, amountOfTokens])


useEffect(() => {
  if(tokens){
    tokenOfOwnerByIndex(tokensFlag, tokens, address)
  }
}, [tokens])


useEffect(() => {
  getCurrentPrice()
  initMetaMask()
  accountsChanged()

  const getData = async () => {
    debugger
    try {
      await getAccounts()
    } catch (error) {
      console.log(error);
    }
  }

}, [])

useEffect(() => {
  doDate()
  setInterval(doDate, 1000);
}, [])

  return (
    <div className="app__wraper">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
