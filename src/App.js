import React,{ useState } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch,} from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";
import "assets/css/material-dashboard-react.css?v=1.9.0";
// Routing
import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./context/auth";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import Official from "views/Official/Official.js";
import Admin from "layouts/Admin.js";

export default function App(props){  
var hist = createBrowserHistory();


const existingTokens = JSON.parse(localStorage.getItem("tokens"));
const [authTokens, setAuthTokens] = useState(existingTokens);
  
const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }



return(
        <AuthContext.Provider value={{authTokens,setAuthTokens:setTokens}}>
            <Router history={hist}>
              <Switch>
                <Route path="/landing-page" component={LandingPage} />
                <Route path="/profile-page" component={ProfilePage} />
                <Route path="/login-page" component={LoginPage} />
                <Route path="/official" component={Official} />
                <PrivateRoute path="/admin" component={Admin} />
                <Route path="/" component={Components} />
              </Switch>
            </Router>
        </AuthContext.Provider>

    );
}
