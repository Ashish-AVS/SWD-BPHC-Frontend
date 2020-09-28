import React from "react";
import {Redirect} from "react-router-dom";
import qs from 'querystring';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {BaseUrl} from "variables/BaseUrl";

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
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function ResetPassword(props) {
  const classes = useStyles();
  const [isError,setIsError]=React.useState(false);
const [errMsg,setErrMsg]=React.useState('');
const [confError,setConfError]=React.useState(true);
  const [pwdData,setPwdData]=React.useState({
    uid:'',
    token:'',  
    newPwd:'',
      confPwd:null
  });
  const [sendingData,setSendingData]=React.useState(false)
  const [entryStarted,setEntryStarted]=React.useState(false)
  React.useEffect(()=>{
    if(!pwdData.newPwd.localeCompare(pwdData.confPwd)){
    setConfError(false);
    }
    else
    setConfError(true);
    })
    React.useEffect(()=>{
        setPwdData(prevState=>({
         ...prevState,
         uid:new URLSearchParams(props.location.search).get("uid"),
         token: new URLSearchParams(props.location.search).get("reset_token")
        }))
            
    },[])

  React.useEffect(()=>{
    if(sendingData===true){
      
      try{
         // console.log(mcnData);
        const fetchData= async ()=>{
          const result= await fetch(`${BaseUrl}/api/auth/reset`,{
            method:'post',
            headers:{'Content-Type':"application/json"
            },
            body:JSON.stringify({
              uid:pwdData.uid,
              npassword:pwdData.confPwd,
              reset_token:pwdData.token
              })
          }) ;
          const res = await result.json();
          if(res.err===false&& result.status===201){     
            return(
            <Redirect exact to='/login-page' />
            )
      }
      else if(res.err===true){
          setIsError(true);
          setErrMsg(res.msg);
      }
    }
        fetchData();
        setSendingData(false)
        
      }catch(err){
          console.log(err);
        }}
       
      });
  function onChange(e){
      
    const { name, value } = e.target;
    setPwdData(prevState=>({
         ...prevState,
         [name]: value
     }));
     
 }
 function onConfChange(e){
    setEntryStarted(true);
  const {  value } = e.target;
  setPwdData(prevState=>({
       ...prevState,
       confPwd: value
   }));
   
}
  return (
    <div>
      <div  style={{display:'flex',justifyContent:'center'}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <GridContainer justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>RESET PASSWORD</b></h4>
              
            </CardHeader>
            <CardBody>
            <GridContainer  justify="center" alignItems='center' >
                  <GridItem xs={12} sm={12} md={8}>
                    <GridContainer direction="column"  >
                      
                      <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="New Password"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{  
                                      value:pwdData.newPwd,                                      
                                        name: 'newPwd',
                                        type:"password"    
                                       }}
                                       helperText="Atleast 5 charecters"
                                    error={confError && entryStarted}
                                    success={!confError && entryStarted}

                                />
                      </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Confirm Password"                                 
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                      value:pwdData.confPwd,
                                         name: 'confPwd',
                                         type:"password"
                                    }}
                                    onChange={onConfChange}
                                    error={confError && entryStarted}
                                    success={!confError && entryStarted}
                                />
                            </GridItem>                  
                  </GridContainer>
                 </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter style={{display:'flex',justifyContent:'center'}}>
                
                    
              <Button color="success" onClick={()=>{setSendingData(true)}}>Confirm</Button>
                  
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
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
