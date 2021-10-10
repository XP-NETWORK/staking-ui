import React from 'react'
import { Link } from "react-router-dom";

export default function NavButton({ location, type, balance }) {
    if(type === 'stake-btn') return (
        <div className={location.pathname === '/stake' || location.pathname === '/' ? `Stake nav__button--active`: `Stake nav__button`}><Link to='/stake'>Stake XPNET</Link></div>
    )
    else if(type === 'claim-btn') return <div style={{visibility:`${balance ? 'visible' : 'hidden'}`}} className={location.pathname === '/claim' ?`Claim nav__button--active`:`Claim nav__button`}><Link to='/claim'>Claim XPNET</Link></div>
}
