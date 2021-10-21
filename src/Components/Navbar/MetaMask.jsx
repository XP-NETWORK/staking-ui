import React, { useEffect } from 'react'
import { createIcon } from '@download/blockies';
import { useSelector } from 'react-redux'
import './MetaMask.css'

export default function MetaMask() {

    
    const account = useSelector(state => state.data.account)

    useEffect(() => {

        const list = document.querySelectorAll('.account__icon')
        // console.log(list)
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
                // console.log(item, index)
            })
        }
    }, [])


    return (
        <div className="metamask">
            <div className="account">
                {account.slice(0,3) + '...' + account.slice(38,46)}
            </div>
           <div className="account__icon"></div>
        </div>
    )
}
