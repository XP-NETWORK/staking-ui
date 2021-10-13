import React, { useEffect } from 'react'
import "./NavButton.css"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function NavButton({ location, type, balance }) {
    const tokens = parseInt(useSelector(state => state.stakeData.tokensAmount))

    useEffect(() => {
    }, [balance])

    if(type === 'stake-btn') return (
        <div className={location.pathname === '/stake' || location.pathname === '/' ? `Stake nav__button--active`: `Stake nav__button`}>
            <Link to='/stake'>Stake XPNET</Link>
        </div>
    )
    else if(type === 'claim-btn') {
        if( tokens ){
            return (
                <div className={location.pathname === '/claim' ?`nav__button--active`:`nav__button`}>
                    <Link to='/claim'>Claim XPNET</Link>
                </div>)
        }
        else {
            return ( 
                <div className="nav__button--disabled">
                    Claim XPNET
                </div> )
        }
    }
}
