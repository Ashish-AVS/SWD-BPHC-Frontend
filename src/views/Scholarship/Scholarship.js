import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/EditedTabs1";
import {BaseUrl} from "variables/BaseUrl";
//Created components
import SAF from "./SAF";
import MCN from "./MCN";
const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    paddingLeft: "35%",
    marginBottom: "40px",
    position: "relative"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
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
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(styles);

export default function Scholarship() {
  const classes = useStyles();
  const token=JSON.parse(localStorage.getItem('tokens'));
  const [status,setStatus]=React.useState(0);
  const [portalOn,setPortalOn]=React.useState(false);
  const [success,setSuccess]=React.useState(false);
  const [err,setErr]=React.useState(false);
  const [errMsg,setErrMsg]=React.useState('');
  React.useEffect(()=>{
    if(status===0){
      try{
       
        const SendData=async ()=>{
          const result =await fetch(`${BaseUrl}/api/mcn/portal`,{
            headers:{Authorization: token}
          })
          const res=await result.json();
          if (result.status===200||result.status===304) {
            setPortalOn(true);
          }
          else if (result.status === 404) {
           setErr(true);
           setErrMsg('MCN Portal is not open');
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
     }
    
    },[])
  




  return (
      <div>
          <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note}>
          <h4>Scholarships offered at BITS</h4>
      </div>
   
  
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            setStatus={setStatus}
            title="Scholarships:"
            headerColor="success"
            tabs={[
              {
                tabName: "MCN",                
                tabContent: (
                 <MCN portalOn={portalOn}/>
                )
              },
              {
                tabName: "SAF",              
                tabContent: (
                  <SAF/>
                )
              }
            ]}
          />
        </GridItem>
        </GridContainer>
        <Snackbar
           anchorOrigin={{horizontal:'left',vertical:'bottom'}}
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
           anchorOrigin={{horizontal:'left',vertical:'bottom'}}
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
