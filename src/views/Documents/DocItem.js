import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
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
