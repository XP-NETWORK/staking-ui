import React, { useEffect } from 'react'
import "./NavButton.css"
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function NavButton({ location, type, balance }) {
    const tokens = parseInt(useSelector(state => state.stakeData.tokensAmount))
    const intViewportWidth = window.innerWidth;
    const history = useHistory()
    useEffect(() => {
    }, [balance])

    if(type === 'stake-btn') return (
        <div onClick={() => location.pathname === '/stake' ? '' : history.push('/stake')} className={location.pathname === '/stake' || location.pathname === '/' ? `Stake nav__button--active`: `Stake nav__button`}>
            <Link style={{pointerEvents: 'none'}} to='/stake'><span>Stake XPNET</span></Link>
        </div>
    )
    else if(type === 'claim-btn') {
        if( tokens ){
            return (
                <div onClick={() => location.pathname === '/claim' ? '' : history.push('/claim')} className={location.pathname === '/claim' ?`nav__button--active`:`nav__button`}>
                    <Link style={{pointerEvents: 'none'}} to='/claim'>Claim XPNET</Link>
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
