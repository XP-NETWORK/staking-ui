import './App.css';
import './Normalize.css'
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router'
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import { initMetaMask } from "../src/utils/metamask"
import { toggleConnection, updateCurrentPrice, getActualTime, updateAccount } from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { checkBalance, checkAllowence, logXPContract, checkProvider } from "../src/utils/xpnet"
import { getAmountOfTokens, tokenOfOwnerByIndex, logStakeContract } from "../src/utils/stake"
import moment from 'moment';
import axios from 'axios';
import { connectMetaMask } from "./utils/metamask"
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";



function App() {

const dispatch = useDispatch()
let history = useHistory();
const { ethereum } = window
const tokens = useSelector(state => state.stakeData.tokensAmount)
const address = useSelector(state => state.data.account)
const location = useLocation();
const connectionToggler = useSelector(state => state.data.toggleConnection)

const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

const provider = new WalletConnectProvider({
  infuraId: "2a744e8fea924e1fbec4bc041e05dd00" 
});

const getCurrentPrice = async () => {
  const currentPrice = ( await axios.get("https://api.xp.network/current-price")).data
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
  provider.on("accountsChanged", accounts => {
    console.log("useEffect account changed",accounts);
  });
}, [address])




useEffect(() => {
  debugger
  getCurrentPrice()
  // initMetaMask()
  // /////////////////
  // logStakeContract()
  // logXPContract()
  // getWalletAccounts()
  
  if (connector.connected) {
    dispatch(toggleConnection("WalletConnect"))
  }
  else if(typeof ethereum !== 'undefined' && ethereum.isMetaMask){
    checkBalance()
    accountsChanged()
    initMetaMask()
    connectMetaMask()
    dispatch(toggleConnection("MetaMask"))
  }
  else{
    console.log("sdijfhgsdikjfhsidfhskjfhsdkjdgf");
  }
}, [])







useEffect(() => {
  debugger
  if (connectionToggler === 'MetaMask'){
   console.log('Go with MetaMask')
    getCurrentPrice()
    checkBalance()
    accountsChanged()
    logStakeContract()
    logXPContract()
  }
  else if(connectionToggler === "WalletConnect"){
   console.log("Go with WalletConnect");
  }else{
    console.log("sdijfhgsdikjfhsidfhskjfhsdkjdgf");
  }
 
}, [connectionToggler])










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
