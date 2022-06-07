import React from 'react'
import {useCallback} from 'react'
import {useDispatch} from 'react-redux'

import {setAgreementMod} from '../../../redux/counterSlice'

import './Agreement.css'
import PDF from '../../../assets/Terms.pdf'

import Radio from './Radio'

export default function Agreement() {
    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => {
        dispatch(setAgreementMod(true))
    })

    return (
        <div className="agreement">
            <Radio />
            <div className="agreement__text">
                I have read and I agree to{' '}
                <span>
                    <a href={PDF} target="_blank" rel="noreferrer">
                        XPNET Staking Service Agreement
                    </a>
                </span>
            </div>
        </div>
    )
}
