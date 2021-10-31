import './App.css';
import './Normalize.css'
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router'
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"

import { toggleConnection, updateCurrentPrice, getActualTime, updateAccount } from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { checkBalance, checkAllowence, logXPContract, schooseProvider } from "../src/utils/xpnet"
import { getAmountOfTokens, tokenOfOwnerByIndex } from "../src/utils/stake"
import moment from 'moment';
import axios from 'axios';

import WalletConnectProvider from "@walletconnect/web3-provider";
import { useMoralis } from "react-moralis";



function App() {
  // const connection = useSelector(state => state.data.toggleConnection)
  // const { web3, Moralis, user } = useMoralis();
  const dispatch = useDispatch()
  let history = useHistory();
  // const { ethereum } = window
  const tokens = useSelector(state => state.stakeData.tokensAmount)
  const address = useSelector(state => state.data.account)
  const location = useLocation();
  const connectionToggler = useSelector(state => state.data.toggleConnection)
  console.log("connectionToggler: ", connectionToggler);
  const { Moralis } = useMoralis();



  const provider = new WalletConnectProvider({
    infuraId: "2a744e8fea924e1fbec4bc041e05dd00" 
  });

  const getCurrentPrice = async () => {
    const currentPrice = ( await axios.get("https://api.xp.network/current-price")).data
    dispatch(updateCurrentPrice(currentPrice))
  }

  // const updateBalance = async () => {
  //   await checkBalance(address)
  // }

  const doDate = () => {
      let str = moment().format('YYYY-MM-DD hh:mm')
      dispatch(getActualTime(str))
  }

  // 
  const accountsChanged = () => {
    const getTokens = async (add) => {
      try {
        await getAmountOfTokens(add, Moralis, connectionToggler)
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
        await getTokens(accounts[0],Moralis, connectionToggler)
      }
    });
  }
 }

  useEffect( () => {
    const getData = async () =>{
      if(address) {
        await checkBalance(address, Moralis, connectionToggler)
        await checkAllowence(address, Moralis, connectionToggler)
        await getAmountOfTokens(address, Moralis, connectionToggler)
      }
    }
    getData()
    provider.on("accountsChanged", accounts => {
      console.log("useEffect account changed",accounts);
    });
  }, [address])



  useEffect(() => {
    if(location.pathname !== "/search" && location.pathname !== "/gallery"){
      if(parseInt(tokens) > 0){
      tokenOfOwnerByIndex(tokens, address, Moralis, connectionToggler)
    }
    else{
      history.push('/stake')
    }
    }

  }, [tokens])





  useEffect(() => {
    getCurrentPrice()
  }, [])







  useEffect(() => {

    if (connectionToggler === 'MetaMask'){

      checkBalance(address, Moralis, connectionToggler)
      accountsChanged()
      // logStakeContract()
      // logXPContract()
      // schooseProvider("MetaMask")
    }
    else if(connectionToggler === "WalletConnect"){
    //  console.log("Go with WalletConnect");
     getCurrentPrice()
    //  schooseProvider("WalletConnect")
    //  logStakeContract()
    //  logXPContract()
    }else{

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
