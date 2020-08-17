import React,{useEffect} from 'react';
import { Route,Redirect } from 'react-router-dom';
import { useAuth } from "./context/auth";

function OfficialPrivateRoute({ component: Component, ...rest }) {
  const {officialAuthTokens} = useAuth();
  useEffect(()=>{
    console.log("authToken ka value: ",officialAuthTokens);
  });
  
  
  return(
    <Route 
    {...rest} 
    render={(props) => (
      officialAuthTokens ?(
      <Component {...props} />)
      :(
      
      <Redirect exact to='/official-login'/>)
    )}
    />
  );
}

export default OfficialPrivateRoute;