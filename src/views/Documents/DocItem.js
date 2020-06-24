import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";

import Logo from "assets/img/bitslogo.png";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function DocItem({docTitle}) {
  const classes = useStyles();
  return (
    
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader>
              <img src={Logo} alt="BitsLogo" className={classes.img}></img>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{docTitle} </h4>
              <p className={classes.cardCategory}>
                You can download {docTitle} in pdf format below
              </p>
            </CardBody>
            <CardFooter style={{display:"flex",justifyContent:"center"}}>
              <div>
                <Button round color="info">
                    Download
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
  );
}
