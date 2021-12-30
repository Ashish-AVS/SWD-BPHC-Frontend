import React from "react";
import Datetime from "react-datetime";
import {saveAs} from 'file-saver';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import VisibilityIcon from '@material-ui/icons/Visibility';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import SearchResult from "./StudentSearchResult";
// import DatabaseExport from "./DatabaseExport";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
  primaryColor,
  defaultFont
} from "assets/jss/material-kit-react.js";
import { Details } from "@material-ui/icons";
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

export default function Search() {
  const [open,setOpen]=React.useState(false)
  const token=JSON.parse(localStorage.getItem("officialtokens"));
  const [criteria,setCriteria]=React.useState({
    criteria_1:'name',
    criteria_2:'',
    value_1:'',
    value_2:''
  })
  const [sendingData,setSendingData]=React.useState(false);
  const [data,setData]=React.useState([]);
  const [recievedData,setRecievedData]=React.useState(false);
  const [recievedDetailsData,setRecievedDetailsData]=React.useState(false);
  const [detailsData,setDetailsData]=React.useState({})
  const [detailsReq,setDetailsReq]=React.useState(false);
  const [uid,setUid]=React.useState();
  const [sendingData1,setSendingData1]=React.useState();
  const classes = useStyles();
  const [success, setSuccess] = React.useState(false);
  const [err,setErr]=React.useState(false);
  const [errMsg,setErrMsg]=React.useState('');
  const [batch, setBatch] = React.useState(null);
  var today = Datetime.moment();
  var valid = function( current ){
    return current.isBefore( today );
  };
 // let value1=<></>
 const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setSuccess(false);
};

  function onChange(e){
    const { name, value } = e.target;
    setCriteria(prevState=>({
         ...prevState,
         [name]: value
     }));
  }
  function onCrit1Change(e){
    const { name, value } = e.target;
    setCriteria(prevState=>({
         ...prevState,
         [name]: value,
         value_1:''
     }));
  }
  function onCrit2Change(e){
    const { name, value } = e.target;
    setCriteria(prevState=>({
         ...prevState,
         [name]: value,
         value_2:''
     }));
  }

  React.useEffect(()=>{
  if(sendingData===true){
    setRecievedData(false);
    try{
      const sendData=async ()=>{
        const result =await fetch(`${BaseUrl}/api/o/search`,{
          method:"post",
          headers:{
            'Content-Type':"application/json",
             Authorization:`Bearer ${token}`
            },
          body:JSON.stringify({
            criteria_1:criteria.criteria_1,
            value_1:criteria.value_1,
            criteria_2:criteria.criteria_2,
            value_2:criteria.value_2,
          })
         })
         const res = await result.json();
        if(result.status===200||result.status===201){
          setSendingData(false);
          setData(res.data);
          setRecievedData(true);
        }
       
      }
      sendData();
    }
    catch(err){
      console.log(err);
    } 
  } 
  },[sendingData, criteria.criteria_1, criteria.value_1, criteria.criteria_2, criteria.value_2, token])
  React.useEffect(()=>{
    if(detailsReq===true){
      try{
        const sendData=async ()=>{
          const result =await fetch(`${BaseUrl}/api/o/search/plink?uid=${uid}`,{
            headers:{
              'Content-Type':"application/json",
               Authorization:`Bearer ${token}`
              }
           })
           const res = await result.json();
          if(result.status===200||result.status===201){
           window.open(res.data.link)
            setRecievedDetailsData(true)
            setDetailsReq(false);
          }
         
        }
        sendData();
        
      }
      catch(err){
        console.log(err);
      } 
    }
  },[detailsReq,uid,token])


  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>BITS PILANI , HYDERABAD CAMPUS</strong></h2>
      </div>
      <GridContainer justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>STUDENT DETAIL FINDER</b></h4>
              
            </CardHeader>
            <CardBody>
            <h5 style={{display:"flex",justifyContent:"center"}}><b>MENTION ABOUT STUDENT</b></h5>
            <p style={{display:"flex",justifyContent:"center"}}>
                Below listed are two criteria on the basis of which you can find the student.By default the first criteria
                is "Name" which you can change by chosing the one from the available list list. If required you can use the second criteria but
                it is not compulsory and its default value is NIL.  
               </p>
              <GridContainer spacing={4} justify="center" alignItems="center" >
                <GridItem xs={12} sm={12} md={5}>   
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.labelRoot}>Criteria-1</InputLabel>
                  <Select
                   name="criteria_1"
                   className={classes.input+" "+classes.underline}
                   defaultValue={'name'}
                   value={criteria.criteria_1}
                   onChange={onCrit1Change}
                  >
                     <MenuItem value={'name'}>Name</MenuItem>
                     <MenuItem value={'id'}>ID</MenuItem>
                     <MenuItem value={'uid'}>User ID</MenuItem>
                     <MenuItem value={'room'}>Room No.</MenuItem>
                     {/* <MenuItem value={'gender'}>Gender</MenuItem>
                     <MenuItem value={'dob'}>Date Of Birth</MenuItem>
                     <MenuItem value={'city'}>City</MenuItem>
                     <MenuItem value={'state'}>State</MenuItem>
                     <MenuItem value={'blood'}>Blood Group</MenuItem>
                     <MenuItem value={'nation'}>Nationality</MenuItem> */}
                  </Select>
               </FormControl>  
                  
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                {criteria.criteria_1==='dob'? 
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.label}>
                    Birth-Date
                  </InputLabel>
                  <Datetime
                   dateFormat="DD-MM-YYYY" 
                   timeFormat={false}
                   className={classes.input+" "+classes.underline}
                   isValidDate={valid}
                   onChange={(e)=>{
                    const date = new Date(`${e}`);
                    const {Date1,Month,Year}={
                      Date1:date.getDate(),
                      Month:date.getMonth()+1,
                      Year:date.getFullYear()
                      }
                    if(Month>9)
                      setCriteria(prevState=>({
                         ...prevState,
                        value_1:`${Year}-${Month}-${Date1}`
                         }));
                    else
                      setCriteria(prevState=>({
                          ...prevState,
                          value_1:`${Year}-0${Month}-${Date1}`
                         }));  
                     }}
                    />
                </FormControl>
                     :
                criteria.criteria_1==='gender'?
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.labelRoot}>Gender</InputLabel>
                  <Select
                    name="value_1"
                    className={classes.input+" "+classes.underline}
                    onChange={onChange}
                    defaultValue={''}
                    >
                       <MenuItem value={''}>Select</MenuItem>
                       <MenuItem value={'M'}>Male</MenuItem>
                       <MenuItem value={'F'}>Female</MenuItem>
                       <MenuItem value={'O'}>Others</MenuItem>
                  </Select>
                </FormControl>
                     :
                criteria.criteria_1==='blood'?
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.labelRoot}>Blood Group</InputLabel>
                  <Select
                    name="value_1"
                    className={classes.input+" "+classes.underline}
                    value={'A+'}
                    onChange={onChange}
                    >
                      <MenuItem value={'A+'}>A+</MenuItem>
                      <MenuItem value={'A-'}>A-</MenuItem>
                      <MenuItem value={'B+'}>B+</MenuItem>
                      <MenuItem value={'B-'}>B-</MenuItem>
                      <MenuItem value={'AB+'}>AB+</MenuItem>
                      <MenuItem value={'AB-'}>AB-</MenuItem>
                      <MenuItem value={'O+'}>O+</MenuItem>
                      <MenuItem value={'O-'}>O-</MenuItem>
                  </Select>
               </FormControl>
                   :
                <CustomInput
                  labelText="Value"
                  onChange={onChange}
                  formControlProps={{
                    fullWidth: true
                   }}
                   inputProps={{
                    name:"value_1",
                    value:criteria.value_1
                  }}
                />}
                </GridItem><GridItem xs={12} sm={12} md={5}>   
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.labelRoot}>Criteria-2</InputLabel>
                  <Select
                   name="criteria_2"
                   className={classes.input+" "+classes.underline}
                   onChange={onCrit2Change}
                   value={criteria.criteria_2}
                   defaultValue=''
                  >
                     {/* <MenuItem value={''}>Select</MenuItem> */}
                     <MenuItem value={'name'}>Name</MenuItem>
                     <MenuItem value={'id'}>ID</MenuItem>
                     <MenuItem value={'uid'}>User ID</MenuItem>
                     <MenuItem value={'room'}>Room No.</MenuItem>
                     {/* <MenuItem value={'gender'}>Gender</MenuItem>
                     <MenuItem value={'dob'}>Date Of Birth</MenuItem>
                     <MenuItem value={'city'}>City</MenuItem>
                     <MenuItem value={'state'}>State</MenuItem>
                     <MenuItem value={'blood'}>Blood Group</MenuItem>
                     <MenuItem value={'nation'}>Nationality</MenuItem> */}
                  </Select>
               </FormControl>  
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                {criteria.criteria_2==='dob'? 
                <FormControl fullWidth className={classes.formControl}>
                 <InputLabel className={classes.label}>
                   Birth-Date
                 </InputLabel>
                 <Datetime
                   dateFormat="DD-MM-YYYY" 
                   timeFormat={false}
                   className={classes.input+" "+classes.underline}
                   isValidDate={valid}
                   onChange={(e)=>{
                    const date = new Date(`${e}`);
                    const {Date1,Month,Year}={
                        Date1:date.getDate(),
                        Month:date.getMonth()+1,
                        Year:date.getFullYear()
                    }
                    if(Month>9)
                    setCriteria(prevState=>({
                    ...prevState,
                    value_2:`${Year}-${Month}-${Date1}`
                     }));
                     else
                    setCriteria(prevState=>({
                    ...prevState,
                    value_2:`${Year}-0${Month}-${Date1}`
                      }));  
                    }}
                />
             </FormControl>
                :
             criteria.criteria_2==='gender'?
             <FormControl fullWidth className={classes.formControl}>
               <InputLabel className={classes.labelRoot}>Gender</InputLabel>
               <Select
                name="value_2"
                className={classes.input+" "+classes.underline}
                onChange={onChange}
                defaultValue={''}
                >
                 <MenuItem value={''}>Select</MenuItem>
                 <MenuItem value={'M'}>Male</MenuItem>
                 <MenuItem value={'F'}>Female</MenuItem>
                 <MenuItem value={'O'}>Others</MenuItem>
               </Select>
             </FormControl>
                  :
              criteria.criteria_2==='blood'?
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.labelRoot}>Blood Group</InputLabel>
                 <Select
                   name="value_2"
                   className={classes.input+" "+classes.underline}
                   value={'A+'}
                   onChange={onChange}
                 >
                  <MenuItem value={'A+'}>A+</MenuItem>
                  <MenuItem value={'A-'}>A-</MenuItem>
                  <MenuItem value={'B+'}>B+</MenuItem>
                  <MenuItem value={'B-'}>B-</MenuItem>
                  <MenuItem value={'AB+'}>AB+</MenuItem>
                  <MenuItem value={'AB-'}>AB-</MenuItem>
                  <MenuItem value={'O+'}>O+</MenuItem>
                  <MenuItem value={'O-'}>O-</MenuItem>
                </Select>
              </FormControl>
                 :
              <CustomInput
                labelText="Value"
                onChange={onChange}
                inputProps={{
                  name:"value_2",
                  value:criteria.value_2
                }}
                formControlProps={{
                 fullWidth: true
                }}
               />}
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                <GridContainer direction="row"  justify="center"  alignItems="center" >
                  <GridItem>
                    <Button color="success" onClick={()=>{setSendingData(true)}}>
                      Submit
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Button color="danger" onClick={()=>{
                      setRecievedData(false);
                      setCriteria({
                        criteria_1:'name',
                        criteria_2:'',
                        value_1:'',
                        value_2:''
                      })
                    }}>
                      Discard
                    </Button>
                  </GridItem>
                </GridContainer>
                </GridItem>
                
              </GridContainer>              
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={10}>
          { recievedData ? 
           <SearchResult data={data} setUid={setUid} setDetailsReq={setDetailsReq} /> 
              : null
          }
        </GridItem>
        <GridItem xs={12} sm={12} md={10} >
          {/* <DatabaseExport /> */}
        </GridItem>
      </GridContainer>
    </div>
  );
}
