import React, { useEffect } from 'react'
import { createIcon } from '@download/blockies';
import { useSelector, useDispatch} from 'react-redux'
import './MetaMask.css'
import { useWeb3React } from '@web3-react/core'
import { setButtonPushed, updateAccount, setIsOpen, setonDisconnect } from "../../redux/counterSlice"


export default function MetaMask() {
    const dispatch = useDispatch()
    const {
        deactivate,
        connector
    } = useWeb3React();

    console.log("log", deactivate);

    const account = useSelector(state => state.data.account)

    const onDisconnect = async() => {
        dispatch(setonDisconnect(true))
        dispatch(setIsOpen(true))
    }

    useEffect(() => {
        const list = document.querySelectorAll('.account__icon')
        if(list){
            list.forEach((item, index) => {
                let Icon = createIcon({ // All options are optional
                    seed: account, // seed used to generate icon data, default: random
                    color: '#dfe', // to manually specify the icon color, default: random
                    bgcolor: '#aaa', // choose a different background color, default: white
                    size: 15, // width/height of the icon in blocks, default: 10
                    scale: 3 // width/height of each block in pixels, default: 5
                });
                item.innerHTML = ''
                item.appendChild(Icon)
            })
        }
    }, [])


    return (
        <div onClick={() => onDisconnect()} className="metamask">
            <div className="account">
                {account.slice(0,10) + '...' + account.slice(38,46)}
            </div>
            <div className="account__icon"></div>
        </div>
    )
}
