import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
//import Cookie from "js.cookie";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CircularProgress from '@material-ui/core/CircularProgress';
// @material-ui/icons
//import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import ForgotModal from './ForgotPasswordModal';

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

import image from "assets/img/bgimg.jpg";
import { TimelapseOutlined } from "@material-ui/icons";

import {BaseUrl} from "variables/BaseUrl";
const useStyles = makeStyles(styles);

let data={
  name:'',
  id:'',
  uid:'',
  isComplete:''}

export default function LoginPage(props) {
  const [emptyError,setEmptyError]=React.useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const {authTokens,onLogin} = useAuth();
  const [isLoggingIn, setLoggingIn]=useState(false);
  const [open,setOpen]=useState(false);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [isError, setIsError] = useState(false);
  const [conError,setConError]=useState(false);
  const [loading,setLoading]=React.useState(false);
  const [uid,setUid]= React.useState();
  const [pwd,setPwd]=React.useState();
  let t;
  const [timer,setTimer]=React.useState(false);
 useEffect(()=>{
  var userInput = document.getElementById("uid");
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

     try{
     const fetchData= async ()=>{  
        setConError(false)
        setIsError(false);
        setEmptyError(false);  
        axios.post(`${BaseUrl}/api/auth`,{
             uid:uid,
             password:pwd,
             type:'0'        
        }).then(result=>{
          if(result.status===200||result.status===201||result.status===304){
            //console.log(result.headers.get('Set-Cookie')); 
             
            onLogin(result.headers.authorization); 
             data.name=result.data.data.name;
             data.id=result.data.data.id;
             data.isComplete=result.data.data.isComplete;
             data.uid=uid;
             setLoggedIn(true);
          }
        
        }).catch((result)=>{
          if (result.response !== undefined) {
            if (result.response.status === 422) {
              
              setLoggingIn(false);
              setPwd('');
              setEmptyError(true);
              setLoading(false);
              removeTimer()
            }
            else if (result.response.status === 401) {

              setLoggingIn(false);
              setIsError(true);
              setPwd('');
              setLoading(false);
              removeTimer();
            }
          }
        })      
        
            
        }
        setTimer(true);
        fetchData();
      }catch(err){
          
          console.log(err)
        }
       
    
   }
 },[isLoggingIn,uid,pwd,onLogin]);

 useEffect(()=>{
 
   if(isLoggedIn===true){
    localStorage.setItem("tokens",JSON.stringify(authTokens)); 
    localStorage.setItem("data",JSON.stringify(data));
    props.history.push("/admin/dashboard");
    setLoading(false); 
  return ()=>{
    setLoggedIn(false);
    } 
  }
 },[isLoggedIn,props.history,authTokens])
 React.useEffect(()=>{
  if(timer===true){
    timeUp();
    return ()=>{
      removeTimer();
      setTimer(false);
    }
  }
})

const timeUp=()=>{
 t= setTimeout(()=>{
    setLoading(false);
    setLoggingIn(false);
    setConError(true);
  },12000)
}
const removeTimer=()=>{
  clearTimeout(t);
}
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
                  <CardHeader color="rose" className={classes.cardHeader}>
                    <h4><strong>STUDENT LOGIN</strong></h4>
                  </CardHeader>
                  {/*<p className={classes.divider}>Or Be Classical</p>*/}
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
                    {conError?
                  <div>
                    <SnackbarContent
                      message={
                      <span >
                        <b>CONNECTION ERROR:</b>Server Timed Out
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
                        setUid(e.target.value);
                        }}
                      labelText="UserID"
                      placeholder="f201XXXXX"
                      id="uid"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:uid,
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
                        value:pwd,
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
                      <Button id="login" onClick={()=>{setLoggingIn(true)}} round color="rose" size="lg" disabled={loading}>
                             Login
                      </Button>

                      {loading?<CircularProgress size={24} color="primary"/>:null}
                      </GridItem>
                      <GridItem>
                    <Link onClick={()=>{setOpen(true)}}><h6>Forgot Password? </h6></Link>
                    </GridItem>
                    </GridContainer>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        
      </div>
      <ForgotModal open={open} setOpen={setOpen}/>
    </div>
  );
}
