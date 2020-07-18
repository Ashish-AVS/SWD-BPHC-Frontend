import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
//import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
//import Header from "components/Header/Header.js";
//import HeaderLinks from "components/Header/HeaderLinks.js";

import GridContainer from "components/Grid/GridContainer0.js";
import GridItem from "components/Grid/GridItem0.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { useAuth } from "context/auth";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bgimg.jpg";

const useStyles = makeStyles(styles);

let data={
  name:'',
  id:'',
  uid:'',
  isComplete:''}

export default function LoginPage(props) {
  let fetching=false;
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const {authTokens,onLogin} = useAuth();
  const [isLoggingIn, setLoggingIn]=useState(false);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [isError, setIsError] = useState(false);
  //const { setTokens,setUser } = useAuth();
  const [uid,setUid]= React.useState();
  const [pwd,setPwd]=React.useState();
  
 useEffect(()=>{
   if(isLoggingIn){  
    console.log("hi1");
   fetchData(); 
    return (()=>{

      setLoggingIn(false);
    })
    
   }
 },[isLoggingIn,setLoggingIn]);

 useEffect(()=>{
  console.log(authTokens);
   if(isLoggedIn===true){
    localStorage.setItem("tokens",JSON.stringify(authTokens)); 
    localStorage.setItem("data",JSON.stringify(data));
    console.log("hi2");
    
    props.history.push("/admin/dashboard"); 
   }
 },[isLoggedIn])
 
const fetchData= async ()=>{  
  try{  
  const result= await fetch("http://localhost:9000/api/auth",{
       method:"post",
       headers:{'Content-Type':"application/json"},
       body:JSON.stringify({
         uid:uid,
         password:pwd
      })      
    })
    const res =await result.json();
    if(res.token){ 
       onLogin(res.token); 
       data.name=res.name;
       data.id=res.id;
       data.isComplete=res.isComplete;
       data.uid=uid;

       setLoggedIn(true);
      }      
    }catch(err){
      
      console.log(err)
    }
   }
 setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  

 //function onUidChange(e){
  //setUid(e.target.value);
  //console.log(uid);
 //}

 function onPwdChange(e){
  setPwd(e.target.value);
 }

 function onSubmit(){
 
  /* localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  fetch("http://localhost:9000/api/auth",{
    method:"post",
    headers:{'Content-Type':"application/json"},
    body:JSON.stringify({
      uid:uid,
      password:pwd
    })
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.token){
     
     setUser("name",data.name);
     setLoggedIn(true);
     setTokens(data.token);
  }})
  .catch(e=>{
    setIsError(true);
  })*/
    
  //setLoggedIn(true);
  console.log("last main yaahan");
  
    setLoggingIn(true);
   
    
  }
 

  return (
    <div>
     {/* <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />*/}
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
                    <CustomInput
                      onChange={(e)=>{
                        setUid(e.target.value);
                        }}
                      labelText="Username"
                      placeholder="f201XXXXX"
                      id="first"
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
                    {/*<CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />*/}
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      onChange={onPwdChange}
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
                      <Button onClick={onSubmit} round color="rose" size="lg" >
                             Login
                      </Button>
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
