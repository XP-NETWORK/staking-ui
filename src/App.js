import './App.css';
import './Normalize.css'
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router'
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import walletIcon from "./assets/walletIcon.png"
import { getActualTime, updateCurrentPrice, updateAccount, setIsOpen, setChainModalIsOpen } from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { checkBalance, checkAllowence, logXPContract } from "../src/utils/xpnet"
import { getAmountOfTokens, tokenOfOwnerByIndex, logStakeContract } from "../src/utils/stake"
import moment from 'moment';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core'
import Modal from 'react-modal';
import Disconnect from "../src/Components/Modals/Disconnect.jsx"
import ChangeNetwork from './Components/Modals/ChangeNetwork';

function App() {
const dispatch = useDispatch()
const tokens = useSelector(state => state.stakeData.tokensAmount)
const address = useSelector(state => state.data.account)
const modalIsOpen = useSelector(state => state.data.modalIsOpen)
const chainModalISOpen = useSelector(state => state. data.chainIdModalIsOpen)
const onDisconnect = useSelector(state => state.data.onDisconnect)
const location = useLocation()
let history = useHistory();
const {library, chainId } = useWeb3React()
console.log("chainId", typeof chainId, chainId)
const [wrongNetwork, setWrongNetwork] = useState(true)
const connectPushed = useSelector(state => state.data.connectPushed)
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none'
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)"
  }
};

const closeModal = () => {
  if(modalIsOpen)dispatch(setIsOpen(false))
  if(chainModalISOpen)dispatch(setChainModalIsOpen(false))
}

const getCurrentPrice = async () => {
  const currentPrice = (await axios.get("https://api.xp.network/current-price")).data
  dispatch(updateCurrentPrice(currentPrice))
}

 async function updateBalance(){
  await checkBalance(address, library)
}

const doDate = () => {
    let str = moment().format('YYYY-MM-DD hh:mm')
    dispatch(getActualTime(str))
}

const accountsChanged = () => {
  const getTokens = async (add) => {
    try {
      await getAmountOfTokens(add, library)
    } catch (error) {
      console.log(error);
    }
  }

  const { ethereum } = window
  if(ethereum){
  ethereum.on("accountsChanged", async accounts =>  {
    console.log("acount changed");
      if (accounts.length > 0) {
        dispatch(updateAccount(accounts[0]))
        await getTokens(accounts[0], library)
      }
    });
  }
}

const chainModalHandler = () => {
  if(chainModalISOpen && connectPushed) return true
  else if(chainModalISOpen && location.pathname === "/gallery") return true
  else return false
}

useEffect( () => {
  async function getData(){
    if(address) {
      await updateBalance()
      await checkAllowence(address, library)
      await getAmountOfTokens(address, library)
    }
  }
  getData()
}, [address])

useEffect(() => {
  if(chainId !== 56){
    dispatch(setChainModalIsOpen(true))
    setWrongNetwork(true)}
  else{
    dispatch(setChainModalIsOpen(false))
    setWrongNetwork(false)
  }
}, [connectPushed, chainId])

useEffect(() => {
  if(location.pathname === "/claim"){
    if(parseInt(tokens) > 0){
      tokenOfOwnerByIndex(tokens, address, library)
    }
    else{
      history.push('/stake')
    }
  }
}, [tokens])


useEffect(() => {
  getCurrentPrice()
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
      <Modal 
      className="Modal"
      isOpen={modalIsOpen} 
      style={customStyles} 
      onRequestClose={closeModal}
      contentLabel="Example Modal">
        {
          onDisconnect ? 
          <Disconnect />
          :
          null
        }
      </Modal>
      <Modal 
      className="Modal"
      isOpen={ chainModalHandler() } 
      style={ customStyles } 
      onRequestClose={closeModal}
      contentLabel="Example Modal">
        {
          wrongNetwork ? 
          <ChangeNetwork />
          :
          null
        }
      </Modal>
      <Main />
    </div>
  );
}

export default App;
