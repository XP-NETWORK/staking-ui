import Modal from 'react-modal';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "./Form.css"
import { setNotifyForm } from '../../redux/counterSlice';

export default function Form() {
    const dispatch = useDispatch()
    const notifyForm = useSelector(state => state.data.notifyForm)

    const handleClose = () => {
        dispatch(setNotifyForm(false))
    }
    
    const customStyles = {
        // content: {
        //   top: '45%',
        //   left: '50%',
        //   right: 'auto',
        //   bottom: 'auto',
        //   marginRight: '-50%',
        //   transform: 'translate(-50%, -50%)',
        //   outline: 'none'
        // },
        overlay: {
          background: "rgba(0, 0, 0, 0.5)"
        }
      };


    return (
        <Modal onRequestClose={handleClose} isOpen={notifyForm} className="notify-modal" style={customStyles}>
            <div onClick={handleClose} className='notify-modal-close'>&#x2715;</div>
            <div className='notify-form__title'>Stay tuned</div>
            <form>
                <input className="notify-input" type="text" name="name" placeholder='First Name*' />
                <input className="notify-input" type="text" name="name" placeholder='Last Name*' />
                <input className="notify-input" type="text" name="name" placeholder='Email*' />
                <input className="notify-input" type="text" name="name" placeholder='Telegram*' />
                <input className="notify-submit" type="submit" value="Submit" />
            </form>
        </Modal>
    )
}