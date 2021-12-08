import React from 'react'
import xplogo from "../../assets/logoXpStake.svg"
import { Link } from "react-router-dom";
import AccountBox from './AccountBox';
import BTN from './Parts/BTN';


export default function DesktopNav() {
    return (
    <div className="navbar">
        <div className="navbar__logotype">
            <Link to='/stake'>
                <img src={xplogo} alt="XP.Network Logo" />
            </Link> 
        </div>
        <div className="navbar__nav-buttons">
            <div className="nav-buttons__container">
                <BTN type={"Stake"} />
                <BTN type={"Claim"} />
            </div>
        </div>
        <div className="account__container"><AccountBox /></div>
    </div>
    )
}
