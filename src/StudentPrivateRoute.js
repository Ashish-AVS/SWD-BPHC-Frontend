import React,{useEffect} from 'react';
import { Route,Redirect } from 'react-router-dom';
import { useAuth } from "./context/auth";

function StudentPrivateRoute({ component: Component, ...rest }) {
  const {authTokens} = useAuth();
  useEffect(()=>{
    console.log("authToken ka value: ",authTokens);
  });
  
  //const token=localStorage.getItem('token');
  return(
    <Route 
    {...rest} 
    render={(props) => (
      authTokens ?(
      <Component {...props} />)
      :(
      
      <Redirect exact to='/login-page'/>)
    )}
    />
  );
}

export default StudentPrivateRoute;