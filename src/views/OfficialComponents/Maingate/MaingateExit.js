import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Search() {

 const token=JSON.parse(localStorage.getItem("officialtokens"));
 const data= JSON.parse(atob(token.split('.')[1]));
 const uidRef=React.useRef()
 const [uid,setUid]=React.useState();
 const [SendReq,setSendReq]=React.useState(false);
 const [exitData,setExitData]=React.useState({});
 const [recievedData,setRecievedData]=React.useState(false);
 const [blacklist,setBlacklist]=React.useState(false);
 const [timer,setTimer]=React.useState(false);
 const [removeData,setRemoveData]=React.useState(false);
 const [success,setSuccess]=React.useState(false)
 const [successMsg,setSuccessMsg]=React.useState(false)
 const [err,setErr]=React.useState(false)
 const [errMsg,setErrMsg]=React.useState(false)
  let t;
  const classes = useStyles();
const [closeReq,setCloseReq]=React.useState(false)
   
  React.useEffect(()=>{
      if(SendReq===true){
        try{
          setRemoveData(true);
            const sendData=async ()=>{
              const result =await fetch(`${BaseUrl}/api/o/maingate/log`,{
                  method:"post",
                  headers:{
                    'Content-Type':"application/json",
                     Authorization:`Bearer ${token}`
                    },
                  body:JSON.stringify({
                    id:data.id,
                    uid:uidRef.current.value,
                    token:token,
                    action:"exit"
                  })
                 })
               const res = await result.json();
              if(result.status===200||result.status===201){
                setRemoveData(false);
                setBlacklist(false);
                setExitData(res);
                setRecievedData(true);
                setTimer(true);
                uidRef.current.value=''
              }
              else if(result.status===400){
                setRemoveData(false);
                setBlacklist(true);
                setExitData(res);
                setRecievedData(true);
                setTimer(true);
                uidRef.current.value=''
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

  React.useEffect(()=>{
    if(closeReq===true){
      try{
        console.log('hi')
      const sendCloseReq=async ()=>{
        console.log('hi')
        const result=await fetch(`${BaseUrl}/api/o/maingate/close`,{
          method:"post",
          headers:{
            'Content-Type':"application/json",
             Authorization:`Bearer ${token}`
            }
         })
        const res = await result.json() 
        if(res.err===false){
          setSuccessMsg(res.msg)
          setSuccess(true)
        }
        else{
          setErr(true)
          setErrMsg(res.msg)
        } 
      }
      sendCloseReq()
      setCloseReq(false)
      }catch(err){
       console.log(err)
      }
    }
  })


  React.useEffect(()=>{
    if(timer===true){
      removeDiv();
      return ()=>{
        removeTimer();
        setTimer(false);
      }
    }
  })

const removeTimer=()=>{
  clearTimeout(t);
}

 
const removeDiv=()=>{
  t= setTimeout(()=>{
     setRemoveData(true);
   },5000)
 }
 
 //const onChange=(e)=>{setUid(e.target.value)}
 
  return ( <div>
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
                    <h5 style={{ display: "flex", justifyContent: "center" }}><b>EXIT POINT</b></h5>

                    <GridContainer  justify="center" alignItems="center">
                        <GridItem xs={12} sm={12} md={12}>
                            <GridContainer direction="row" justify="center" alignItems="center">
                                <GridItem>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="component-outlined">Student UID</InputLabel>
                                <OutlinedInput 
                                id="component-outlined"  
                                //onChange={onChange} 
                                inputRef={uidRef}
                                inputProps={{
                                  id:"uid",
                                  onKeyPress:(event)=>{
                                    if (event.keyCode === 13||event.which === 13) {
                                      event.preventDefault();
                                      document.getElementById("submit").click();
                                     }
                                  }
                                  }} 
                                label="Student UID"  
                                />
                            </FormControl>
                            </GridItem>
                            </GridContainer>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <GridContainer direction="row" justify="center" alignItems="center" >
                                <GridItem xs={6} sm={6} md={3}>
                                    <Button color="success" id="submit" onClick={()=>{setSendReq(true)}}>
                                        Submit
                                     </Button>
                                </GridItem>
                                
                            </GridContainer>
                      
                        </GridItem>
          <GridItem xs={12} sm={12} md={12}>
           {(recievedData===true) && (exitData.err===false) &&(blacklist===false)  && (removeData === false)?
                  <div style={{ background: "#a1d993", borderRadius: '16px', border: '1px solid black' }}>
                    <GridContainer direction="row"  >
                      <GridItem xs={12} sm={12} md={7}>
                        <div ><GridContainer direction="column" justify="center" alignItems="center" >
                          <GridItem xs={12} sm={12} md={12} >
                            <h3 style={{ color: "#2d4d25" }}><span style={{ fontWeight: "600" }}> {exitData.data.name}</span></h3>
                          </GridItem >
                          <GridItem xs={12} sm={12} md={12}>
                            <h4 style={{ color: "#2d4d25" }}><span style={{ fontWeight: "400" }}>ID</span> :<span style={{ fontWeight: "500" }}>{exitData.data.id}</span></h4>
                          </GridItem>
                        </GridContainer></div>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <div ><GridContainer direction="column" justify="center" alignItems="center" >
                          <GridItem xs={12} sm={12} md={12} >
                            <h3 style={{ color: "#2d4d25" }}><span style={{ fontWeight: "600" }}> YOU CAN EXIT</span></h3>
                          </GridItem >
                          <GridItem xs={12} sm={12} md={12}>
                            <DoneOutlineIcon fontSize="large" />
                          </GridItem>
                        </GridContainer></div>
                      </GridItem>
                    </GridContainer>
                  </div>
                  :
                  (recievedData === true) && (exitData.err === true) &&(blacklist===false) && (removeData === false)?
                    <div style={{ background: "#FFCC00", borderRadius: '16px', border: '1px solid black' }}>
                      <GridContainer direction="row"  >
                        <GridItem xs={12} sm={12} md={7}>
                          <div ><GridContainer direction="column" justify="center" alignItems="center" >
                            <GridItem xs={12} sm={12} md={12} >
                              <h3 style={{ color: "#914d03" }}><span style={{ fontWeight: "600" }}> {exitData.data.name}</span></h3>
                            </GridItem >
                            <GridItem xs={12} sm={12} md={12}>
                              <h4 style={{ color: "#914d03" }}><span style={{ fontWeight: "400" }}>ID</span> :<span style={{ fontWeight: "500" }}>{exitData.data.id}</span></h4>
                            </GridItem>
                          </GridContainer></div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                          <div ><GridContainer direction="column" justify="center" alignItems="center" >
                            <GridItem xs={12} sm={12} md={12} >
                              <h4 style={{ color: "#914d03" }}><span style={{ fontWeight: "600" }}> NO ENTRY RECORD FOUND</span></h4>
                            </GridItem >
                            <GridItem xs={12} sm={12} md={12}>
                              <InfoIcon fontSize="large" />
                            </GridItem>
                          </GridContainer></div>
                        </GridItem>
                      </GridContainer>
                    </div> : 
                     (recievedData === true) && (exitData.err === true) &&(blacklist===true) && (removeData === false)?
                     <div style={{background:"#9e0b03",borderRadius:'16px',border:'1px solid black'}}>
            <GridContainer direction="row"  >
              <GridItem xs={12} sm={12} md={7}>
                            <div ><GridContainer direction="column" justify="center" alignItems="center" >
                                <GridItem xs={12} sm={12} md={12} >
                                   <h3 style={{color:"white"}}>{exitData.data.name}</h3> 
                                </GridItem >
                                <GridItem xs={12} sm={12} md={12}>
                                  <h4 style={{color:"white"}}>ID :<span style={{fontWeight:"500"}}>{exitData.data.id}</span></h4>
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
                            
                                 
                     :null}
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
<GridItem xs={12} sm={12} md={8}>
  <Card>
    <CardBody>
      <GridContainer justify="center">
        <GridItem xs={8} sm={8} md={4}>
        <Button color="danger" disabled={closeReq} onClick={()=>{setCloseReq(true)}}> Close The Gate </Button>  
        </GridItem>
      </GridContainer>
    
    </CardBody>
  </Card>
</GridItem>
    </GridContainer>
    <Snackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      open={success}
      autoHideDuration={4000}
      onClose={() => {
        setSuccess(false)
      }}>
      <Alert
        onClose={() => {
          setSuccess(false)
        }}
        severity="success">
        {successMsg}
        </Alert>
    </Snackbar>
    <Snackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      open={err}
      autoHideDuration={4000}
      onClose={() => {
        setErr(false)
      }}>
      <Alert
        onClose={() => {
          setErr(false)
        }}
        severity="error">
        {errMsg}
      </Alert>
    </Snackbar>
</div>
  );
}
