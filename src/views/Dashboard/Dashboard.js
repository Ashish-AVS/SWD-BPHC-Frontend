import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import InfoIcon from '@material-ui/icons/Info';
import Restaurant from "@material-ui/icons/Restaurant";
import EventNoteIcon from '@material-ui/icons/EventNote';
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

import { official,
  department,
  techassocs,
  regionalassocs,
  miscellaneous,
  sports,
  clubs,
  others } from "variables/general.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note}>
          <h3>Hello, Gaurav Dash</h3>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Restaurant/>
              </CardIcon>
              <p className={classes.cardCategory}>Current Mess</p>
              <h3 className={classes.cardTitle}>
                MESS 1
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="rose">
                  Check Menu
                </Button>
              </div>
              <div className={classes.stats}>
                <Button round color="rose">
                  Grace
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="primary">
                <EventNoteIcon /> 
              </CardIcon>
              <h2 className={classes.cardCategory}>Events</h2>
              <h4 className={classes.cardTitle}>No recent Events </h4>
            </CardHeader>
            {/*<CardBody>
              <h5>No New Events in between</h5>
            </CardBody>*/}
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
          </GridItem>*/}
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
        </GridItem>
      </GridContainer>*/}
      <div className={classes.note} style={{marginTop:"20px"}}>
          <h4><b>CAMPUS NEWS AND NOTICES</b></h4>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Notices:"
            headerColor="success"
            tabs={[
              {
                tabName: "Official",                
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={official}
                  />
                )
              },
              {
                tabName: "Departments",              
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0, 1]}
                    tasks={department}
                  />
                )
              },
              {
                tabName: "Clubs",                
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={clubs}
                  />
                )
              },
              {
                tabName: "TechAssocs",                
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={techassocs}
                  />
                )
              },
              {
                tabName: "RegionalAssocs",                
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={regionalassocs}
                  />
                )
              },
              {
                tabName: "Sports",                
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={sports}
                  />
                )
              },
              {
                tabName: "Miscellaneous",
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={miscellaneous}
                  />
                )
              },
              {
                tabName: "others",
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={others}
                  />
                )
              },
            ]}
          />
        </GridItem>
       {/* <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
              </Card>
        </GridItem>*/}
      </GridContainer>
    </div>
  );
}
