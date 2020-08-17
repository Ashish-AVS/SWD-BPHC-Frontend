import React, { useState,createContext, useContext} from 'react';

export const AuthContext = createContext();
export  function AuthContextProvider(props){
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const existingOfficialTokens = JSON.parse(localStorage.getItem("officialtokens"));
  const [officialAuthTokens, setOfficialAuthTokens] = useState(existingOfficialTokens);
  //const [uid, setUid] = useState();
  const onOfficialLogin=(data)=>{
    setOfficialAuthTokens(data);
    };
  const onLogin=(data)=>{
    console.log("pehle YAAhan");
    setAuthTokens(data);
    console.log("phiri YAAhan");
    };
  
 return <AuthContext.Provider value={{authTokens,onLogin:onLogin,officialAuthTokens,onOfficialLogin:onOfficialLogin}} {...props}/>;
}
export function useAuth() {
  return useContext(AuthContext);
}