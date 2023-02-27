import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import Dashboard from "./Dashboard";
import Signup from "./Signup";

function Router(){
    return(
        <div>
            <BrowserRouter>
            <Route exact path="/" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            </BrowserRouter>
        </div>
    )
}
export default Router;