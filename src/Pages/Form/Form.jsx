import Modal from 'react-modal';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "./Form.css"
import { setNotifyForm } from '../../redux/counterSlice';
import axios from 'axios';

export default function Form() {
    const dispatch = useDispatch()
    const notifyForm = useSelector(state => state.data.notifyForm)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [mail, setMail] = useState()
    const [errMail, setErrMail] = useState(false)
    const [telegram, setTelegram] = useState()
    const hidden = {visibility: "hidden"}
    // const pattern = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    const handleClose = () => {
        dispatch(setNotifyForm(false))
    }
    
    const customStyles = {
        overlay: {
          background: "rgba(0, 0, 0, 0.5)"
        }
    };



    const onSubmitHandler = e => {
        debugger
        const pattern = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
        e.preventDefault()
        let msg
        if(pattern.test(mail.toLowerCase())){
            msg = {
                firstName,
                lastName,
                mail,
                telegram
            }
            axios
            .post("#", JSON.stringify(msg))
            .then(response => console.log(response))
            .catch(error => console.error(error))
            setErrMail(false)
        }
        else{
            setErrMail(true)
            setMail('')
        }
    }

    return (
        <Modal onRequestClose={handleClose} isOpen={notifyForm} className="notify-modal" style={customStyles}>
            <div onClick={handleClose} className='notify-modal-close'>&#x2715;</div>
            <div className='notify-form__title'>Stay tuned</div>
            <form onSubmit={e => onSubmitHandler(e)}>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} className="notify-input" type="text" name="name" placeholder='First Name*' />
                <input value={lastName} onChange={e => setLastName(e.target.value)} className="notify-input" type="text" name="name" placeholder='Last Name*' />
                <div className={`notify-input`}>
                    <input style={{border: "none"}} value={mail} onChange={e => setMail(e.target.value)}type="mail" name="name" placeholder='Email*' />
                    <span style={!errMail ? hidden : {}} className='mail--invalid'>Invalid mail input</span>
                </div>
                <input value={telegram} onChange={e => setTelegram(e.target.value)} className="notify-input" type="text" name="name" placeholder='Telegram*' />
                <input className="notify-submit" type="submit" value="Submit" />
            </form>
        </Modal>
    )
}