import React from "react";
import {Redirect} from "react-router-dom";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridContainer from "components/Grid/GridContainer.js";

//Auth Components
import { useAuth } from "context/auth";
// Created Components
import DocItem from "./DocItem";
import {BaseUrl} from "variables/BaseUrl";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
  
export default function Documents() {
  const classes = useStyles();
  const [isFetching,setIsFetching]=React.useState(true);
  const [doc,setDoc]=React.useState([])
  const user=JSON.parse(localStorage.getItem("data"));
  const token=JSON.parse(localStorage.getItem("tokens"));
  const { onLogin } = useAuth();
  React.useEffect(()=>{
    try{
      const fetchData= async ()=>{
        const result= await fetch(`${BaseUrl}/api/doc/list?uid=${user.uid}`,{
          headers:{Authorization:token}
        }) ;
        const res = await result.json();
        if(res.err===false){
        setDoc(res.data);
        setIsFetching(false);
      }
      else if(res.err===true && result.status===401){
        logout();
      }
    }
    fetchData();
  }catch(err){
    console.log(err);
  }
  },[])
  const logout=()=>{
    localStorage.removeItem("tokens");
    localStorage.removeItem("data");
    onLogin(false);  
    return (<Redirect exact to='/login-page' />);
  }
const DocData=isFetching?<h4>Loading Data...</h4>: 
<GridContainer>
 {doc.map((item)=>{
   return(<DocItem 
        docTitle={item.name}
        docKey={item.key} 
          />)
        })
 }
</GridContainer>;
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note}>
          <h3>Official Documents</h3>
      </div> 
    {DocData}     
    </div>
  );
}
