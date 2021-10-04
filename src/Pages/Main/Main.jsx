import React from 'react'
import { Route, Switch } from "react-router-dom";
import Stake from "../../Pages/Stake/Stake"
import Claim from "../../Pages/Claim/Claim"

export default function Main() {
    return (
    <Switch>
        <Route exact path="/"><Stake /></Route>
        <Route path="/stake"><Stake /></Route>
        <Route path="/claim"><Claim /></Route>
    </Switch>
    )
}
