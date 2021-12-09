import React from 'react'
import xplogo from "../../assets/logoXpStake.svg"
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router";

export default function DisconnectedNav() {
    const location = useLocation();
    const history = useHistory()

    return (
            <div className="navbar--disconnected">
                <div className="xp__logo">
                    <Link to='/stake'>
                        <img src={xplogo} alt="XP.Network Logo" />
                    </Link>
                </div>
                {
                    location.pathname === "/gallery" ? <div className="gallery__connect" onClick={() => history.push("/")}>Connect</div> : null
                }
            </div>
    )
}
