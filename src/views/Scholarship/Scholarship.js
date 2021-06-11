import React from "react";
import {saveAs} from 'file-saver';
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
import Badge from "components/Badge/Badge.js";

import {BaseUrl} from "variables/BaseUrl";

//Created components
import SAFContent from "./SAF/SAF";
import MCNContent from "./MCN/MCN";

import MCNApplyModal from './MCN/MCNApplyModal';
import MCNEditModal from './MCN/EditModal';
import MCNDeleteModal from './MCN/DeleteModal';


import SAFApplyModal from './SAF/SAFApplyModal';
import SAFEditModal from './SAF/EditModal';
import SAFDeleteModal from './SAF/DeleteModal';

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
  const {uid}=JSON.parse(localStorage.getItem('data'));
  const [status,setStatus]=React.useState(0);
 
  const [updated,setUpdated]=React.useState(false);

  const [mcnPortalOn,setMcnPortalOn]=React.useState(false);
  const [mcnAppln,setMcnAppln]=React.useState(false);
  const [mcnApplnData,setMcnApplnData]=React.useState({});
  const [openMcnApply,setOpenMcnApply]=React.useState(false)
  const [openMcnEdit,setOpenMcnEdit]=React.useState(false);
  const [openMcnDelete,setOpenMcnDelete]=React.useState(false);
  const [recievedMcnData,setRecievedMcnData]=React.useState(false);

  const [downloading,setDownloading]=React.useState(false)
  const [safPortalOn,setSafPortalOn]=React.useState(false);
  const [safAppln,setSafAppln]=React.useState(false);
  const [safApplnData,setSafApplnData]=React.useState({});
  const [openSafApply,setOpenSafApply]=React.useState(false)
  const [openSafEdit,setOpenSafEdit]=React.useState(false);
  const [openSafDelete,setOpenSafDelete]=React.useState(false);
  const [recievedSafData,setRecievedSafData]=React.useState(false);

  const [success,setSuccess]=React.useState(false);
  const [err,setErr]=React.useState(false);
  const [errMsg,setErrMsg]=React.useState('');
  const [successMsg,setSuccessMsg]=React.useState('');
 
  React.useEffect(()=>{
    if(status===0){
      //*********  MCN API CALL ****************//
      try{
        const SendData=async ()=>{
          const result =await fetch(`${BaseUrl}/api/mcn/portal`,{
            headers:{Authorization: token}
          })
          const res=await result.json();
          if (result.status===200||result.status===304) {
            setMcnPortalOn(true);
          }
          else if (result.status === 404||result.status === 400) {
           setErr(true);
           setMcnPortalOn(false);
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
               
              setMcnApplnData(res.data);
              setMcnAppln(true);
              
              
            }
            else if (result.status === 404||result.status === 400) {
              setMcnAppln(false);
              //console.log("hii")
            }
            else if (res.err === true) {
              setErr(true);
              setErrMsg(res.msg);
            }}
        SendData();
        SendData1();
        setRecievedMcnData(true)
      }
      catch(err){
        console.log(err);
      }
     }
     else if(status===1){
      //********** SAF API CALL *****************//
      try{
        const SendData=async ()=>{
          const result =await fetch(`${BaseUrl}/api/saf/portal`,{
            headers:{Authorization: token}
          })
          const res=await result.json();
          if (result.status===200||result.status===304) {
            setSafPortalOn(true);
          }
          else if (result.status === 404||result.status === 400) {
           setErr(true);
           setSafPortalOn(false);
           setErrMsg('MCN Portal is not open');
          }
          else if (res.err === true) {
            setErr(true);
            setErrMsg(res.msg);
          }}
          const SendData1=async ()=>{
            const result =await fetch(`${BaseUrl}/api/saf/get`,{
              headers:{Authorization: token}
            })
            const res=await result.json();
              if (result.status === 200 || result.status === 201 || result.status === 304) {
                setSafApplnData(res.data);
                setSafAppln(true);
              }
            else if (result.status === 404||result.status === 400) {
              setSafAppln(false);
              //console.log("hii")
            }
            else if (res.err === true) {
              setErr(true);
              setErrMsg(res.msg);
            }}
        SendData();
        SendData1();
        setRecievedSafData(true)
      }
      catch(err){
        console.log(err);
        
      }
     }
    
    },[updated,status])
  

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
                {recievedMcnData? 
                <Card>
                <MCNContent />
                <CardFooter style={{display:'flex',justifyContent:'center'}}>
                {!mcnAppln?
                <Button 
                  round 
                  color="info" 
                  disabled={!mcnPortalOn} 
                  onClick={()=>{
                      setOpenMcnApply(true)
                  }} >
                      Apply For MCN
                 </Button>:
                 <GridContainer spacing={4} direction="column" justify="center" alignItems="center">
                  <GridItem xs={12} sm ={12} md={12} style={{marginBottom:"50px"}}>
                     <Button 
                    round 
                    color="primary" 
                    disabled={!mcnPortalOn||downloading} 
                    onClick={async ()=>{
                      setDownloading(true)
                      try{
                       const result=await fetch(`${BaseUrl}/api/mcn/generate_pdf`,{
                          headers:{Authorization: token}
                        })
                        if (result.status===200||result.status===201) {
                          const res = await result.blob();   
                          const pdfBlob=new Blob([res],{type:'application/pdf'});
                          saveAs(pdfBlob,`MCN Application Form`);
                          setSuccessMsg('Application downloaded successfully')  
                          setSuccess(true); 
                          setDownloading(false);
                        }
                        else{
                          setErrMsg("Couldn't download the application")
                          setErr(true)
                          setDownloading(false);
                        }
                      }catch(err){
                        setErrMsg("Couldn't download the application")
                        setErr(true)
                        setDownloading(false);
                      }    
                    }} >
                        Download Application Form 
                   </Button>
                      </GridItem>
                   <GridItem xs={12} sm ={12} md={12} >
                  <b>Status of Application-</b>&nbsp;&nbsp;&nbsp;&nbsp;{mcnApplnData.status===-1?<Badge color="danger">Rejected</Badge>:mcnApplnData.status===1?<Badge color="success">Accepted</Badge>:mcnApplnData.status===0 && mcnApplnData.updated===0?<Badge color="info">Remarked</Badge>:<Badge color="warning">Under Review</Badge>}
                    </GridItem>
                   <GridItem xs={12} sm ={12} md={12} >
                  <TextField
                        id="outlined-multiline-static"
                        label="Remarks"
                        multiline
                        rows={4}
                        defaultValue={mcnApplnData.remark}
                        variant="outlined"
                        style={{marginTop:'20px',marginBottom:"30px"}}
                        inputProps={{
                          readOnly:true
                        }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm ={12} md={12}>
                  <Button 
                  round 
                  color="rose" 
                  disabled={!mcnPortalOn} 
                  onClick={()=>{setOpenMcnEdit(true)}}
                  style={{marginRight:'10px'}}
                  >
                      Review/Edit Application
                 </Button>
                
                 <Button 
                  round 
                  color="danger" 
                  disabled={!mcnPortalOn}
                  onClick={()=>{setOpenMcnDelete(true)}}
                  
                   >
                        Remove Application
                 </Button>
                 </GridItem>
                 </GridContainer>}
              </CardFooter>
              <br/>
              <center>
              To stay up to date with your application and to receive notifications on changes in your application status, 
              download the SWD Android app from the Google Play Store. <br/>
              <a href="https://play.google.com/store/apps/details?id=in.ac.bits_hyderabad.swd.swd&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1" 
              style={{
                paddingTop: '5px', 
                paddingBottom: '5px', 
                paddingLeft: '5px', 
                paddingRight: '5px', 
                display: 'inline', 
                color: '#0068a5', 
                fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif', 
                fontSize: '14px', 
                textDecoration: 'none'
                }}>
              <img alt="Get it on Google Play" style={{width: '13%'}} src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" />
              </a>
              </center>
         <MCNApplyModal 
         open={openMcnApply} 
         setOpen={setOpenMcnApply} 
         setUpdated={setUpdated}
         setSuccess={setSuccess}
         setErr={setErr}
         setErrMsg={setErrMsg}
         setSuccessMsg={setSuccessMsg}
         />
         <MCNEditModal 
         open={openMcnEdit} 
         setOpen={setOpenMcnEdit} 
         data={mcnApplnData}
         setUpdated={setUpdated}
         setSuccess={setSuccess}
         setErr={setErr}
         setErrMsg={setErrMsg}
         setSuccessMsg={setSuccessMsg}
          />
         
         <MCNDeleteModal  
         open={openMcnDelete} 
         setOpen={setOpenMcnDelete} 
         setUpdated={setUpdated}
         setSuccess={setSuccess}
         setErr={setErr}
         setAppln={setMcnAppln}
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
                  <div>
                  {recievedSafData? 
                  <Card>
                  <SAFContent />
                  <CardFooter style={{display:'flex',justifyContent:'center'}}>
                  {!safAppln?
                  <Button 
                    round 
                    color="info" 
                    disabled={!safPortalOn} 
                    onClick={()=>{
                        setOpenSafApply(true)
                    }} >
                        Apply For SAF
                   </Button>:
                   <GridContainer spacing={4} direction="column" justify="center" alignItems="center">
                     <GridItem xs={12} sm ={12} md={12} style={{marginBottom:"50px"}}>
                     <Button 
                    round 
                    color="info" 
                    disabled={!safPortalOn||downloading} 
                    onClick={async ()=>{
                      setDownloading(true)
                      try{
                       const result=await fetch(`${BaseUrl}/api/saf/generate_pdf`,{
                          headers:{Authorization: token}
                        })
                        if (result.status===200||result.status===201) {
                          const res = await result.blob();   
                          const pdfBlob=new Blob([res],{type:'application/pdf'});
                          saveAs(pdfBlob,`SAF Application Form`);
                          setSuccessMsg('Application downloaded successfully')  
                          setSuccess(true); 
                          setDownloading(false);
                        }
                        else{
                          setErrMsg("Couldn't download the application")
                          setErr(true)
                          setDownloading(false);
                        }
                      }catch(err){
                        setErrMsg("Couldn't download the application")
                        setErr(true)
                        setDownloading(false);
                      }    
                    }} >
                        Download Application Form 
                   </Button>
                      </GridItem>
                     <GridItem xs={12} sm ={12} md={12} >
                    <b>Status of Application-</b>&nbsp;&nbsp;&nbsp;&nbsp;{safApplnData.status===-1?<Badge color="danger">Rejected</Badge>:safApplnData.status===1?<Badge color="success">Accepted</Badge>:safApplnData.status===0 && safApplnData.updated===0?<Badge color="info">Remarked</Badge>:<Badge color="warning">Under Review</Badge>}
                      </GridItem>
                     <GridItem xs={12} sm ={12} md={12} >
                    <TextField
                          id="outlined-multiline-static"
                          label="Remarks"
                          multiline
                          rows={4}
                          defaultValue={safApplnData.remark}
                          variant="outlined"
                          style={{marginTop:'20px',marginBottom:"30px"}}
                          inputProps={{
                            readOnly:true
                          }}
                      />
                      </GridItem>
                      <GridItem xs={12} sm ={12} md={12}>
                    <Button 
                    round 
                    color="rose" 
                    disabled={!safPortalOn} 
                    onClick={()=>{setOpenSafEdit(true)}}
                    style={{marginRight:'10px'}}
                    >
                        Review/Edit Application
                   </Button>
                   <Button 
                    round 
                    color="danger" 
                    disabled={!safPortalOn}
                    onClick={()=>{setOpenSafDelete(true)}}
                    
                     >
                          Remove Application
                   </Button>
                   </GridItem>
                   </GridContainer>}
                </CardFooter>
           <SAFApplyModal 
           open={openSafApply} 
           setOpen={setOpenSafApply} 
           setUpdated={setUpdated}
           setSuccess={setSuccess}
           setErr={setErr}
           setErrMsg={setErrMsg}
           setSuccessMsg={setSuccessMsg}
           />
           <SAFEditModal 
           open={openSafEdit} 
           setOpen={setOpenSafEdit} 
           data={safApplnData}
           setUpdated={setUpdated}
           setSuccess={setSuccess}
           setErr={setErr}
           setErrMsg={setErrMsg}
           setSuccessMsg={setSuccessMsg}
            />
           
           <SAFDeleteModal  
           open={openSafDelete} 
           setOpen={setOpenSafDelete} 
           setUpdated={setUpdated}
           setSuccess={setSuccess}
           setErr={setErr}
           setAppln={setSafAppln}
           setErrMsg={setErrMsg}
           setSuccessMsg={setSuccessMsg}/>
                 </Card>:
                  null}
                  </div>
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
