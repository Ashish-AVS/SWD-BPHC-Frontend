import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridContainer from "components/Grid/GridContainer.js";


//Created Components
import GoodieItem from "./GoodieItem";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Image1 from "assets/img/sidebar-1.jpg";
import Image2 from "assets/img/sidebar-3.jpg";

const useStyles = makeStyles(styles);

export default function Goodies() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note1}>
          <h5>This is the Funds and Goodies section of BITS-Pilani,Hyderabad Campus. </h5>
      </div>
      <GridContainer>
        <GoodieItem 
         goodieName="T-Shirt+Zipper"
         goodieImage={Image1}
         goodieContactName="Shraddha Di"
         goodieContactNo="987654321"
         goodieSeller="Student Welfare Div"
         
         />
       
        <GoodieItem 
         goodieName="T-Shirt"
         goodieImage={Image2}
         goodieContactName="Param Bhatt"
         goodieContactNo="9464568789"
         goodieSeller="Department of Technical Arts"
         
         />
       
        
                
      </GridContainer>
    </div>
  );
}
