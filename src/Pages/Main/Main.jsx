
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import Stake from "../../Pages/Stake/Stake"
import Claim from "../../Pages/Claim/Claim"
import { useSelector } from 'react-redux'
import { useLocation } from "react-router";
import Connect from '../Connect/Connect';
import Loader from '../../Components/Loader/Loader';
import { useEffect } from 'react';
import Gallery from "../Gallery/Gallery"
import Search from "../Search/Search";
import CollectionNFT from "../Search/CollectionNFT";

export default function Main() {
    const account = useSelector(state => state.data.account)
    const loader = useSelector(state => state.data.connected)
    const connectPushed = useSelector(state => state.data.connectPushed)
    const location = useLocation()

    if(location.pathname ==="/gallery" || location.pathname.includes("search")){
        return <Switch>
                    <Route component={Gallery} path="/gallery"></Route>
                    <Route path="/search/:id"><CollectionNFT /></Route>
                    <Route component={CollectionNFT} path="/search"></Route>
            </Switch>
        }
    else if(!connectPushed){
        return <Connect />
    }
    else if(!account && loader && connectPushed){
        return <Loader />
    }
    else{
        return (
            <Switch>
                <Route component={Stake} exact path="/"></Route>
                <Route component={Stake} path="/stake"></Route>
                <Route component={Claim} path="/claim"></Route>
                <Route component={Gallery} path="/gallery"></Route>
                <Route path="/search/:id">
                    <CollectionNFT />
                </Route>
                {/* <Route component={Search} path="/search"></Route> */}
            </Switch>
            )
    }
}
