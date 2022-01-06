import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from 'web3modal'
import "./Disconnect.css"
import { updateAccount, setIsOpen, setButtonPushed, setChainModalIsOpen  } from "../../redux/counterSlice"
import walletIcon from "../../assets/walletIcon.png"
import { useSelector } from 'react-redux'

export default function ChangeNetwork() {

    const modalIsOpen = useSelector(state => state.data.modalIsOpen)
    const chainModalISOpen = useSelector(state => state. data.chainIdModalIsOpen)
    const dispatch = useDispatch()
    const closeModal = () => {
      if(modalIsOpen)dispatch(setIsOpen(false))
      if(chainModalISOpen)dispatch(setChainModalIsOpen(false))
    }

    const switchChain = async() => {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{ chainId: '0xf00', rpcUrl: 'https://bsc-dataseed.binance.org/'}],
              });
            } 
            catch (addError) {
              alert(addError)
            }
          }
        }
    }

    return (
        <div className="no-gas__modal">
            <div className="modal-header">
              <div className="modal-title">Warning</div>
              <div onClick={() => closeModal()} className="modal-close">&#x2715;</div>
            </div>
            <div className="modal-body">
              <div className="modal-icon"><img src={walletIcon} alt="wallet-icon" /></div>
              <div className="modal-subtitle">Switch to BSC Mainnet</div>
              <div className="modal-msg">XP.network bridge requires you to connect to the BSC Mainnet</div>
            </div>
            <div className="modal__buttons">
              <div onClick={switchChain} className="modal-button">Switch to Mainnet</div>
            </div>
        </div>
    )
}
