import React, { useState } from "react";
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
// import { TextField } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { is } from "@babel/types";
import { name } from "file-loader";


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

export default function Awards() {
  const classes = useStyles();
  const [isSuccess,setisSuccess]=useState(false);
  const [isError,setIsError]=useState(false);
  const [errMsg,setErrMsg]=useState("");

  const [awardData,setAwardData]=useState({
    name:"",
    field:"",
    insti:"",
    date:"",
    desc:"",
    link:""
  })
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function onChange(e){
    const { name, value } = e.target;
    setAwardData(prevState=>({
         ...prevState,
         [name]: value
     }));
     
 }

 function submitData(e){
  
  e.preventDefault();
  if(awardData.name==="" ||awardData.field==="" ||awardData.insti===""){
    setErrMsg("Empty fields detected");
    setIsError(true);
  }
  else{
    setisSuccess(true);
    setAwardData(prevState=>({
      ...prevState,
      name: "",
      date: "",
      desc: "",
      field: "",
      link: "",
      insti: "",
  }));
  }

   
}
   
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <GridContainer justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={11}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>AWARDS AND ACHIEVEMENTS</b></h4>
            </CardHeader>
            <CardBody>
            <h3 style={{display:"flex",justifyContent:"center"}}><b>MENTION YOUR ACHIEVEMENTS</b></h3>
              <GridContainer >
               
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Name of the Achievement *"
                    id="award"
                    helperText="i.e Gold medal in BoSM"
                    formControlProps={{
                      fullWidth: true
                    }}
                    // value={awardData.name}
                    inputProps={{
                      name:'name',value:awardData.name
                    }}
                    onChange={onChange}

                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Field of Achievement *"
                    id="ach"
                    helperText="i.e Academics, Sports, Arts etc"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:'field',value:awardData.field
                    }}
                    onChange={onChange}

                  />                  
                </GridItem>                
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Awarding Institute *"
                    id="awardIns"
                    helperText="Name of the Institution"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:'insti',value:awardData.insti
                    }}
                    onChange={onChange}

                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Description about the achievement"
                    id="Desc"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:'desc',value:awardData.desc
                    }}
                    onChange={onChange}

                  />
                </GridItem>
                  <GridItem xs={12} sm={12} md={1}></GridItem>                 
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Date"
                    id="awardDate"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:'date',value:awardData.date
                    }}
                    onChange={onChange}

                  />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Link (if any)"
                    id="link"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name:'link',value:awardData.link
                    }}
                    onChange={onChange}

                  />                  
                </GridItem>
              </GridContainer>              
            </CardBody>
            <CardFooter style={{display:'flex', justifyContent:'center'}}>
              <Button color="primary" round onClick={submitData}>Submit</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>

      <Snackbar
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={isSuccess}
        autoHideDuration={5000}
        onClose={() => { setisSuccess(false) }}>
        <Alert
          onClose={() => { setisSuccess(false) }}
          severity="success">
          Successfully Submitted
                  </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={isError}
        autoHideDuration={5000}
        onClose={() => { setIsError(false) }}>
        <Alert
          onClose={() => { setIsError(false) }}
          severity="error">
          {errMsg} 
                  </Alert>
      </Snackbar>
    </div>
  );
}
