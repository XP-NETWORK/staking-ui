import React, { useEffect } from 'react'
import { createIcon } from '@download/blockies';
import { useSelector } from 'react-redux'
import './MetaMask.css'

export default function MetaMask() {

    
    const account = useSelector(state => state.data.account)

    useEffect(() => {
        let Icon = createIcon({ // All options are optional
            seed: account, // seed used to generate icon data, default: random
            color: '#dfe', // to manually specify the icon color, default: random
            bgcolor: '#aaa', // choose a different background color, default: white
            size: 15, // width/height of the icon in blocks, default: 10
            scale: 3 // width/height of each block in pixels, default: 5
        });
        const l = document.getElementById('ls')
        
        if(l){
            l.innerHTML = ''
            l.appendChild(Icon)
        }
        }, [])


    return (
        <div className="metamask">
            <div className="account">
                {account.slice(0,6) + '...' + account.slice(38,46)}
            </div>
           <div id="ls" className="account__icon"></div>
        </div>
    )
}
