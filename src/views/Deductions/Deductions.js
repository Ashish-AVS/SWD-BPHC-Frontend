import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "30px",
    position: "relative",
   },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Deductions() {
  const classes = useStyles();
  return (
  <div>
          <div className={classes.typo} style={{marginTop:"-50px"}}>
              <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
          </div>
        <div className={classes.typo}>
          <h5>Here you can see all your deductions of this semester</h5>
        </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Goodies Bought From Portal</h4>
           
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["GoodieName", "Amount(in Rs)"]}
              tableData={[
                ["Varun Thakur Show ", 169],
                ["SU Zipper", 550 ]
                
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>
              Mess Deductions
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here you will see all the mess related deductions
            </p>
          </CardHeader>
          <CardBody>
            <h3>We haven't recieved any data for this semester</h3>
            {/*<Table
              tableHeaderColor="primary"
              tableHead={["ID",""]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park"
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten"
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
              ]}
            />*/}
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>
              Other Advances Deductions
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here you will see all the deductions from other advances
            </p>
          </CardHeader>
          <CardBody>
            <h3>We haven't recieved any data for this semester</h3>
            {/*<Table
              tableHeaderColor="primary"
              tableHead={["ID",""]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park"
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten"
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
              ]}
            />*/}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
 </div>
  );
}
