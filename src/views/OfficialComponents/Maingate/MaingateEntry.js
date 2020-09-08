import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import {
  primaryColor,
  defaultFont
} from "assets/jss/material-kit-react.js";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  typo: {
    paddingLeft: "20%",
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
  },
  input: {
    color: "#495057",
    height: "unset",
    "&,&::placeholder": {
      fontSize: "14px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "400",
      lineHeight: "1.42857",
      opacity: "1"
    },
    "&::placeholder": {
      color: "#AAAAAA"
    }
  },
  formControl: {
    margin: "0 0 17px 0",
    paddingTop: "27px",
    position: "relative",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: primaryColor
    }
  },
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    top:"-17px",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0",
    letterSpacing: "normal",
    "& + $underline": {
      marginTop: "0px"
    }
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    top: "10px",
    letterSpacing: "unset",
    "& + $underline": {
      marginTop: "0px"
    }}
};

const useStyles = makeStyles(styles);

export default function Search() {

 const token=JSON.parse(localStorage.getItem("officialtokens"));
 const data= JSON.parse(atob(token.split('.')[1]));
 const [uid,setUid]=React.useState();
 const [SendReq,setSendReq]=React.useState(false);
  
  const classes = useStyles();
  
  React.useEffect(()=>{
      if(SendReq===true){
        try{
            const sendData=async ()=>{
              const result =await fetch('https://swdnucleus.ml/api/o/maingate/log',{
                  method:"post",
                  headers:{'Content-Type':"application/json"},
                  body:JSON.stringify({
                    id:data.id,
                    uid:uid,
                    token:token,
                    action:"enter"
                  })
                 })
               const res = await result.json();
              if(result.status===200||result.status===201){
                console.log(res);
              }
            
          }
            sendData();
            setSendReq(false);
          }
          catch(err){
            console.log(err);
            
          } 
          
      }
  })
 
 const onChange=(e)=>{setUid(e.target.value)}
  /*
  
 React.useEffect(()=>{

    //setRecievedData(false);
    try{
      const fetchData=async ()=>{
        const result =await fetch(`https://swdnucleus.ml/api/o/messmenu?id=swd&token=${token}&messno=1`)
         const res = await result.json();
        if(result.status===200||result.status===201){
            setMessMenuData(res);
          setRecievedData(true);
          //setSendingData(false);
        }
       if(result.status===401)
       console.log(atob(token.split('.')[1]));
    }
      fetchData();
      
    }
    catch(err){
      console.log(err);
      console.log(atob(token.split('.')[1]))
    } 
  
  },[token,menuUpdated])
  React.useEffect(()=>{
   if(messUpdate===true){
    try{
      const sendData=async ()=>{
        const result =await fetch('https://swdnucleus.ml/api/o/maingate/',{
            method:"post",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({
              id:"swd",
              messno:1,
              token:token,
              menu:JSON.stringify(messMenuData)
            })
           })
         const res = await result.json();
        if(result.status===200||result.status===201){
          console.log("hi");
          setMenuUpdated(true);
          setMessUpdate(false);
        }
      
    }
      sendData();
      
    }
    catch(err){
      console.log(err);
      
    } 
  }
  },[messUpdate,token,messMenuData])
  */
  return (
      <div>
          <div className={classes.typo} style={{ marginTop: "-50px" }}>
              <h2><strong>BITS PILANI , HYDERABAD CAMPUS</strong></h2>
          </div>
          <GridContainer justify="center" alignItems="center">
              <GridItem xs={12} sm={12} md={8}>
                  <Card>
                      <CardHeader color="primary">
                          <h4 className={classes.cardTitleWhite}><b>MAIN GATE </b></h4>

                      </CardHeader>
                      <CardBody>
                          <h5 style={{ display: "flex", justifyContent: "center" }}><b>ENTRY POINT</b></h5>

                          <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                  <GridContainer direction="row" justify="center" alignItems="center">
                                      <GridItem>
                                  <FormControl variant="outlined">
                                      <InputLabel htmlFor="component-outlined">Student UID</InputLabel>
                                      <OutlinedInput id="component-outlined"  onChange={onChange} label="Student UID"  />
                                  </FormControl>
                                  </GridItem>
                                  </GridContainer>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                  <GridContainer direction="row" justify="center" alignItems="center" >
                                      <GridItem>
                                          <Button color="success" onClick={()=>{setSendReq(true)}}
                                          >
                                              Submit
                                           </Button>
                                      </GridItem>
                                      <GridItem>
                                          <Button color="danger">
                                              Discard
                                          </Button>
                                      </GridItem>
                                  </GridContainer>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                  <GridContainer direction="column" justify="center" alignItems="center" >
                                      <GridItem xs={12} sm={12} md={6} >
                                         <h3>NAME:  <strong>GAURAV DASH</strong></h3> 
                                         
                                      </GridItem >
                                      <GridItem xs={12} sm={12} md={6}>
                                        <h4>ID:  <strong>2019AAPS0274H</strong></h4>
                                      </GridItem>
                                  </GridContainer>
                              </GridItem>

                          </GridContainer>
                      </CardBody>
                  </Card>
              </GridItem>

          </GridContainer>
      </div>
  );
}
