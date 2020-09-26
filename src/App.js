import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch,} from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";
//import "assets/css/material-dashboard-react.css?v=1.9.0";
// Routing
import StudentPrivateRoute from "./StudentPrivateRoute";
import OfficialPrivateRoute from "./OfficialPrivateRoute";
import { AuthContextProvider } from "./context/auth";

// pages for this product
// import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import KnowYourDept from "views/KnowYourDept/KnowYourDept";
import LoginPage from "views/LoginPage/LoginPage.js";
import OfficialLogin from "views/Official/Official.js";
import Admin from "layouts/Admin.js";
import Official from "layouts/Official";

export default function App(props){  
var hist = createBrowserHistory();




return(
        <AuthContextProvider>
            <Router history={hist} >
              <Switch>
                {/* <Route path="/components" component={Components}  /> */}
                <Route path="/know-your-dept" component={KnowYourDept} />
                <Route path="/login-page" component={LoginPage} />
                <Route path="/official-login" component={OfficialLogin} />
                <OfficialPrivateRoute path="/official" component={Official} />
                <StudentPrivateRoute path="/admin" component={Admin} />
                <Route path="/"  component={LandingPage}/>
              </Switch>
            </Router>
        </AuthContextProvider>

    );
}
