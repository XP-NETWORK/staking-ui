import {useSelector, useDispatch} from 'react-redux'
import React, {useState} from 'react'
import Modal from 'react-modal'
import axios from 'axios'

import hand from '../../assets/hand.svg'
import {setNotifyForm} from '../../redux/counterSlice'
import './Form.css'

export default function Form() {
    const dispatch = useDispatch()
    const [sending, setSending] = useState(false)
    const notifyForm = useSelector((state) => state.data.notifyForm)
    const [firstName, setFirstName] = useState('')
    const [validFirst, setValidFirst] = useState()
    const [lastName, setLastName] = useState('')
    const [validLast, setValidLast] = useState()
    const [email, setMail] = useState('')
    const [validMail, setValidMail] = useState()
    const [telegram, setTelegram] = useState('')
    const [validTelegram, setValidTelegram] = useState()
    const hidden = {visibility: 'hidden'}
    const [msgSent, setMsgSent] = useState(false)
    const handleClose = () => {
        dispatch(setNotifyForm(false))
    }

    const customStyles = {
        overlay: {
            background: 'rgba(0, 0, 0, 0.5)'
        }
    }

    const handleFirstName = (first) => {
        setFirstName(first)
        if (first.length < 1) {
            setValidFirst('invalid')
        } else {
            setValidFirst(true)
        }
    }

    const handleLastName = (last) => {
        setLastName(last)
        if (last.length < 1) {
            setValidLast('invalid')
        } else {
            setValidLast(true)
        }
    }

    const handleTelegram = (telegram) => {
        setTelegram(telegram)
        if (telegram.length < 1) {
            setValidTelegram('invalid')
        } else {
            setValidTelegram(true)
        }
    }

    const handleMail = (mail) => {
        const pattern = new RegExp(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )
        setMail(mail)
        if (mail.length < 1 && pattern.test(mail)) {
            setValidMail('invalid')
        } else {
            setValidMail(true)
        }
    }

    //
    const onSubmitHandler = async (e) => {
        // debugger
        setSending(true)
        e.preventDefault()
        let validmail = true
        const pattern = new RegExp(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )
        firstName?.length > 0 ? setValidFirst(true) : setValidFirst('invalid')
        lastName?.length > 0 ? setValidLast(true) : setValidLast('invalid')
        telegram?.length > 0 ? setValidTelegram(true) : setValidTelegram('invalid')
        if (email?.length > 0 && pattern.test(email?.toLowerCase())) {
            setValidMail(true)
        } else {
            setValidMail('invalid')
            validmail = false
        }
        let msg
        if (validmail && validFirst && validLast && validTelegram && validMail) {
            msg = {
                email,
                telegram,
                firstName,
                lastName
            }
            try {
                const response = await axios.post(
                    'https://xpnetworkapi.herokuapp.com/stake-notify',
                    msg
                )
                setMsgSent(true)
            } catch (error) {
                console.error(error)
                setSending(false)
            }
        } else setSending(false)
    }

    return (
        <Modal
            onRequestClose={handleClose}
            isOpen={notifyForm}
            className="notify-modal"
            style={customStyles}>
            <div onClick={handleClose} className="notify-modal-close">
                &#x2715;
            </div>
            {msgSent ? (
                <>
                    <div className="sent-msg__container">
                        <div className="sent-msg__icon">
                            <img src={hand} alt="" />
                        </div>
                        <div className="sent-msg__title">
                            Thank you for <br /> signing up!{' '}
                        </div>
                        <div className="sent-msg__text">
                            Please check your inbox to <br /> confirm your subscription.
                        </div>
                        <div onClick={handleClose} className="sent-msg__button">
                            OK
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="notify-form__title">Stay tuned</div>
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className="notify-input">
                            <input
                                value={firstName}
                                onChange={(e) => handleFirstName(e.target.value)}
                                type="text"
                                name="name"
                                placeholder="First Name*"
                            />
                            <span
                                style={validFirst === 'invalid' ? {} : hidden}
                                className="invalid">
                                Invalid first name input
                            </span>
                        </div>
                        <div className="notify-input">
                            <input
                                value={lastName}
                                onChange={(e) => handleLastName(e.target.value)}
                                type="text"
                                name="name"
                                placeholder="Last Name*"
                            />
                            <span style={validLast === 'invalid' ? {} : hidden} className="invalid">
                                Invalid last name input
                            </span>
                        </div>
                        <div className="notify-input">
                            <input
                                style={{border: 'none'}}
                                value={email}
                                onChange={(e) => handleMail(e.target.value)}
                                type="mail"
                                name="name"
                                placeholder="Email*"
                            />
                            <span style={validMail === 'invalid' ? {} : hidden} className="invalid">
                                Invalid email input
                            </span>
                        </div>
                        <div className="notify-input">
                            <input
                                value={telegram}
                                onChange={(e) => handleTelegram(e.target.value)}
                                type="text"
                                name="name"
                                placeholder="Telegram*"
                            />
                            <span
                                style={validTelegram === 'invalid' ? {} : hidden}
                                className="invalid">
                                Invalid telegram input
                            </span>
                        </div>
                        <input
                            className={sending ? 'notify-submit--unclickable' : 'notify-submit'}
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </>
            )}
        </Modal>
    )
}
