import "./Navbar.css"
import xplogo from "../../assets/XPLogo.svg"
import metaLogo from "../../assets/MetaMask_Fox.svg"
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'
import NavButton from "./Parts/NavButton";


export default function Navbar() {
    const location = useLocation();
    const account = useSelector(state => state.data.account)
    const balance = useSelector(state => state.data.balance)
    

    const showNav = () => {
        if(account){
            return(
            <>
            <div className="navbar">
                <div className="xp__logo">
                    <Link to='/stake'>
                        <img src={xplogo} alt="XP.Network Logo" />
                    </Link>
                </div>
                    <div className="nav__buttons">
                    <NavButton location={location} type="stake-btn" />
                    <NavButton balance={balance} location={location} type={'claim-btn'} />
                </div>
                <div className="metamask">
                    <div className="metamask__status"><div className={account ? 'online' : 'offline'}></div></div>
                    <div className="metamask__icon"><img src={metaLogo} alt="" /></div>
                    <div className="metamask__title">MetaMask</div>
                </div>
            </div>
            <div className="navbar--mobile">
                <div className="xp__logo">
                    <Link to='/stake'>
                        <img src={xplogo} alt="XP.Network Logo" />
                    </Link>
                </div>
                <div className="metamask">
                    <div className="metamask__status"><div className={account ? 'online' : 'offline'}></div></div>
                    <div className="metamask__icon"><img src={metaLogo} alt="" /></div>
                    <div className="metamask__title">MetaMask</div>
                </div>
                <div className="nav__buttons">
                    <NavButton location={location} type="stake-btn" />
                    <NavButton balance={balance}  location={location} type={'claim-btn'} />
                </div>
                
            </div>
            </>
            )
        }
        else{
            return(
            <>
            <div className="navbar">
                <div className="xp__logo">
                    <Link to='/stake'>
                        <img src={xplogo} alt="XP.Network Logo" />
                    </Link>
                </div>
                <div className="investor">| Investor Portal</div>
            </div>
            <div className="navbar--mobile">
            <div className="xp__logo">
                <Link to='/stake'>
                    <img src={xplogo} alt="XP.Network Logo" />
                </Link>
            </div>
            <div className="investor">| Investor Portal</div>
        </div>
            </>
            )
        }
    }

    return (
        <>
        {showNav()}
        </>
    )
}
