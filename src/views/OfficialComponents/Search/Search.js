import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";



const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
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
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Search() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <GridContainer justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>AWARDS AND ACHIEVEMENTS</b></h4>
              
            </CardHeader>
            <CardBody>
            <h5 style={{display:"flex",justifyContent:"center"}}><b>MENTION YOUR ACHIEVEMENTS</b></h5>
              <GridContainer >
                
                <GridItem xs={12} sm={12} md={5}>
                  
                  <CustomInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="ID"
                    id="myid"
                    
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                  <CustomInput
                    labelText="Achievements/Awards"
                    id="award"
                    helperText="i.e Gold medal in BoSM"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Field of Achievement"
                    id="foAchievement"
                    helperText="i.e Academics, Sports, Arts etc"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Awarding Institute"
                    id="awardIns"
                    helperText="Name of the Institution"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Date"
                    id="awardDate"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Link"
                    id="link"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Description"
                    id="Desc"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
              </GridContainer>              
            </CardBody>
            <CardFooter>
                <GridContainer >
                    <GridItem>
              <Button color="success">Submit</Button>
                  </GridItem>
                  <GridItem>
              <Button color="danger">Discard</Button>
                  </GridItem>
                </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  );
}
