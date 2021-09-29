import React from 'react'
import { Route, Switch } from "react-router-dom";
import Stake from "../../Pages/Stake/Stake"
import Claim from "../../Pages/Claim/Claim"

export default function Main() {
    return (
    <Switch>
        <Route exact path="/stake"><Stake /></Route>
        <Route exact path="/claim"><Claim /></Route>
    </Switch>
    )
}
