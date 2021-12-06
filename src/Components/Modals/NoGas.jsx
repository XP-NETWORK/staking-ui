import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotEnoughGas } from '../../redux/counterSlice'

export default function NoGas() {
    const dispatch = useDispatch()

    function handleClose() {
        dispatch(setNotEnoughGas(false))
    }

    return (
        <div className="no-gas__modal">
            <div className="modal-header">
              <div className="modal-title">Warning</div>
              <div onClick={() => handleClose()} className="modal-close">&#x2715;</div>
            </div>
            <div className="modal-body">
              <div className="modal-icon">Insufficient BNB for approval.</div>
            </div>
        </div>
    )
}
