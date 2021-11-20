import React from "react";
import Datetime from "react-datetime";
import {Redirect} from 'react-router-dom';
import {saveAs} from 'file-saver';
// @material-ui/core components
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

//Auth Components
import { useAuth } from "context/auth";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import {BaseUrl} from "variables/BaseUrl";
import {
  primaryColor,
  defaultFont
} from "assets/jss/material-kit-react.js";
import axios from "axios";
import AlertComponent from "components/Alert/Alert";

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

export default function MessReport() {

 const token=JSON.parse(localStorage.getItem("officialtokens"));
 
  //const [sendingData,setSendingData]=React.useState(false);
  const [mealCount,setmealCount]=
  React.useState({
    brkfast:0,
    lunch:0,
    snacks:0,
    dnr:0
  });
  const [sendingData, setSendingData]=React.useState(true)
  const [postDate,setPostDate]=React.useState(moment().format('YYYY-MM-DD'));
  const {onOfficialLogin}=useAuth();
  const classes = useStyles();
  const [err, setErr]=React.useState(false);
  const [msg, setMsg]=React.useState('')
  const tomorrow = moment().add(1, 'day');
  const disableFutureDt = current => {
    return current.isBefore(tomorrow);
  };
  React.useEffect(()=>{  
    if(sendingData===true){

      try{
        const SendData=async ()=>{
          const res =await axios.post(`${BaseUrl}/api/o/messlog/getCount`,{
            date:postDate
          },{
            headers:{Authorization:`Bearer ${token}`}
          })
           
          if (res.data.err === false) {
            setmealCount(res.data.data);
            console.log(res.data.data)
          }
          else if (res.data.err === true && res.status === 401) {
            logout();
          }
          else if (res.data.err === true) {
            setErr(true);
            setMsg(res.data.msg);
          }
          setSendingData(false)
        }
        SendData();
      }
      catch(err){
        console.log(err);  
      } 
      setSendingData(false)
    }
  
  },[sendingData])
 
 const logout=()=>{
  localStorage.removeItem("officialtokens");
  onOfficialLogin(false);  
  return (<Redirect exact to='/' />);
}
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>BITS PILANI , HYDERABAD CAMPUS</strong></h2>
      </div>
      <GridContainer justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>MESS MEAL REPORT</b></h4>
              
            </CardHeader>
            <CardBody>
            <h3 style={{display:"flex",justifyContent:"center"}}><b>MESS MEAL COUNT</b></h3>
            
              <GridContainer  direction="row"  justify="center"  alignItems="center">
                  <GridItem xs={12} sm={12} md={4}>
                  <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.label}>
                    Select Date
                  </InputLabel>
                  <Datetime
                   dateFormat="DD-MM-YYYY" 
                   timeFormat={false}
                   className={classes.input+" "+classes.underline}
                   defaultValue={Date.now()}
                   isValidDate={disableFutureDt}
                   value={postDate}
                   onChange={(e)=>{
                    const date = new Date(`${e}`);
                    const {Date1,Month,Year}={
                      Date1:date.getDate(),
                      Month:date.getMonth()+1,
                      Year:date.getFullYear()
                      }
                      if(Month>9){
                        if(Date1<10){
                      setPostDate(`${Year}-${Month}-0${Date1}`);}
                      else
                      setPostDate(`${Year}-${Month}-${Date1}`);
                      }else{
                        if(Date1<10)
                        setPostDate(`${Year}-0${Month}-0${Date1}`);
                        else
                        setPostDate(`${Year}-0${Month}-${Date1}`);
                      }  
                     }}
                    />
                </FormControl>
                
              </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                
                    <Button color="success" round onClick={()=>{
                      setSendingData(true)
                      }}>
                      Submit
                    </Button>
                  
                </GridItem>
                
              </GridContainer> 
              <h3 style={{display:"flex",justifyContent:"center",marginTop:'40px'}}><b>Meal Count</b></h3>             
             <GridContainer justify="center" alignItems="center">
                <GridItem xs={12} sm={12} md={2}>
                  <h4><b>Breakfast</b></h4>
                  <h4>{mealCount.brkfast}</h4>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <h4><b>Lunch</b></h4>
                  <h4>{mealCount.lunch}</h4>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <h4><b>Snacks </b></h4>
                  <h4>{mealCount.snacks}</h4>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <h4><b>Dinner </b></h4>
                  <h4>{mealCount.dnr}</h4>
                </GridItem>
             </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <AlertComponent type="error" isOpen={err} msg={msg} handleclose={()=>setErr(false)} />
    </div>
  );
}
