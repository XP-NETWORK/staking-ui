
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

export default function Main() {

    const account = useSelector(state => state.data.account)
    const loader = useSelector(state => state.data.connected)

    const location = useLocation()

    useEffect(() => {
    }, [loader])
    // || location.pathname.includes("search")
    if(location.pathname ==="/gallery" ){
        return <Switch>
        <Route component={Gallery} path="/gallery"></Route>
        {/* <Route path="/search/:id"><Search /></Route>
         <Route component={Search} path="/search"></Route> */}
        </Switch>
        }
    else if(!account && !loader){
        return <Connect />
    }
    else if(!account && loader){
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
                    <Search />
                </Route>
                <Route component={Search} path="/search"></Route>
            </Switch>
            )
    }
}
