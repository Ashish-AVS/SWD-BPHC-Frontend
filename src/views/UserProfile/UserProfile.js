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
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/bitslogo.png";

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

export default function UserProfile() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>STUDENT PROFILE DETAILS</b></h4>
              <p className={classes.cardCategoryWhite}>Your Profile Must Be Updated</p>
            </CardHeader>
            <CardBody>
            <h3><b>PERSONAL DETAILS</b></h3>
              <GridContainer  justify="center">
                
                <GridItem xs={12} sm={12} md={4}>
                  
                  <CustomInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Room No."
                    id="room"
                    helperText="Please update your Room No."
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Phone No."
                    id="phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="ID"
                    id="myid"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Birthdate"
                    id="birthdate"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Gender"
                    id="gender"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Aadhar Card No."
                    id="aadhar"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="PAN Card No."
                    id="pan"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Category"
                    id="category"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Personal Mail"
                    id="mail"
                    formControlProps={{
                      fullWidth: true
                    }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                   labelText="BITSmail"
                   id="bitsmail"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                  </GridItem>
              </GridContainer>
              <h3><b>MEDICAL DETAILS</b></h3>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Blood Group"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Medical History"
                    id="medHistory"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Current Medication"
                    id="CurrMed"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <h3><b>ADDRESS</b></h3>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                  <CustomInput
                    labelText="Address"
                    id="Address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City/Town"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="State"
                    id="state"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="PIN Code"
                    id="pin"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <h3><b>BANK ACCOUNT DETAILS</b></h3>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Account Number"
                    id="accno"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bank Name"
                    id="bankname"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="IFSC Code"
                    id="ifscCode"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                
              </GridContainer>
              <h3><b>LOCAL GUARDIAN'S DETAILS</b></h3>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Name"
                    id="locname"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone No."
                    id="locphno"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                  <CustomInput
                    labelText="Address"
                    id="Address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                </GridContainer>
                <h3><b>OTHER DETAILS</b></h3>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Father's Name"
                    id="paname"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Father's Phone No."
                    id="paphno"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                  <CustomInput
                    labelText="Father's Email"
                    id="pamail"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Father's Occupation"
                    id="paocc"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Father's Company"
                    id="pacomp"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Father's Designation"
                    id="padesg"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Mother's Name"
                    id="maname"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Mother's Phone No."
                    id="maphno"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                  <CustomInput
                    labelText="Mothers's Email"
                    id="mamail"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mother's Occupation"
                    id="maocc"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mother's Company"
                    id="macomp"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mother's Designation"
                    id="madesg"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Family Income"
                    id="famIncome"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Nationality"
                    id="nationality"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                  </GridItem>
              </GridContainer>
              
            </CardBody>
            <CardFooter>
              <Button color="info">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridContainer xs={12} sm={12} md={4} direction="column">
          <GridItem >
          <Card >
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody >
              <h6 >Your Mentor</h6>
              <h4 className={classes.cardTitle}><b>Prof. G. Sunder</b></h4>
              <h7>profmail@hyderabad.bits-pilani.ac.in</h7>
              <p>Ph No. 040-1111-1111</p>
              
              
            </CardBody>
          </Card>
          </GridItem>
          <GridItem >
            <Button  round color="info">
             Change Password
            </Button>
          </GridItem>
          
         </GridContainer>
      </GridContainer>
    </div>
  );
}
