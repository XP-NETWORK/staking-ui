import "./Navbar.css"
import xplogo from "../../assets/logoXpStake.svg"
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useHistory } from "react-router";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
    const location = useLocation();
    const connectPushed = useSelector(state => state.data.connectPushed)
    const history = useHistory()

    const showNav = () => {
        if(connectPushed){
            return(
            <>
            {/* <div className="navbar">
                <div className="xp__logo">
                    <Link to='/stake'>
                        <img src={xplogo} alt="XP.Network Logo" />
                    </Link>
                </div>
                <div className="nav__buttons">
                    <NavButton location={location} type="stake-btn" />
                    <NavButton balance={balance} location={location} type={'claim-btn'} />
                </div>
                <AccountBox />
            </div> */}
            {/* <div className="navbar">
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
            </div> */}
            {/* { window.innerWidth >= 1140 && <DesktopNav /> } */}
            <DesktopNav />
            {/* { window.innerWidth < 1140 && <MobileNav /> } */}
            <MobileNav />
            {/* <div className="navbar--mobile">
                <div className="xp__logo--mobile">
                    <Link to='/stake'>
                        <img src={xplogo} alt="XP.Network Logo" />
                    </Link>
                </div>
               <AccountBox />
                <div className="nav__buttons">
                    <BTN type={"Stake"} />
                    <BTN type={"Claim"} />
                </div>
            </div> */}
            </>
            )
        }
        else{
            return(
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
    }

    return (
        <>
        {showNav()}
        </>
    )
}
