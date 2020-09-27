import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Core Components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import CustomInput from "components/CustomInput/CustomInput";


import {BaseUrl} from "variables/BaseUrl";
import styles from "assets/jss/material-kit-react/modalStyle";


const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

Transition.displayName = "Transition";
export default function GraceModal({open,setOpen}){
const classes=useStyles();
const {uid}=JSON.parse(localStorage.getItem("data"));
const [success,setSuccess]=React.useState(false);
const [err,setErr]= React.useState(false);
const [errMsg,setErrMsg]=React.useState('');
const token=JSON.parse(localStorage.getItem("tokens"));
const [mcnData,setMcnData]=React.useState({});
const [sendingData,setSendingData]=React.useState(false)


const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setErr(false);
  setSuccess(false);
};


React.useEffect(()=>{
if(sendingData===true){
    try{
    const fetchData= async ()=>{
      const result= await fetch(`${BaseUrl}/api/mcn`,{
        method:'post',
        headers:{
          Authorization:token
        },
        body:JSON.stringify({
            uid:uid,
            fsalary:mcnData.fsalary,
            fcertificate:mcnData.fcertificate,
            msalary:mcnData.msalary,
            mcertificate:mcnData.mcertificate,
            categ:mcnData.categ
          })
      }) ;
      const res = await result.json();
      if(res.err===false){     
      setSuccess(true)
  }
  else if(res.err===true){
      setErr(true);
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
    const { name, value } = e.target;
    setMcnData(prevState=>({
         ...prevState,
         [name]: value
     }));
     
 }


    return(
        <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  maxWidth="md"
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
                    <h3 className={classes.modalTitle}><strong>MCN APPLICATION</strong></h3>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer >
                    <GridItem xs={12} sm={12} md={5}>
         <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.labelRoot}>Father's Income Certificate</InputLabel>
                  <Select
                   name="fcertificate"
                   className={classes.input+" "+classes.underline}
                   onChange={onChange}
                  >
                     <MenuItem value={''}>SELECT DATE</MenuItem>
                     <MenuItem value={'ITR-V'}>ITR-V</MenuItem>
                     <MenuItem value={'DOC-2'}>DOC-2</MenuItem>
                     <MenuItem value={'DOC-3'}>DOC-3</MenuItem>
                     
                  </Select>
               </FormControl>
                </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText="Fathers Income"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{
                                        type: "number",
                                        name: 'fsalary',
                                        defaultValue: 0
                                    }}

                                />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
         <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.labelRoot}>Mother's Income Certificate</InputLabel>
                  <Select
                   name="mcertificate"
                   className={classes.input+" "+classes.underline}
                   onChange={onChange}
                  >
                     <MenuItem value={''}>SELECT DATE</MenuItem>
                     <MenuItem value={'ITR-V'}>ITR-V</MenuItem>
                     <MenuItem value={'DOC-2'}>DOC-2</MenuItem>
                     <MenuItem value={'DOC-3'}>DOC-3</MenuItem>
                     
                  </Select>
               </FormControl>
                </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText="Mothers Income"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{
                                        type: "number",
                                        name: 'msalary',
                                        defaultValue: 0
                                    }}

                                />
                      </GridItem>
                            <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText="Category"                                 

                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                         name: 'categ'
                                    }}
                                    onChange={onChange}
                                />
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
                      Submit
                  </Button>
                    <Button
                      onClick={() => setOpen(false)}
                      color="danger"
                      solid="true"
                      round
                    >
                      Close
                    </Button>
                  </DialogActions>
                  <Snackbar
           anchorOrigin={{horizontal:'center',vertical:'top'}}
            open={success}
            autoHideDuration={4000}
            onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success">
              Application Submitted
        </Alert>
          </Snackbar>
          <Snackbar
           anchorOrigin={{horizontal:'center',vertical:'top'}}
            open={err}
            autoHideDuration={4000}
            onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error">
              {errMsg}
        </Alert>
          </Snackbar>
                </Dialog>
    );
}