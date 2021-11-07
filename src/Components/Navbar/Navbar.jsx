import "./Navbar.css"
import xplogo from "../../assets/logoXpStake.svg"
import mobileLogo from "../../assets/XPLogo.svg"
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'
import NavButton from "./Parts/NavButton";
import MetaMask from "./MetaMask";


export default function Navbar() {
    const location = useLocation();
    const balance = useSelector(state => state.data.balance)
    const connectPushed = useSelector(state => state.data.connectPushed)
    

    const showNav = () => {
        if(connectPushed){
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
                <MetaMask />
            </div>
            <div className="navbar--mobile">
                <div className="xp__logo--mobile">
                    <Link to='/stake'>
                        <img src={xplogo} alt="XP.Network Logo" />
                    </Link>
                </div>
               <MetaMask />
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
