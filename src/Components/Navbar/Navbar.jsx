import "./Navbar.css"
import { useSelector } from 'react-redux'
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import DisconnectedNav from "./DisconnectedNav";

export default function Navbar() {
    const connectPushed = useSelector(state => state.data.connectPushed)

    const showNav = () => {
        if(connectPushed){
            return(
            <>
            <DesktopNav />
            <MobileNav />
            </>
            )
        }
        else{
            return(
            <DisconnectedNav />
            )
        }
    }

    return (
        <>
        {showNav()}
        </>
    )
}
