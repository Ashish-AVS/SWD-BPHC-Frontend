import React, { useState,createContext, useContext} from 'react';

export const AuthContext = createContext();
export  function AuthContextProvider(props){
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  //const [uid, setUid] = useState();
  
  const onLogin=(data)=>{
    console.log("pehle YAAhan");
  //  localStorage.setItem("tokens",data);
    //const value=JSON.parse(localStorage.getItem("tokens"));
    //console.log("phir YAAhan");
    setAuthTokens(data);
    console.log("phiri YAAhan");
    };
  
 return <AuthContext.Provider value={{authTokens,onLogin:onLogin}} {...props}/>;
}
export function useAuth() {
  return useContext(AuthContext);
}