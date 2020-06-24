import React from "react";


// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


const useStyles = makeStyles(styles);

export default function GoodieItem({goodieName,goodieImage,goodieContactName,goodieContactNo,goodieSeller}) {
  const classes = useStyles();
  
  return (
        <GridItem xs={12}>
          <Card>
            <CardHeader color="Transparent">
              <h3 className={classes.cardTitle}>
                  {goodieName}                
              </h3>
            </CardHeader>
            <CardBody>
                 <GridContainer xs={12} sm >
                    <GridItem>
                       <img className={classes.img} src={goodieImage} alt="goodie"></img>
                   </GridItem>
                   <GridContainer direction="column"  justify="center" alignItems="center">
                        <GridItem>
                            <div className={classes.typo}>
                              <h4>This goodie is sold by {goodieSeller}  </h4>
                               <p>For any queries please contact<br/>{goodieContactName}<br/>Ph No. - {goodieContactNo} </p>
                            </div>
                            </GridItem>
                            <GridItem >
                            <Button round color="info">
                                Buy
                             </Button>
                        </GridItem>
                  </GridContainer>
                 </GridContainer>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round>
                 View Size Chart
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        

  );
}
