import React from "react";
import MaterialTable from "material-table";
import {Redirect} from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Auth Components
import { useAuth } from "context/auth";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {BaseUrl} from "variables/BaseUrl";
import {
  primaryColor,
  defaultFont
} from "assets/jss/material-kit-react.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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

export default function Search() {

 const token=JSON.parse(localStorage.getItem("officialtokens"));
 
  //const [sendingData,setSendingData]=React.useState(false);
  const [messMenuData,setMessMenuData]=React.useState([]);
  const [messUpdate,setMessUpdate]=React.useState(false);
  const [menuUpdated,setMenuUpdated]=React.useState(false);
  const [recievedData,setRecievedData]=React.useState(false)
  const { onOfficialLogin } = useAuth();
  const [err,setErr]=React.useState(false);
  const [errMsg,setErrMsg]=React.useState('');
  const classes = useStyles();
  const [success,setSuccess]=React.useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErr(false);
    setSuccess(false);
  };
  
 
  React.useEffect(()=>{
  
    try{
      const fetchData=async ()=>{
        const result =await fetch(`${BaseUrl}/api/o/messmenu?messno=1`,{
          headers:{Authorization:`Bearer ${token}`}
        })
         const res = await result.json();
        if(result.status===200||result.status===201){
         
          setMessMenuData(res.data);
          setRecievedData(true);
          //setSendingData(false);
        }
       else if(result.status===401)
       logout()
    }
      fetchData();      
    }
    catch(err){
      console.log(err);
     
    } 
  
  },[token,menuUpdated])

  React.useEffect(()=>{
   if(messUpdate===true){
    try{
      const sendData=async ()=>{
        const result =await fetch(`${BaseUrl}/api/o/messmenu`,{
            method:"post",
            headers:{'Content-Type':"application/json",
            Authorization:`Bearer ${token}`},
            body:JSON.stringify({
              messno:1,
              menu:JSON.stringify(messMenuData)
            })
           })
         const res = await result.json();
        if(res.err===false){
          setSuccess(true);  
          setMenuUpdated(true);
          setMessUpdate(false);
        }
        else if(res.err===true && result.status===401){
              logout();
        }
        else if(res.err===true){
          setErr(true);
          setErrMsg(res.msg);
        }
      
    }
      sendData();
      
    }
    catch(err){
      console.log(err);
      
    } 
  }
  },[messUpdate,token,messMenuData])
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
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>MESS OPERATIONS </b></h4>
              
            </CardHeader>
            <CardBody>
            <h5 style={{display:"flex",justifyContent:"center"}}><b>MESS MENU CHANGE</b></h5>
            
              <GridContainer spacing={4} >
                  <GridItem xs={12} sm={12} md={12}>
              {recievedData?<MaterialTable
                  title="MESS MENU"
                  columns={[
                    {title:"Day",field:"day",editable:"never"},
                    {title:"Breakfast",field:"breakfast"},
                    {title:"Lunch",field:"lunch"},
                    {title:"Snacks",field:"snacks"},
                    {title:"Dinner",field:"dinner"}]}
                  data={messMenuData}
                  options={{
                    search:false,
                    paging:false,
                    pageSizeOptions:[7],
                    pageSize:7,
                    emptyRowsWhenPaging:false
                  }}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataUpdate = [...messMenuData];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setMessMenuData([...dataUpdate]);
          
                        resolve();
                      }, 1000)
                    }),
                  }}
                  />
              :<h5>Loading Menu...</h5>}  
              </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                <GridContainer direction="row"  justify="center"  alignItems="center" >
                  <GridItem>
                    <Button 
                    color="success" 
                    onClick={()=>{                     
                      setMessUpdate(true)
                      }}>
                      Submit
                    </Button>
                  </GridItem>
                </GridContainer>
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
              Task Completed SuccessFully
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
