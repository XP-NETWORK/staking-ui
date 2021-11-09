import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from 'web3modal'
import "./Disconnect.css"
import { updateAccount, setIsOpen, setButtonPushed  } from "../../redux/counterSlice"
import walletIcon from "../../assets/walletIcon.png"

export default function Disconnect() {
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(setIsOpen(false))
      }

      const handleDisconnect = () => {
        dispatch(updateAccount(''))
        dispatch(setButtonPushed(false))
        dispatch(setIsOpen(false))
      }

    return (
        <div>
            <div className="modal-header">
              <div className="modal-title">Warning</div>
              <div onClick={() => closeModal()} className="modal-close">&#x2715;</div>
            </div>
            <div className="modal-body">
              <div className="modal-icon"><img src={walletIcon} alt="wallet-icon" /></div>
              <div className="modal-subtitle">You’re about to disconnect your wallet</div>
              <div className="modal-msg">To continue with the selected target chain, click on Cancel</div>
            </div>
            <div className="modal__buttons">
              <div onClick={() => handleDisconnect()} className="modal-button">Disconnect Wallet</div>
              <div onClick={() => closeModal()} className="modal-button-close">Cancel</div>
            </div>
        </div>
    )
}
