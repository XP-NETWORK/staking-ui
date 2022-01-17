import Modal from 'react-modal';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import hand from "../../assets/hand.svg"
import "./Form.css"
import { setNotifyForm } from '../../redux/counterSlice';
import axios from 'axios';

export default function Form() {
    const dispatch = useDispatch()
    const notifyForm = useSelector(state => state.data.notifyForm)
    const [firstName, setFirstName] = useState('')
    const [validFirst, setValidFirst] = useState()
    const [lastName, setLastName] = useState('')
    const [validLast, setValidLast] = useState()
    const [mail, setMail] = useState('')
    const [validMail, setValidMail] = useState()
    const [telegram, setTelegram] = useState('')
    const [validTelegram, setValidTelegram] = useState()
    const hidden = {visibility: "hidden"}
    const [msgSent, setMsgSent] = useState(false)
    const handleClose = () => {
        dispatch(setNotifyForm(false))
    }
    
    const customStyles = {
        overlay: {
          background: "rgba(0, 0, 0, 0.5)"
        }
    };



    const onSubmitHandler = async(e) => {
        debugger
        e.preventDefault()
        const pattern = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
        firstName?.length > 1 ? setValidFirst(true) : setValidFirst('invalid')
        lastName?.length > 1 ? setValidLast(true) : setValidLast('invalid')
        telegram?.length > 1 ? setValidTelegram(true) : setValidTelegram('invalid')
        if(mail?.length > 1 && pattern.test(mail?.toLowerCase())){
            setValidMail(true)
        } 
        else{
            setValidMail('invalid')
        }
        let msg
        if(validMail && validFirst && validLast && validTelegram && validMail){
            msg = {
                firstName,
                lastName,
                mail,
                telegram
            }
            try {
                const response = await axios.post("https://xpnetworkapi.herokuapp.com/stake-notify", JSON.stringify(msg))
                setMsgSent(true)
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <Modal onRequestClose={handleClose} isOpen={notifyForm} className="notify-modal" style={customStyles}>
            <div onClick={handleClose} className='notify-modal-close'>&#x2715;</div>
            { msgSent ? 
                <>
                    <div className="sent-msg__container">
                        <div className="sent-msg__icon"><img src={hand} alt="" /></div>
                        <div className="sent-msg__title">Thank you for <br/> signing up! </div>
                        <div className="sent-msg__text">Please check your inbox to <br/> confirm your subscription.</div>
                        <div onClick={handleClose} className='sent-msg__button'>OK</div>
                    </div>
                </> 
                : 
                <>
                    <div className='notify-form__title'>Stay tuned</div>
                    <form onSubmit={e => onSubmitHandler(e)}>
                        <div className="notify-input">
                            <input value={firstName} onChange={e => setFirstName(e.target.value)}  type="text" name="name" placeholder='First Name*' />
                            <span style={validFirst === 'invalid' ? {} : hidden} className='invalid'>Invalid FirstName input</span>
                        </div>
                        <div className="notify-input">
                            <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" name="name" placeholder='Last Name*' />
                            <span style={validLast === 'invalid'? {} : hidden} className='invalid'>Invalid LastName input</span>
                        </div>
                        <div className="notify-input">
                            <input style={{border: "none"}} value={mail} onChange={e => setMail(e.target.value)}type="mail" name="name" placeholder='Email*' />
                            <span style={validMail === 'invalid' ? {} : hidden} className='invalid'>Invalid mail input</span>
                        </div>
                        <div className="notify-input">
                            <input value={telegram} onChange={e => setTelegram(e.target.value)} type="text" name="name" placeholder='Telegram*' />
                            <span style={validTelegram === 'invalid' ? {} : hidden} className='invalid'>Invalid Telegram input</span>
                        </div>
                        <input className="notify-submit" type="submit" value="Submit" />
                    </form>
                </> 
            }
        </Modal>
    )
}