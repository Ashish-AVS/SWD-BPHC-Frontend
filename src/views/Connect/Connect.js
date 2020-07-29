import React from "react";
import {csv} from "d3";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";

import prof from "./professors.csv";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Connect() {
  const classes = useStyles();
  const [isFetching,setIsFeching]=React.useState(true);
  React.useEffect(()=>{
    try{
      const fetchData= async ()=>{
      const result= await csv(prof) ;
      console.log(result);
     //console.log(res);
      
    }
  fetchData();
  }catch(err){
      console.log(err);
    }
  },[])
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note}>
          <h5>Wanna contact someone?</h5>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary">  
               <h3 className={classes.cardTitleCon}>
                RESPONSIBILITY BEARERS
               </h3>
            </CardHeader>
            <CardBody>
                <p>A complete Directory of all the students holding some position in various places</p>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="info">
                  View Directory
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary">  
               <h3 className={classes.cardTitleCon}>
                OFFICE DETAILS
               </h3>
            </CardHeader>
            <CardBody>
                <p>A complete Directory of all the office in-charges and administrative heads. </p>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="info">
                  View Directory
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary">  
               <h3 className={classes.cardTitleCon}>
                FACULTY DETAILS
               </h3>
            </CardHeader>
            <CardBody>
                <p>A complete Directory of all the teaching faculties of our College</p>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="info">
                  View Directory
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary">  
               <h3 className={classes.cardTitleCon}>
                WEBSITE AND PORTALS
               </h3>
            </CardHeader>
            <CardBody>
                <p>A complete Directory of all the websites and portals linked with BITS Pilani University</p>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="info">
                  View Directory
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary">  
               <h3 className={classes.cardTitleCon}>
                HOSTEL DETAILS
               </h3>
            </CardHeader>
            <CardBody>
                <p>A complete Directory of all contacts regarding hostel</p>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="info">
                  View Directory
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary">  
               <h3 className={classes.cardTitleCon}>
                212 BUS TIMINGS
               </h3>
            </CardHeader>
            <CardBody>
                <p>Timings of 212 bus from Campus to Secundrabad Railway Station and vice-versa</p>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="info">
                  View Directory
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
            </GridContainer>

      
    </div>
  );
}
