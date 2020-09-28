import React from "react";
import {Redirect} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Core Components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";



import {BaseUrl} from "variables/BaseUrl";
import styles from "assets/jss/material-kit-react/modalStyle";


const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = "Transition";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
export default function ChangePasswordModal({
  open,
  setOpen
  }){
const classes=useStyles();

const [isError,setIsError]=React.useState(false);
const [errMsg,setErrMsg]=React.useState('');

const [uid,setUid]=React.useState('');
const [sendingData,setSendingData]=React.useState(false)



React.useEffect(()=>{
if(sendingData===true){
  
  try{
    const fetchData= async ()=>{
      const result= await fetch(`${BaseUrl}/api/auth/reset?uid=${uid}`) ;
      const res = await result.json();
      if(res.err===false&& result.status===201){     
      alert('mail sent');        
  }
  else if(res.err===true){
      setIsError(true);
      setErrMsg(res.msg);
  }
}
    fetchData();
    setSendingData(false)
    
  }catch(err){
      console.log(err);
    }}
   
  });
 
  function onChange(e){
    const {value } = e.target;
    setUid(value); 
 }
 


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
                    <h3 className={classes.modalTitle}><strong>Reset Password</strong></h3>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                <GridContainer  justify="center" alignItems='center' >
                  <GridItem xs={12} sm={12} md={8}>
                    <GridContainer direction="column"  >
                      <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="User ID"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{
                                      value:uid,
                                        name: 'uid',
                                        
                                    }}

                                />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        On submitting userID you will get a reset link in your Bits-mail.
                      </GridItem>
                

                  
                  </GridContainer>
                 </GridItem>
              </GridContainer>

                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                   
                  <Button
                      onClick={() => setSendingData(true)}
                      color="success"
                      solid="true"
                      round
                    >
                     Confirm
                  </Button>
                    <Button
                      onClick={() => {
                          setOpen(false);
                          setUid('');
                        }}
                      color="danger"
                      solid="true"
                      round
                    >
                      Close
                    </Button>
                  </DialogActions>
                  <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        open={isError}
        autoHideDuration={5000}
        onClose={() => { setIsError(false) }}>
        <Alert
          onClose={() => { setIsError(false) }}
          severity="error">
         {errMsg} 
                  </Alert>
      </Snackbar>
                </Dialog>
    );
}