import "./Navbar.css"
import xplogo from "../../assets/XpLogo.png"
import metaLogo from "../../assets/MetaMask_Fox.svg"
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="nav">
                <div className="xp__logo"><img src={xplogo} alt="XP.Network Logo" /></div>
                <div className="Stake nav__button nav__button--active"><Link to='/stake'>Stake XPNET</Link></div>
                <div className="Claim nav__button"><Link to='/claim'>Claim XPNET</Link></div>
            </div>
            <div className="metamask">
                <div className="metamask__status"><div className="online"></div></div>
                <div className="metamask__icon"><img src={metaLogo} alt="" /></div>
                <div className="metamask__title">MetaMask</div>
            </div>
        </div>
    )
}
