import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import CircularProgress from '@material-ui/core/CircularProgress';

//Core Components
import Button from "components/CustomButtons/Button.js";

import {BaseUrl} from "variables/BaseUrl";

import styles from "assets/jss/material-kit-react/modalStyle";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function CancelModal({
    open, 
    setOpen,
    setUpdated,
    setSuccess,
    setErr,
    setErrMsg,
    setSuccessMsg,
    setAppln
   }){
const classes=useStyles();


const token=JSON.parse(localStorage.getItem("tokens"));

const [loading,setLoading]=React.useState(false);
const [sendingData,setSendingData]=React.useState(false);


React.useEffect(()=>{
  if(sendingData===true){
    try{
    const sendData=async ()=>{
      setLoading(true);  
      const result= await fetch(`${BaseUrl}/api/mcn/delete`,{
        method:'post',
        headers:{'Content-Type':"application/json",
          Authorization:token
        }
       
      })    
      const res = await result.json();
      if(res.err===false){     
      
      setSuccess(true);
      setSuccessMsg(res.msg);
      setLoading(false);
      setUpdated(res.msg);
      setOpen(false);
      setAppln(false);
        
       }
       else if(res.err===false){
           setErr(true);
           setErrMsg(res.msg);
       }
      }
    sendData();
    //console.log(totalQty);
   
    setSendingData(false);  
    }
    catch(err){
      console.log(err);
    }
  }
},[sendingData,token])

    

    return(
        <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  
                  fullWidth={true}
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setOpen(false)}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                    <IconButton
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={() => setOpen(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h3 className={classes.modalTitle}><strong>Cancel Order</strong></h3>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <div>
                        <h4>Are you sure you want to remove your MCN Application?</h4>
                    
                    </div>
                  
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                  {loading?<CircularProgress size={24} />:null}
                  <Button
                      onClick={() => setSendingData(true)}
                      color="info"
                      solid="true"
                      round
                      disabled={loading}
                    >
                      Yes 
                    </Button>
                    
                    <Button
                      onClick={() => setOpen(false)}
                      color="danger"
                      solid="true"
                      round
                    >
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
    );
}