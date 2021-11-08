import './App.css';
import './Normalize.css'
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router'
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import walletIcon from "./assets/walletIcon.png"
import { getActualTime, updateCurrentPrice, updateAccount, setIsOpen, changeStatus, setButtonPushed } from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { checkBalance, checkAllowence, logXPContract } from "../src/utils/xpnet"
import { getAmountOfTokens, tokenOfOwnerByIndex, logStakeContract } from "../src/utils/stake"
import moment from 'moment';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core'
import Modal from 'react-modal';


function App() {
const dispatch = useDispatch()
const tokens = useSelector(state => state.stakeData.tokensAmount)
const address = useSelector(state => state.data.account)
const modalIsOpen = useSelector(state => state.data.modalIsOpen)
const onDisconnect = useSelector(state => state.data.onDisconnect)
const location = useLocation()
let history = useHistory();
const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React()

// const [isOpen, setIsOpen] = useState(false)
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
  dispatch(setIsOpen(false))
}

const getCurrentPrice = async () => {
  const currentPrice = (await axios.get("https://api.xp.network/current-price")).data
  dispatch(updateCurrentPrice(currentPrice))
}

const updateBalance = async () => {
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

const switchChain = async() => {
  const chainParams = [{ 
    native: "BNB",
    chainId: 56,
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    decimals: 1e18,
    contract: "0x12889E870A48Be2A04564e74f66fC91D439Da03e",
    blockExplorerUrls: "https://bscscan.com/tx", }]

  debugger
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: chainParams,
    })
  } catch(err) {
    console.log(err)
      try {
          await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: { 
                native: "BNB",
                chainId: 56,
                rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
                decimals: 1e18,
                contract: "0x12889E870A48Be2A04564e74f66fC91D439Da03e",
                blockExplorerUrls: "https://bscscan.com/tx", },
            })
      } catch(err) {
          console.log(err)
      }

  }
}

const handleDisconnect = () => {
  dispatch(updateAccount(''))
  dispatch(setButtonPushed(false))
  dispatch(setIsOpen(false))
}


useEffect( () => {
  const getData = async () =>{
    if(address) {
      await updateBalance()
      await checkAllowence(address, library)
      await getAmountOfTokens(address, library)
    }
  }
  getData()
}, [address])


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
          <>
            <div className="modal-header">
              <div className="modal-title">Warning</div>
              <div onClick={() => closeModal()} className="modal-close">&#x2715;</div>
            </div>
            <div className="modal-body">
              <div className="modal-icon"><img src={walletIcon} alt="wallet-icon" /></div>
              <div className="modal-subtitle">You’re about to disconnect your wallet</div>
              <div className="modal-msg">To continue with the selected target chain, click on Cancel</div>
            </div>
            <div onClick={() => handleDisconnect()} className="modal-button">Disconnect Wallet</div>
            <div onClick={() => closeModal()} className="modal-button-close">Cancel</div>
          </>
          :
          <>
            <div className="modal-header">
              <div className="modal-title">Warning</div>
              <div onClick={() => closeModal()} className="modal-close">&#x2715;</div>
            </div>
            <div className="modal-body">
              <div className="modal-icon">ICON</div>
              <div className="modal-subtitle">Switch to BSC Mainnet</div>
              <div className="modal-msg">XP.network bridge requires you to connect to the BSC Mainnet</div>
            </div>
            <div onClick={() => switchChain()} className="modal-button">Switch to Mainnet</div>
          </>
        }
       
      </Modal>
      <Main />
    </div>
  );
}

export default App;
