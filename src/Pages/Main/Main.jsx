
import { Route, Switch } from "react-router-dom";
import Stake from "../../Pages/Stake/Stake"
import Claim from "../../Pages/Claim/Claim"
import { useSelector } from 'react-redux'
import Connect from '../Connect/Connect';
import Loader from '../../Components/Loader/Loader';
import { useEffect } from 'react';

export default function Main() {
    const account = useSelector(state => state.data.account)
    const loader = useSelector(state => state.data.connected)
    console.log("Loader:",loader)


    useEffect(() => {
        console.log(loader, 'hello')
    }, [loader])

    if(!account && !loader){
        return <Connect />
    }
    else if(!account && loader){
        return <Loader />
    }

    else{
        return (
            <Switch>
                <Route exact path="/"><Stake /></Route>
                <Route path="/stake"><Stake /></Route>
                <Route path="/claim"><Claim /></Route>
            </Switch>
            )
    }
}
