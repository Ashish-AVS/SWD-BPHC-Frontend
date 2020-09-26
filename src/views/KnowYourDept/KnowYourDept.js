
import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";


import General from './General';


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function KnowYourDept() {  
  
  const classes = useStyles();
  return (
    <div>
      <div style={{display:'flex',justifyContent:'center'}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div style={{display:'flex',justifyContent:'center'}}>
          <h4><strong>KNOW YOUR DEPARTMENT</strong></h4>
      </div>
      
      
     
      <GridContainer direction="column" justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={11}>
          <CustomTabs
           
            headerColor="primary"
            tabs={[
              {
                tabName: "General",                
                tabContent: (
                 <General/>
                )
              },
              {
                tabName: "Computer Science(CS)",              
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "Electrical and Electronics(EEE)",                
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "Electronics and Communication(ECE)",                
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "Civil",                
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "Mechanical",                
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "Chemical",
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "B.Pharm",
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "M.Sc Chemistry",
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "M.Sc Physics",
                tabContent: (
                  <></>
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

