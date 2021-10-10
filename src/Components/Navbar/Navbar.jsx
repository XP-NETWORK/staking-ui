import "./Navbar.css"
import xplogo from "../../assets/XpLogo.png"
import metaLogo from "../../assets/MetaMask_Fox.svg"
import { Link, useLocation } from "react-router-dom";
import { connectMetaMask } from "../../utils/metamask"
import { useSelector, useDispatch } from 'react-redux'
import { chengeStatus } from "../../redux/counterSlice";
import { useEffect, useState } from "react"
import NavButton from "./Parts/NavButton";


export default function Navbar() {

    const [rendered, setRendered] = useState('stake')
    const location = useLocation();
    // console.log(location)
    const account = useSelector(state => state.data.account)
    const balance = useSelector(state => state.data.balance)
    // console.log("Nuvbar",balance)
    const dispatch = useDispatch()
    const toggleMetaMask = () => {
        connectMetaMask()
    }

    const showNav = () => {

        if(account){
            return(
            <div className="navbar">
            <div className="xp__logo">
                <Link to='/stake'>
                    <img src={xplogo} alt="XP.Network Logo" />
                </Link>
            </div>
                <div className="nav__buttons">
                {/* <div className={location.pathname === '/stake' || location.pathname === '/' ? `Stake nav__button--active`: `Stake nav__button`}><Link to='/stake'>Stake XPNET</Link></div> */}
                <NavButton location={location} type="stake-btn" />
                {/* <div style={{visibility:`${balance ? 'visible' : 'hidden'}`}} className={location.pathname === '/claim' ?`Claim nav__button--active`:`Claim nav__button`}><Link to='/claim'>Claim XPNET</Link></div> */}
                <NavButton balance={balance} location={location} type={'claim-btn'} />
            </div>
            <div className="metamask">
                <div className="metamask__status"><div className={account ? 'online' : 'offline'}></div></div>
                <div className="metamask__icon"><img src={metaLogo} alt="" /></div>
                <div className="metamask__title">MetaMask</div>
            </div>
            </div>
            )
        }
        else{
            return(
            <div className="navbar">
                <div className="xp__logo">
                    <Link to='/stake'>
                        <img src={xplogo} alt="XP.Network Logo" />
                    </Link>
                </div>
                <div className="investor">| Investor Portal</div>
            </div>
            )
        }
    }

    return (
        <>
        {showNav()}
        </>
    )
}
