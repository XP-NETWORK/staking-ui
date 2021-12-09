import { Link } from "react-router-dom";
import xplogo from "../../assets/logoXpStake.svg"
import React from 'react'
import AccountBox from "./AccountBox";
import BTN from "./Parts/BTN";

export default function MobileNav() {
    return (
    <div className="nav__mob">
        <div className="nav__top">
            <div className="top__logo">
                <Link to='/stake'>
                    <img src={xplogo} alt="XP.Network Logo" />
                </Link>
            </div>
            <AccountBox />
        </div>
        <div className="nav__buttons--mob">
            <div className="mob__buttons__wrapper">
                <BTN type={"Stake"} />
                <BTN type={"Claim"} />
            </div>
        </div>
    </div>
    )
}
