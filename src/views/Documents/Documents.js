import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridContainer from "components/Grid/GridContainer.js";


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

  React.useEffect(()=>{
    try{
      const fetchData= async ()=>{
        const result= await fetch(`${BaseUrl}/api/doc/list?uid=${user.uid}`,{
          headers:{Authorization:token}
        }) ;
        const res = await result.json();
        if(result.status===200||result.status===200||result.status===304){
        setDoc(res);
        setIsFetching(false);
      }
    }
    fetchData();
  }catch(err){
    console.log(err);
  }
  },[])
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
