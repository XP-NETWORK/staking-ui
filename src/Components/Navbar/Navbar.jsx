import "./Navbar.css"
import xplogo from "../../assets/XpLogo.png"
import metaLogo from "../../assets/MetaMask_Fox.svg"
import { Link, useLocation } from "react-router-dom";
import { connectMetaMask } from "../../utils/metamask"
import { useSelector, useDispatch } from 'react-redux'
import { chengeStatus } from "../../redux/counterSlice";
import { useEffect, useState } from "react"


export default function Navbar() {

    const [rendered, setRendered] = useState('stake')
    const location = useLocation();
    // console.log(location)
    const metaMaskStatus = useSelector(state => state.data.connected)
    const dispatch = useDispatch()
    const toggleMetaMask = () => {
        connectMetaMask()
    }

    return (
        <div className="navbar">
            <div className="xp__logo"><img src={xplogo} alt="XP.Network Logo" /></div>
            <div className="nav__buttons">
                <div className={location.pathname === '/stake' || location.pathname === '/' ? `Stake nav__button--active`: `Stake nav__button`}><Link to='/stake'>Stake XPNET</Link></div>
                <div className={location.pathname === '/claim' ?`Claim nav__button--active`:`Claim nav__button`}><Link to='/claim'>Claim XPNET</Link></div>
            </div>
            <div onClick={ () => toggleMetaMask()} className="metamask">
                <div className="metamask__status"><div className={metaMaskStatus ? 'online' : 'offline'}></div></div>
                <div className="metamask__icon"><img src={metaLogo} alt="" /></div>
                <div className="metamask__title">MetaMask</div>
            </div>
        </div>
    )
}
