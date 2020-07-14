import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridContainer from "components/Grid/GridContainer.js";


// Created Components
import DocItem from "./DocItem";



import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Documents() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note}>
          <h3>Official Documents</h3>
      </div>
      
      <GridContainer>
        <DocItem 
        docTitle="Bonafide Certificate" 
         />
         <DocItem 
        docTitle="No Objection Certificate" 
         />
         <DocItem 
        docTitle="Vacation Letter" 
         />
         <DocItem 
        docTitle="Good Character Certificate" 
         />
         <DocItem 
        docTitle="Medical Insurance Claim Form" 
         />
         <DocItem 
        docTitle="Merit Certificate 19-20 Sem-1" 
         />
      </GridContainer>
     
    </div>
  );
}
