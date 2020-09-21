import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';
//import Check from "@material-ui/icons/Check";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import SnackbarContent from "components/Snackbar/SnackbarContent.js";
//import Clearfix from "components/Clearfix/Clearfix.js";

import {BaseUrl} from "variables/BaseUrl";
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
 const [entryData,setEntryData]=React.useState({});
 const [recievedData,setRecievedData]=React.useState(false);
 const [removeData,setRemoveData]=React.useState(false);
  const classes = useStyles();
  
  
  React.useEffect(()=>{
      if(SendReq===true){
        try{
          
            const sendData=async ()=>{
              const result =await fetch(`${BaseUrl}/api/o/maingate/log`,{
                  method:"post",
                  headers:{
                    'Content-Type':"application/json",
                     Authorization:`Bearer ${token}`
                    },
                  body:JSON.stringify({
                    id:data.id,
                    uid:uid,
                    token:token,
                    action:"enter"
                  })
                 })
               const res = await result.json();
              if(result.status===200||result.status===201){
                setRemoveData(false);
                setEntryData(res);
                setRecievedData(true);
                removeDiv();
              }
            
          }
            sendData();
            setSendReq(false);
          }
          catch(err){
            console.log(err);
            
          } 
          
      }
  },[SendReq,uid,token,data])

 const removeDiv=()=>{
   setTimeout(()=>{
     setRemoveData(true);
   },5000)
 }
 const onChange=(e)=>{setUid(e.target.value)}
  

  return (
      <div>
          <div className={classes.typo} style={{ marginTop: "-50px" }}>
              <h2><strong>BITS-PILANI,HYDERABAD CAMPUS</strong></h2>
          </div>
          <GridContainer justify="center" alignItems="center">
              <GridItem xs={12} sm={12} md={8}>
                  <Card>
                      <CardHeader color="primary">
                          <h4 className={classes.cardTitleWhite}><b>MAIN GATE </b></h4>

                      </CardHeader>
                      <CardBody>
                          <h5 style={{ display: "flex", justifyContent: "center" }}><b>ENTRY POINT</b></h5>

                          <GridContainer  justify="center" alignItems="center">
                              <GridItem xs={12} sm={12} md={12}>
                                  <GridContainer direction="row" justify="center" alignItems="center">
                                      <GridItem>
                                  <FormControl variant="outlined">
                                      <InputLabel htmlFor="component-outlined">Student UID</InputLabel>
                                      <OutlinedInput 
                                      id="component-outlined"  
                                      onChange={onChange} 
                                      inputProps={{
                                        id:"uid",
                                        onKeyPress:(event)=>{
                                          if (event.keyCode === 13||event.which === 13) {
                                            event.preventDefault();
                                            document.getElementById("submit").click();
                                           }
                                        }
                                      }} 
                                      label="Student UID"  />
                                  </FormControl>
                                  </GridItem>
                                  </GridContainer>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                  <GridContainer direction="row" justify="center" alignItems="center" >
                                      <GridItem>
                                          <Button color="success" id="submit" onClick={()=>{setSendReq(true)}}
                                          >
                                              Submit
                                           </Button>
                                      </GridItem>
                                     
                                  </GridContainer>
                            
                              </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                 {(recievedData===true) && (entryData.error===false) && (removeData===false)?
                  <div style={{background:"#a1d993",borderRadius:'16px',border:'1px solid black'}}>
                  <GridContainer direction="row"  >
                    <GridItem xs={12} sm={12} md={7}>
                                  <div ><GridContainer direction="column" justify="center" alignItems="center" >
                                      <GridItem xs={12} sm={12} md={12} >
                                         <h3 style={{color:"#2d4d25"}}><span style={{fontWeight:"600"}}> {entryData.name}</span></h3> 
                                      </GridItem >
                                      <GridItem xs={12} sm={12} md={12}>
                 <h4 style={{color:"#2d4d25"}}><span style={{fontWeight:"400"}}>ID</span> :<span style={{fontWeight:"500"}}>{entryData.id}</span></h4>
                                      </GridItem>
                                      </GridContainer></div>
                                      </GridItem>
                                      <GridItem xs={12} sm={12} md={5}>
                                      <div ><GridContainer direction="column" justify="center" alignItems="center" >
                                      <GridItem xs={12} sm={12} md={12} >
                                         <h3 style={{color:"#2d4d25"}}><span style={{fontWeight:"600"}}> YOU CAN ENTER</span></h3> 
                                      </GridItem >
                                      <GridItem xs={12} sm={12} md={12}>
                                        <DoneOutlineIcon fontSize="large"/>
                                      </GridItem>
                                      </GridContainer></div>
                                      </GridItem>
                                  </GridContainer>
                                   </div>
                                   :
                                   (recievedData===true) && (entryData.error===true) && (removeData===false)?
                                   <div style={{background:"#FFCC00",borderRadius:'16px',border:'1px solid black'}}>
                                   <GridContainer direction="row"  >
                                     <GridItem xs={12} sm={12} md={7}>
                                                   <div ><GridContainer direction="column" justify="center" alignItems="center" >
                                                       <GridItem xs={12} sm={12} md={12} >
                                                          <h3 style={{color:"#914d03"}}><span style={{fontWeight:"600"}}> {entryData.name}</span></h3> 
                                                       </GridItem >
                                                       <GridItem xs={12} sm={12} md={12}>
                                                         <h4 style={{color:"#914d03"}}><span style={{fontWeight:"400"}}>ID</span> :<span style={{fontWeight:"500"}}>{entryData.id}</span></h4>
                                                       </GridItem>
                                                       </GridContainer></div>
                                                       </GridItem>
                                                       <GridItem xs={12} sm={12} md={5}>
                                                       <div ><GridContainer direction="column" justify="center" alignItems="center" >
                                                       <GridItem xs={12} sm={12} md={12} >
                                                          <h4 style={{color:"#914d03"}}><span style={{fontWeight:"600"}}> NO EXIT RECORD FOUND</span></h4> 
                                                       </GridItem >
                                                       <GridItem xs={12} sm={12} md={12}>
                                                       <InfoIcon fontSize="large" />
                                                       </GridItem>
                                                       </GridContainer></div>
                                                       </GridItem>
                                                   </GridContainer>
                                                    </div>:null}
                </GridItem>
                {/*<GridItem xs={12} sm={12} md={12}>
                  
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <div style={{background:"#9e0b03",borderRadius:'16px',border:'1px solid black'}}>
                  <GridContainer direction="row"  >
                    <GridItem xs={12} sm={12} md={7}>
                                  <div ><GridContainer direction="column" justify="center" alignItems="center" >
                                      <GridItem xs={12} sm={12} md={12} >
                                         <h3 style={{color:"white"}}>NAME :<span style={{fontWeight:"600"}}> GAURAV DASH</span></h3> 
                                      </GridItem >
                                      <GridItem xs={12} sm={12} md={12}>
                                        <h4 style={{color:"white"}}>ID :<span style={{fontWeight:"500"}}>2019AAPS0274H</span></h4>
                                      </GridItem>
                                      </GridContainer></div>
                                      </GridItem>
                                      <GridItem xs={12} sm={12} md={5}>
                                      <div ><GridContainer direction="column" spacing={2} justify="center" alignItems="center" >
                                      <GridItem xs={12} sm={12} md={12} >
                                         <h4 style={{color:"white"}}><span style={{fontWeight:"600"}}> YOU ARE BLACKLISTED</span></h4> 
                                      </GridItem >
                                      <GridItem xs={12} sm={12} md={12}>
                                      <CancelIcon fontSize="large" color="inherit" />
                                      </GridItem>
                                      </GridContainer></div>
                                      </GridItem>
                 </GridContainer>
                                   </div>
                 </GridItem>*/}

                          </GridContainer>
                      </CardBody>
                  </Card>
              </GridItem>

          </GridContainer>
      </div>
  );
}
