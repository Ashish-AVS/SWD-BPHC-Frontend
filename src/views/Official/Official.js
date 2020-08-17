import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CircularProgress from '@material-ui/core/CircularProgress';
// @material-ui/icons
//import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";

// core components


import GridContainer from "components/Grid/GridContainer0.js";
import GridItem from "components/Grid/GridItem0.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SnackbarContent from "components/Snackbar/SnackbarContent";
import Clearfix from "components/Clearfix/Clearfix";
import { useAuth } from "context/auth";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg-official.jpg";

const useStyles = makeStyles(styles);



export default function OfficialLogin(props) {
  const [emptyError,setEmptyError]=React.useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const {officialAuthTokens,onOfficialLogin} = useAuth();
  const [isLoggingIn, setLoggingIn]=useState(false);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [isError, setIsError] = useState(false);
  const [loading,setLoading]=React.useState(false);
  const [id,setId]= React.useState();
  const [pwd,setPwd]=React.useState();
 useEffect(()=>{
  var userInput = document.getElementById("id");
  userInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("login").click();
    }
  });
  return ()=>{
    userInput.removeEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById("login").click();
      }
    });
  }
 })
 useEffect(()=>{
  var pwdInput = document.getElementById("pwd");
  pwdInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("login").click();
    }
  });
  return ()=>{
    pwdInput.removeEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById("login").click();
      }
    });
  }
 }) 
 useEffect(()=>{
   if(isLoggingIn===true){  
     setLoading(true);
     const abortController = new AbortController();
     const signal=abortController.signal;
     try{
     const fetchData= async ()=>{   
        setIsError(false);
        setEmptyError(false);  
        const result= await fetch("http://40.121.181.70/api/o/auth/login",{
           method:"post",
           headers:{'Content-Type':"application/json"},
           body:JSON.stringify({
             id:id,
             password:pwd
          }),
          signal:signal      
        })
        const res =await result.json();
        if(result.status===200||result.status===201||result.status===304){ 
           console.log(JSON.parse(atob(res.token.split('.')[1])));
           onOfficialLogin(res.token);
           setLoggedIn(true);
          }
          else if(result.status===422){
            setLoggingIn(false);
            setEmptyError(true);
            setLoading(false);
          } 
          else if(result.status===401){
            setLoggingIn(false);
            setIsError(true);
            setLoading(false);
          }     
        }
        fetchData();
      }catch(err){
          
          console.log(err)
        }
       
     return ()=>{
       abortController.abort();
     }
   }
 },[isLoggingIn,id,pwd,onOfficialLogin]);

 useEffect(()=>{
  
   if(isLoggedIn===true){
    localStorage.setItem("officialtokens",JSON.stringify(officialAuthTokens)); 
    //console.log("hi2");
    props.history.push("/official");
    setLoading(false); 
  return ()=>{
    setLoggedIn(false);
    } 
  }
 },[isLoggedIn,officialAuthTokens,props.history])
 

 setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles(); 

  return (
    <div>
     
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="danger" className={classes.cardHeader}>
                    <h4><strong>OFFICIAL LOGIN</strong></h4>
                  </CardHeader>
                 
                  <CardBody>
                  {emptyError?
                  <div>
                    <SnackbarContent
                      message={
                      <span >
                        <b>INVALID CREDENTIALS:</b>Provide valid input
                      </span>
                        }
                      close
                      color="danger"
                      icon="info_outline"
                    />
                    <Clearfix /></div>:null}
                    {isError?
                  <div><SnackbarContent
                    message={
                      <span>
                         <b>UN-AUTHORISED:</b>Incorrect credentials
                       </span>
                             }
                    close
                    color="danger"
                    icon="info_outline"
                    />
                    <Clearfix /></div>:null}
                    <CustomInput
                      onChange={(e)=>{
                        setId(e.target.value);
                        }}
                      labelText="OfficialID"
                      
                      id="id"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pwd"
                      onChange={(e)=>{
                        setPwd(e.target.value);
                        }}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <GridContainer direction="column" justify="center" alignItems="center">
                      <GridItem>
                      <Button id="login" onClick={()=>{setLoggingIn(true)}} round color="danger" size="lg" disabled={loading}>
                             Login
                      </Button>

                      {loading?<CircularProgress size={24} color="primary"/>:null}
                      </GridItem>
                      <GridItem>
                    <Link href="#" ><h6>Forgot Password? </h6></Link>
                    </GridItem>
                    </GridContainer>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        
      </div>
    </div>
  );
}
