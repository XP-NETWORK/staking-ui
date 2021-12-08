import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createIcon } from '@download/blockies';
import { setIsOpen, setonDisconnect } from '../../redux/counterSlice'
import "./AccountBox.css"

export default function AccountBox() {
    
    const dispatch = useDispatch()
    // const account = useSelector(state => state.data.account)
    const onDisconnect = async() => {
        dispatch(setonDisconnect(true))
        dispatch(setIsOpen(true))
    }
    const account = "0xb6C8748115d23Eb1c6d59Cb83eAe051b56ef75c7"
    
    function ls() {
        let ls
        const width = window.innerWidth
        if (width < 321) {
            ls = 3
        }
        else if(width < 425){
            ls = 1
        }
        else{
            ls = 6
        }
        return ls
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
    <div className="account__box">
        <div className="account__address">{account.slice(0,ls()) + '...' + account.slice(39,46)}</div>
        <div className="account__icon">0</div>
    </div>
    )
}
