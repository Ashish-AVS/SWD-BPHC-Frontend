
import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import Autolinker from 'react-autolinker';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

//import Danger from "components/Typography/Danger.js";
import Footer from "components/Footer/Footer.js";
import Img from 'assets/img/bitslogo.png'
import {BaseUrl} from "variables/BaseUrl";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function AntiRagging() {  
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgFluid1
  );


  return (
    <div>
      <GridContainer justify="center" alignItems="center">
      <GridItem xs={6} sm={6} md={3}>
      <Link to="/">
      <img  src={Img} alt="..." className={imageClasses}  />
      </Link>
      </GridItem>
      <GridItem xs={6} sm={6} md={7}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>    
      </GridItem>
      
      </GridContainer>
     
      <GridContainer direction="column" justify="center" alignItems="center">
       
        <GridItem xs={12} sm={12} md={10}>
        <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>ANTI-RAGGING @ BPHC</b></h4>
            </CardHeader>
            <CardBody>
            <h4>
         The Institute has formulated strict anti-ragging guidelines, and all students are required to sign an undertaking to abide by these guidelines. If found violating these guidelines, students are liable to disciplinary action, including expulsion from the Institute and possible legal action as per the directive from the Honourable Supreme Court of India.
The Institute has formed a committee and anti-ragging squads at the hostel and institute level to combat raging. The students can also communicate directly with the Associate Dean, Students Welfare, through the Institute website.
         
          </h4>
          <div>
             <ol>
             <Link to="/anti-ragging/1_2021-22_Anti-ragging_Committee_14-9-2021.pdf" target="_blank" > <li>Institute Anti-ragging Committee</li></Link>
             <Link to="/anti-ragging/2_Institute_Level_Squad.pdf" target="_blank" > <li>Institute Level Squad</li></Link>
             <Link to="/anti-ragging/3_Institute_Level_Cell.pdf" target="_blank" >  <li>Institute Level Cell</li></Link>
             <Link to="/anti-ragging/4_Online_Registration_of_Anti-Ragging_Declaration_Form.pdf" target="_blank" >  <li>Online Registration Anti Ragging Declaration</li></Link>
             <Link to="/anti-ragging/Hyd_Campus_SWD_Anti_Ragging_Poster" target="_blank" > <li>Campus Anti-Ragging Poster</li></Link>
             <Link to="/anti-ragging/RaghvanReport.pdf" target="_blank" >  <li>Raghvan Report</li></Link>
             <Link to="/anti-ragging/SupremeCourtOrder.pdf" target="_blank" >  <li>Supreme Court Order</li></Link>
             <Link to="/anti-ragging/UGCRegulation.pdf" target="_blank" >  <li>UGC Regulation</li></Link>
             </ol> 
             {/* The respective help-desk incharge and user will receive email notification after a request is submitted.<br />
             <div align="center">
               The link to access the portal is given below<br />
             </div> */}
          </div>
            </CardBody>
          </Card>      
  </GridItem>
  
      </GridContainer> 
     <Footer />
      
    </div>
  );
}

