import React from "react";
import Datetime from "react-datetime";
import {Redirect} from 'react-router-dom';
import {saveAs} from 'file-saver';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";

//Auth Components
import { useAuth } from "context/auth";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
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
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(styles);

export default function MessGrace() {

 const token=JSON.parse(localStorage.getItem("officialtokens"));
 
  //const [sendingData,setSendingData]=React.useState(false);
  const [docData,setDocData]=React.useState([]);
  const [sendingData,setSendingData]=React.useState(false);
  const [reqData,setReqData]=React.useState({key:'',uid:''});
  const [success,setSuccess]=React.useState(false);
  const {onOfficialLogin}=useAuth();
  const classes = useStyles();
  const [err,setErr]=React.useState(false);
  const [errMsg,setErrMsg]=React.useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErr(false);
    setSuccess(false);
  };
 
  React.useEffect(()=>{
  
    //setRecievedData(false);
    try{
      const SendData=async ()=>{
        const result =await fetch(`${BaseUrl}/api/o/doc`,{
          headers:{Authorization:`Bearer ${token}`}
        })
         const res = await result.json();
        if (res.err === false) {
          setDocData(res.data);
          console.log(res.data)
          
        }
        else if (res.err === true && result.status === 401) {
          logout();
        }
        else if (res.err === true) {
          setErr(true);
          setErrMsg(res.msg);
        }}
      SendData();
      
    }
    catch(err){
      console.log(err);
      
    } 
  
  },[])
  React.useEffect(()=>{
  
    if(sendingData===true){
    
        try{
      const SendData=async ()=>{
        const result =await fetch(`${BaseUrl}/api/o/doc`,{
         method:'post',
            headers:{'Content-Type':"application/json",Authorization:`Bearer ${token}`
          },
          body:JSON.stringify({
              uid:reqData.uid,
              key:reqData.key
          })
        })
        const res= await result.blob();       
          if(result.status===200||result.status===201){  
            const pdfBlob=new Blob([res],{type:'application/pdf'});
          saveAs(pdfBlob,`${reqData.uid}-${reqData.key}.pdf`);
          setReqData({
              uid:'',
              key:''
          })
          setSuccess(true);
                   
          }
        else {
          setErr(true);
          setErrMsg('Error in Downloading!');
        }
        }
      SendData();
      setSendingData(false);
      
    }
    catch(err){
      console.log(err);
      
    }
  }
  
  })
function onChange(e){
    const { name, value } = e.target;
    setReqData(prevState=>({
         ...prevState,
         [name]: value
     }));
     
 }
 
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
              <h4 className={classes.cardTitleWhite}><b>DOCUMENTS OPERATION </b></h4>
              
            </CardHeader>
            <CardBody>
            <h3 style={{display:"flex",justifyContent:"center"}}><b>Download Student Document</b></h3>
            
              <GridContainer  justify="center"  alignItems="center">
                  <GridItem xs={12} sm={12} md={5}>
                  <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.labelRoot}> Select Document</InputLabel>
                  <Select
                   name="key"
                   className={classes.input+" "+classes.underline}
                   value={reqData.key}
                   onChange={onChange}
                  >
                     <MenuItem value={''}>SELECT DOCUMENT</MenuItem>
                    {docData.map(item=>{
                        return <MenuItem value={item.key}>{item.name}</MenuItem>
                    })}
                     
                  </Select>
               </FormControl>
              </GridItem>
                              <GridItem xs={12} sm={12} md={5}>
                                  <CustomInput
                                      labelText="Student UID"
                                      formControlProps={{
                                          fullWidth: true
                                      }}
                                      onChange={onChange}
                                      inputProps={{
                                          name: 'uid',
                                          value:reqData.uid
                                      }}

                                  />
                              </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                
                    <Button color="success" round disabled={sendingData} onClick={()=>{
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
           anchorOrigin={{horizontal:'left',vertical:'bottom'}}
            open={success}
            autoHideDuration={4000}
            onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success">
              File Download completed
        </Alert>
          </Snackbar>
          <Snackbar
           anchorOrigin={{horizontal:'left',vertical:'bottom'}}
            open={err}
            autoHideDuration={4000}
            onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error">
              {errMsg}
        </Alert>
          </Snackbar>
    </div>
  );
}
