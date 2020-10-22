import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CircularProgress from '@material-ui/core/CircularProgress';
// @material-ui/icons
//import Email from "@material-ui/icons/Email";
//import People from "@material-ui/icons/People";

// core components
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GridContainer from "components/Grid/GridContainer0.js";
import GridItem from "components/Grid/GridItem0.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { useAuth } from "context/auth";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg-official.jpg";
//import { json } from "d3";
import {BaseUrl} from "variables/BaseUrl";
const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function OfficialLogin(props) {
  const [emptyError,setEmptyError]=React.useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const {officialAuthTokens,onOfficialLogin} = useAuth();
  const [isLoggingIn, setLoggingIn]=useState(false);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [isError, setIsError] = useState(false);
  const [conError,setConError]=useState(false);
  let t;
  const [timer,setTimer]=React.useState(false);
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
        const result= await fetch(`${BaseUrl}/api/o/auth/login`,{
           method:"post",
           headers:{'Content-Type':"application/json"},
           body:JSON.stringify({
             id:id,
             password:pwd,
             type:"1"
          }),
          signal:signal      
        })
        const res =await result.json();
        if(result.status===200||result.status===201||result.status===304){ 
          
           onOfficialLogin(res.data.bearer_token);
          
           setLoggedIn(true);
          }
          else if(result.status===422){
            setLoggingIn(false);
            setEmptyError(true);
            setLoading(false);
            removeTimer();
          } 
          else if(result.status===401){
            setLoggingIn(false);
            setIsError(true);
            setLoading(false);
            removeTimer()
          }     
        }
        setTimer(true);
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
   
    props.history.push("/official");
    setLoading(false); 
  return ()=>{
    setLoggedIn(false);
    } 
  }
 },[isLoggedIn,officialAuthTokens,props.history])
 
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
                  <CardHeader color="danger" className={classes.cardHeader}>
                    <h4><strong>OFFICIAL LOGIN</strong></h4>
                  </CardHeader>
                 
                  <CardBody>
                  
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <Link to="/"><h6>Back to home page </h6></Link>
                    </div>
                   
                    <FormControl fullWidth className={classes.formControl}>
      <InputLabel className={classes.labelRoot}>OfficialID</InputLabel>
      <Select
        id='id'
        className={classes.input+" "+classes.underline}
        onChange={(e)=>{
          setId(e.target.value);
          }}
        
       >
         <MenuItem value={'swd'}>SWD</MenuItem>
         <MenuItem value={'chief_warden'}>CHIEF WARDEN</MenuItem>
         <MenuItem value={'MESS1'}>MESS 1</MenuItem>
         <MenuItem value={'MESS2'}>MESS 2</MenuItem>
         <MenuItem value={'vk'}>VISHWAKARMA BHAWAN</MenuItem>
         <MenuItem value={'vy'}>VYAS BHAWAN</MenuItem>
         <MenuItem value={'me'}>MEERA BHAWAN</MenuItem>
         <MenuItem value={'vm'}>VALMIKI BHAWAN</MenuItem>
      </Select>
     </FormControl>
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

                      
                      </GridItem>
                      <GridItem>
                    {loading?<CircularProgress size={24}  style={{position:'inherit',left:'45%'}} color="primary"/>:null}                     
                    </GridItem>
                    </GridContainer>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        
      </div>
      <Snackbar
           anchorOrigin={{horizontal:'center',vertical:'top'}}
            open={isError}
            autoHideDuration={4000}
            onClose={()=>{
              setIsError(false)
            }}>
            <Alert
              onClose={()=>{
                setIsError(false)
              }}
              severity="error">
              Invalid Credentials
        </Alert>
          </Snackbar>
          <Snackbar
           anchorOrigin={{horizontal:'center',vertical:'top'}}
            open={conError}
            autoHideDuration={4000}
            onClose={()=>{
              setConError(false)
            }}>
            <Alert
              onClose={()=>{
                setConError(false)
              }}
              severity="error">
              Error in Connection
        </Alert>
          </Snackbar>
          <Snackbar
           anchorOrigin={{horizontal:'center',vertical:'top'}}
            open={emptyError}
            autoHideDuration={4000}
            onClose={()=>{
              setEmptyError(false)
            }}>
            <Alert
              onClose={()=>{
                setEmptyError(false)
              }}
              severity="error">
              Empty Fields Detected!
        </Alert>
          </Snackbar>
    </div>
  );
}
