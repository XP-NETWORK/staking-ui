import './App.css';
import './Normalize.css'
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router'
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import { initMetaMask } from "../src/utils/metamask"
// import { getWalletAccounts } from "./utils/walletConnect"
import { getActualTime, updateCurrentPrice, updateAccount } from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { checkBalance, checkAllowence, logXPContract } from "../src/utils/xpnet"
import { getAmountOfTokens, tokenOfOwnerByIndex, logStakeContract } from "../src/utils/stake"
import moment from 'moment';
import axios from 'axios';





function App() {
const dispatch = useDispatch()
const tokens = useSelector(state => state.stakeData.tokensAmount)
const address = useSelector(state => state.data.account)
const location = useLocation();
let history = useHistory();

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
  const getTokens = async (add) => {
    try {
      await getAmountOfTokens(add)
    } catch (error) {
      console.log(error);
    }
  }

  const { ethereum } = window
  if(ethereum){
  ethereum.on("accountsChanged", async accounts =>  {
    // alert(accounts)
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
      await updateBalance()
      await checkAllowence(address)
      await getAmountOfTokens(address)
    }
  }
  getData()
}, [address])


useEffect(() => {
  if(location.pathname !== "/search"){
    if(parseInt(tokens) > 0){
    tokenOfOwnerByIndex(tokens, address)
  }
  else{
    history.push('/stake')
  }
  }
  
}, [tokens])


useEffect(() => {
  getCurrentPrice()
  initMetaMask()
  accountsChanged()
  logStakeContract()
  logXPContract()
  // getWalletAccounts()
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
