import './App.css';
import './Normalize.css'
import { useEffect } from 'react';
import { useHistory } from 'react-router'
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import { initMetaMask } from "../src/utils/metamask"
// import { getAccounts } from "./utils/walletConnect"
import { getActualTime, updateCurrentPrice, updateAccount } from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { checkBalance, checkAllowence, logXPContract } from "../src/utils/xpnet"
import { getAmountOfTokens, tokenOfOwnerByIndex, logStakeContract } from "../src/utils/stake"
import moment from 'moment';
import axios from 'axios';




function App() {
const dispatch = useDispatch()
// const tokensFlag = useSelector(state => state.stakeData.tokensAmountFlag)
////////////////////////////////////////////////////////////////////////
const tokens = useSelector(state => state.stakeData.tokensAmount)
// console.log("stakeData.tokensAmount: ", tokens);

const address = useSelector(state => state.data.account)
//////////////////////////////////////
// const amountOfTokens = useSelector(state => state.data.tokenIDs)
// console.log("data.tokenIDs: ", amountOfTokens);

let history = useHistory();

const getCurrentPrice = async () => {
  const currentPrice = (await axios.get("https://api.xp.network/current-price")).data
  dispatch(updateCurrentPrice(currentPrice))
}

const updateBalance = async () => {
  // console.log("updateBalance");
  await checkBalance(address)
}

const doDate = () => {
    let str = moment().format('YYYY-MM-DD hh:mm')
    dispatch(getActualTime(str))
}

const accountsChanged = () => {

  const getTokens = async (add) => {
    try {
      // debugger
      console.log("App get amount of tokens");
      await getAmountOfTokens(add)
    } catch (error) {
      console.log(error);
    }
  }

  const { ethereum } = window
  if(ethereum){
  ethereum.on("accountsChanged", async accounts =>  {
    // debugger
      if (accounts.length > 0) {
        dispatch(updateAccount(accounts[0]))
        await getTokens(accounts[0])
      }
    });
  }
}


useEffect( () => {
  const getData = async () =>{
    if(address) {
      // debugger
      await updateBalance()
      await checkAllowence(address)
      // console.log("app useeffect get amount of tokens");
      await getAmountOfTokens(address)
      // await tokenOfOwnerByIndex(tokens, address)
      // console.log("address chenged: ", address);
    }
  }
  getData()
}, [address])


useEffect(() => {
  // debugger
  if(parseInt(tokens) > 0){
    tokenOfOwnerByIndex(tokens, address)
  }
  else{
    history.push('/stake')
  }
}, [tokens])


useEffect(() => {
  getCurrentPrice()
  initMetaMask()
  accountsChanged()
  logStakeContract()
  logXPContract()
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
