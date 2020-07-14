import React from "react";

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


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Connect() {
  const classes = useStyles();
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
        {/*<GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="primary">
                <EventNoteIcon /> 
              </CardIcon>
              <h2 className={classes.cardCategory}>Events</h2>
              <h4 className={classes.cardTitle}>No immediate event scheduled </h4>
            </CardHeader>
            {/*<CardBody>
              <h5>No New Events in between</h5>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="rose">Check Events Calender</Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
               <InfoIcon/> 
              </CardIcon>
              <p className={classes.cardCategory}>Complaints</p>
              <h3 className={classes.cardTitle}><small>Status</small> None</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="rose">Post a Complaint</Button>
                
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {/*<GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
          </GridItem>}
      </GridContainer>
      {/*<GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
         <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
         </Card>
      </GridItem>*/}
      </GridContainer>

      
    </div>
  );
}
