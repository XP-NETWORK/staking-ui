
import { Route, Switch } from "react-router-dom";
import Stake from "../../Pages/Stake/Stake"
import Claim from "../../Pages/Claim/Claim"
import Search from "../../Pages/Search/Search"
import Gallery from "../Gallery/Gallery";
import { useSelector, useDispatch} from 'react-redux'
import { updateParams } from "../../redux/totalSupply"
import Connection from '../Connect/Conection';
import Loader from '../../Components/Loader/Loader';
import { useEffect } from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";

export default function Main() {
    const dispatch = useDispatch()
    const {
        isAuthenticated,
        user,
    } = useMoralis();

    let { tokenId } = useParams()
    
    useEffect(() => {
        debugger
        if(tokenId){dispatch(updateParams(tokenId))}
    }, [tokenId])
  
    //   useEffect(() => {
    //     if (!isWeb3Enabled && isAuthenticated) {
    //       enableWeb3({ provider: "walletconnect", chainId: 56 });
    //       console.log("web3 activated");
    //     }
    //   }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

    // useEffect(() => {
    // }, [loader])
    
    // useEffect(() => {
    //     if (!isWeb3Enabled && isAuthenticated) {
    //       enableWeb3({ provider: "walletconnect", chainId: 56 });
    //       console.log("web3 activated");
    //     }
    //   }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

    // if(!account && !loader)
    if(!isAuthenticated && !user){
        return <Connection />
    }
    else{
        return (
            <Switch>
                <Route component={Stake} exact path="/"></Route>
                <Route component={Stake} path="/stake"></Route>
                <Route component={Claim} path="/claim"></Route>
                <Route component={Search} path="/search"></Route>
                <Route component={Search} path="/stake/{tokenId}"></Route>
                <Route component={Gallery} path="/gallery"></Route>
            </Switch>
            )
    }
}
