import "./Navbar.css"
import xplogo from "../assets/XpLogo.png"
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="nav">
                <div className="xp__logo"><img src={xplogo} alt="XP.Network Logo" /></div>
                <div className="Stake nav__button nav__button--active"><Link>Stake XPNET</Link></div>
                <div className="Claim nav__button"><Link>Claim XPNET</Link></div>
            </div>
            <div className="metamask">
                <div className="metamask__status">!!</div>
                <div className="metamask__icon">Icon</div>
                <div className="metamask__title">MetaMask</div>
            </div>
        </div>
    )
}
