import React, { Suspense, lazy } from 'react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Base64 } from 'js-base64'

import 'assets/scss/material-kit-react.scss?v=1.9.0'

// import "assets/css/material-dashboard-react.css?v=1.9.0";
// Routing
import StudentPrivateRoute from './StudentPrivateRoute'
import OfficialPrivateRoute from './OfficialPrivateRoute'
import { AuthContextProvider } from './context/auth'

// import routes components here

const LandingPage = lazy(() => import('./views/LandingPage/LandingPage.js'))
const KnowYourDept = lazy(() => import('views/KnowYourDept/KnowYourDept'))
const Faqs = lazy(() => import('views/Faqs/Faqs'))
const AntiRagging = lazy(() => import('views/AntiRagging/AntiRagging'))

const LoginPage = lazy(() => import('views/LoginPage/LoginPage.js'))
const Reset = lazy(() => import('views/ResetPassword/ResetPassword'))
const OfficialLogin = lazy(() => import('views/Official/Official.js'))
const Admin = lazy(() => import('layouts/Admin.js'))
const Official = lazy(() => import('layouts/Official'))

export default function App (props) {
  const hist = createBrowserHistory()

  /*
  We need to check uid and exp of access token to redirect users with invalid tokens to login page
  TODO: regex validation for uid in token body
  */

  let redirect = 0
  const pathname = window.location.pathname
  try {
    let token = null
    if (pathname.startsWith('/admin/')) {
      token = JSON.parse(localStorage.getItem('tokens'))
    } else if (pathname.startsWith('/official/')) {
      token = JSON.parse(localStorage.getItem('officialtokens'))
    }
    const tokenBody = token.split('.')[1]
    if (tokenBody.length <= 1) {
      redirect = 1
    }
    const tokenBodyDecoded = JSON.parse(Base64.decode(tokenBody))
    tokenBodyDecoded.uid = tokenBodyDecoded.uid || ''
    tokenBodyDecoded.id = tokenBodyDecoded.id || ''
    if ((tokenBodyDecoded.uid.length < 9 && tokenBodyDecoded.id.length < 3) || tokenBodyDecoded.exp < Date.now() / 1000) {
      redirect = 1
    }
  } catch (e) {
    redirect = 1
  }
  if (redirect && (pathname.startsWith('/admin/') || pathname.startsWith('/official/'))) {
    if (pathname.startsWith('/admin/')) {
      return window.location.href = '/login-page/'
    } else {
      return window.location.href = '/official-login/'
    }
  }
  return (
    <AuthContextProvider>
      <Router history={hist}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='/know-your-dept' component={KnowYourDept} />
            <Route path='/FAQs' component={Faqs} />
            <Route path='/anti-ragging' component={AntiRagging} />

            <Route path='/login-page' component={LoginPage} />
            <Route path='/official-login' component={OfficialLogin} />
            <Route path='/reset-password' component={Reset} />
            <OfficialPrivateRoute path='/official' component={Official} />
            <StudentPrivateRoute path='/admin' component={Admin} />
            <Route path='/' component={LandingPage} />

          </Switch>
        </Suspense>
      </Router>
    </AuthContextProvider>

  )
}
