import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/EditedTabs1";
import Button from "components/CustomButtons/Button.js";
import MCNApplyModal from './MCNApplyModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
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
  const [successMsg,setSuccessMsg]=React.useState('');
  const [appln,setAppln]=React.useState(false);
  const [applnData,setApplnData]=React.useState({});
  const [recievedData,setRecievedData]=React.useState(false);
  const [updated,setUpdated]=React.useState(false);
  const [openApply,setOpenApply]=React.useState(false)
  const [openEdit,setOpenEdit]=React.useState(false);
  const [openDelete,setOpenDelete]=React.useState(false);
  React.useEffect(()=>{
    if(status===0 ||recievedData===true){
      
      try{
       
        const SendData=async ()=>{
          const result =await fetch(`${BaseUrl}/api/mcn/portal`,{
            headers:{Authorization: token}
          })
          const res=await result.json();
          if (result.status===200||result.status===304) {
            setPortalOn(true);
          }
          else if (result.status === 404||result.status === 400) {
           setErr(true);
           setPortalOn(false);
           setErrMsg('MCN Portal is not open');
          }
          else if (res.err === true) {
            setErr(true);
            setErrMsg(res.msg);
          }}
          const SendData1=async ()=>{
            const result =await fetch(`${BaseUrl}/api/mcn/get`,{
              headers:{Authorization: token}
            })
            const res=await result.json();
            if (result.status===200||result.status===201||result.status===304) {
              console.log(res.data.upload)
              setApplnData(res.data);
              setAppln(true);
              
              
            }
            else if (result.status === 404||result.status === 400) {
              setAppln(false);
              //console.log("hii")
            }
            else if (res.err === true) {
              setErr(true);
              setErrMsg(res.msg);
            }}
        SendData();
        SendData1();
        setRecievedData(true)
      }
      catch(err){
        console.log('hi');
        
      }
     }
    
    },[updated])
  



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
                  <div>
                {recievedData? 
                <Card>
                <MCN />
                <CardFooter style={{display:'flex',justifyContent:'center'}}>
                {!appln?
                <Button 
                  round 
                  color="info" 
                  disabled={!portalOn} 
                  onClick={()=>{
                      setOpenApply(true)
                  }} >
                      Apply For MCN
                 </Button>:
                 <GridContainer spacing={4} direction="column" justifyContent="center" alignItems="center">
                   <GridItem xs={12} sm ={12} md={12} >
                  <TextField
                        id="outlined-multiline-static"
                        label="Remarks"
                        multiline
                        rows={4}
                        defaultValue={applnData.remark}
                        variant="outlined"
                        style={{marginTop:'20px'}}
                        inputProps={{
                          readOnly:true
                        }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm ={12} md={12}>
                  <Button 
                  round 
                  color="rose" 
                  disabled={!portalOn} 
                  onClick={()=>{setOpenEdit(true)}}
                   >
                      Review/Edit Application
                 </Button>
                 <Button 
                  round 
                  color="danger" 
                  disabled={!portalOn} 
                  onClick={()=>{setOpenDelete(true)}}
                   >
                        Remove Application
                 </Button>
                 </GridItem>
                 </GridContainer>}
              </CardFooter>
         <MCNApplyModal 
         open={openApply} 
         setOpen={setOpenApply} 
         setUpdated={setUpdated}
         setSuccess={setSuccess}
         setErr={setErr}
         setErrMsg={setErrMsg}
         setSuccessMsg={setSuccessMsg}
         />
         <EditModal 
         open={openEdit} 
         setOpen={setOpenEdit} 
         data={applnData}
         setUpdated={setUpdated}
         setSuccess={setSuccess}
         setErr={setErr}
         setErrMsg={setErrMsg}
         setSuccessMsg={setSuccessMsg}
          />
         
         <DeleteModal  
         open={openDelete} 
         setOpen={setOpenDelete} 
         setUpdated={setUpdated}
         setSuccess={setSuccess}
         setErr={setErr}
         setAppln={setAppln}
         setErrMsg={setErrMsg}
         setSuccessMsg={setSuccessMsg}/>
               </Card>:
                null}
                </div>
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
           anchorOrigin={{horizontal:'right',vertical:'bottom'}}
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
              {successMsg}
        </Alert>
          </Snackbar>
          <Snackbar
           anchorOrigin={{horizontal:'right',vertical:'bottom'}}
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
