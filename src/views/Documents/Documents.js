import React from "react";
import {Redirect} from "react-router-dom";
import {saveAs} from 'file-saver';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";


// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

//Auth Components
import { useAuth } from "context/auth";
// Created Components
import {BaseUrl} from "variables/BaseUrl";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Documents() {
  const classes = useStyles();
  const [isFetching,setIsFetching]=React.useState(true);
  const [doc,setDoc]=React.useState([])
  const [docKey,setDocKey]=React.useState('')
  const user=JSON.parse(localStorage.getItem("data"));
  const [success,setSuccess]=React.useState(false);
  const token=JSON.parse(localStorage.getItem("tokens"));
  const [err,setErr]=React.useState(false);
  const [errMsg,setErrMsg]=React.useState('');
  const { onLogin } = useAuth();
  React.useEffect(()=>{
    try{
      const fetchData= async ()=>{
        const result= await fetch(`${BaseUrl}/api/doc/list?uid=${user.uid}`,{
          headers:{Authorization:token}
        }) ;
        const res = await result.json();
        if(res.err===false){
        setDoc(res.data);
        setIsFetching(false);
      }
      else if(res.err===true && result.status===401){
        logout();
      }
    }
    fetchData();
  }catch(err){
    console.log(err);
  }
  },[])
  const [sendingData,setSendingData]=React.useState(false);
  const {uid}=JSON.parse(localStorage.getItem("data"));
  
  const [loading,setLoading]=React.useState(false);

 
  React.useEffect(()=>{
    if(sendingData===true){
      setLoading(true);
      try{
      const sendData=async ()=>{
          const result =await fetch(`${BaseUrl}/api/doc?uid=${uid}&key=${docKey}`,{
            headers:{Authorization:token}
          });
          if (result.status===201) {
            const res = await result.blob();   
            const pdfBlob=new Blob([res],{type:'application/pdf'});
            saveAs(pdfBlob,`${uid}-${docKey}`);
            setSendingData(false);
            setDocKey('');
            setLoading(false);  
            setSuccess(true); 
            return;
          }
          const resultBody = await result.json();
          if (result.status==401) {
            logout();
            return;
          }
          setErr(true);
          setErrMsg(resultBody.msg);
          setLoading(false);
          setSendingData(false);
          return;      
        }
        sendData();
      }
      catch(err){
        console.log(err);
      }
    }
  },[sendingData,uid,docKey,token])
  const logout=()=>{
    localStorage.removeItem("tokens");
    localStorage.removeItem("data");
    onLogin(false);  
    return (<Redirect exact to='/login-page' />);
  }

  function onChange(e){
    setDocKey(e.target.value);
  }

  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note}>
          <h3>Official Documents</h3>
      </div> 
      <GridContainer justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>DOCUMENTS </b></h4>
              
            </CardHeader>
            <CardBody>
            <h3 style={{display:"flex",justifyContent:"center"}}><b>Download Document</b></h3>
            
              <GridContainer justify="center" alignItems="center" >
                  <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.labelRoot}> Select Document</InputLabel>
                  <Select
                   name="key"
                   className={classes.input+" "+classes.underline}
                   value={docKey}
                   onChange={onChange}
                  >
                     <MenuItem value={''}>SELECT DOCUMENT</MenuItem>
                    {doc.map((item,index)=>{
                        return <MenuItem key={index} value={item.key}>{item.name}</MenuItem>
                    })}
                     
                  </Select>
               </FormControl>
              </GridItem>                              
                <GridItem xs={12} sm={12} md={4}>
                    <Button color="success" round disabled={loading} onClick={()=>{
                      setSendingData(true)
                      }}>
                      Download
                    </Button>
                  
                </GridItem>
                
              </GridContainer> 
              
            </CardBody>
          </Card>
        </GridItem>
       
      </GridContainer>
      <Snackbar
           anchorOrigin={{horizontal:'center',vertical:'bottom'}}
            open={success}
            autoHideDuration={4000}
            onClose={()=>{
              setSuccess(false)
            }}>
            <Alert
              onClose={()=>{
                setSuccess(false)
              }}
              severity="success">
              File Download completed
        </Alert>
          </Snackbar>
          <Snackbar
           anchorOrigin={{horizontal:'center',vertical:'bottom'}}
            open={err}
            autoHideDuration={4000}
            onClose={()=>{
              setErr(false)
            }}>
            <Alert
              onClose={()=>{
                setErr(false)
              }}
              severity="error">
              {errMsg}
        </Alert>
          </Snackbar>
    </div>
  );
}
