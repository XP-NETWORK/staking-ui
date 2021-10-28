
import { Route, Switch } from "react-router-dom";
import Stake from "../../Pages/Stake/Stake"
import Claim from "../../Pages/Claim/Claim"
// import Search from "../../Pages/Search/Search"
import Gallery from "../Gallery/Gallery";
import { useSelector } from 'react-redux'
import Connection from '../Connect/Conection';
import Loader from '../../Components/Loader/Loader';
import { useEffect } from 'react';

export default function Main() {

    const account = useSelector(state => state.data.account)
    console.log("Main: ", account);
    const loader = useSelector(state => state.data.connected)

    useEffect(() => {
    }, [loader])

    if(!account && !loader){
        return <Connection />
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
                {/* <Route component={Search} path="/search"></Route> */}
                <Route component={Gallery} path="/gallery"></Route>
            </Switch>
            )
    }
}
