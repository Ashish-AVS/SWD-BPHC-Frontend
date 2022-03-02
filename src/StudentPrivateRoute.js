import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './context/auth'

function StudentPrivateRoute ({ component: Component, ...rest }) {
  const { authTokens } = useAuth()
  return (
    <Route
      {...rest}
      render={(props) => (
        authTokens
          ? (
            <Component {...props} />)
          : (

            <Redirect exact to='/login-page' />)
      )}
    />
  )
}

export default StudentPrivateRoute
