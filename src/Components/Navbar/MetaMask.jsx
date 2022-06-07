import React, {useEffect} from 'react'
import {createIcon} from '@download/blockies'
import {useSelector, useDispatch} from 'react-redux'
import './MetaMask.css'
import {useWeb3React} from '@web3-react/core'

import {setIsOpen, setonDisconnect} from '../../redux/counterSlice'

export default function MetaMask() {
    const intViewportWidth = window.innerWidth
    const dispatch = useDispatch()
    const {deactivate} = useWeb3React()
    const account = useSelector((state) => state.data.account)
    const onDisconnect = async () => {
        dispatch(setonDisconnect(true))
        dispatch(setIsOpen(true))
    }

    useEffect(() => {
        const list = document.querySelectorAll('.account__icon')
        if (list) {
            list.forEach((item, index) => {
                const Icon = createIcon({
                    // All options are optional
                    seed: account, // seed used to generate icon data, default: random
                    color: '#dfe', // to manually specify the icon color, default: random
                    bgcolor: '#aaa', // choose a different background color, default: white
                    size: 15, // width/height of the icon in blocks, default: 10
                    scale: 3 // width/height of each block in pixels, default: 5
                })
                item.innerHTML = ''
                item.appendChild(Icon)
            })
        }
    }, [])

    return (
        <div onClick={() => onDisconnect()} className="metamask">
            <div className="account">
                {intViewportWidth <= 600
                    ? account.slice(0, 2) + '...' + account.slice(40, 46)
                    : account.slice(0, 6) + '...' + account.slice(39, 46)}
            </div>
            <div className="account__icon"></div>
        </div>
    )
}
