import React, { Suspense, lazy } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch,} from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";
//import "assets/css/material-dashboard-react.css?v=1.9.0";
// Routing
import StudentPrivateRoute from "./StudentPrivateRoute";
import OfficialPrivateRoute from "./OfficialPrivateRoute";
import { AuthContextProvider } from "./context/auth";

// import routes components here

const LandingPage = lazy(() => import('./views/LandingPage/LandingPage.js'));
const KnowYourDept = lazy(() => import('views/KnowYourDept/KnowYourDept'));
const LoginPage = lazy(() => import('views/LoginPage/LoginPage.js'));
const OfficialLogin = lazy(() => import('views/Official/Official.js'));
const Admin = lazy(() => import('layouts/Admin.js'));
const Official = lazy(() => import('layouts/Official'));

export default function App(props){  
var hist = createBrowserHistory();

return(
        <AuthContextProvider>
            <Router history={hist} >
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path="/know-your-dept" component={KnowYourDept} />
                  <Route path="/login-page" component={LoginPage} />
                  <Route path="/official-login" component={OfficialLogin} />
                  <OfficialPrivateRoute path="/official" component={Official} />
                  <StudentPrivateRoute path="/admin" component={Admin} />
                  <Route path="/"  component={LandingPage}/>
                </Switch>
              </Suspense>
            </Router>
        </AuthContextProvider>

    );
}
