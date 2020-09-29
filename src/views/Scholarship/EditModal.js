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
export default function EditModal({
    open,
    setOpen,
    data,
    setSuccess,
    setErr,
    setErrMsg,
    setUpdated,
    setSuccessMsg}){
const classes=useStyles();
const {uid}=JSON.parse(localStorage.getItem("data"));
const token=JSON.parse(localStorage.getItem("tokens"));
const [edit,setEdit]=React.useState(false);
const [mcnData,setMcnData]=React.useState({});
const [sendingData,setSendingData]=React.useState(false)
const [recieved,setRecieved]=React.useState(false)

React.useEffect(()=>{
    setMcnData(data)
},[data])

React.useEffect(()=>{
if(sendingData===true){
   
  try{
    
    const fetchData= async ()=>{
      const result= await fetch(`${BaseUrl}/api/mcn`,{
        method:'post',
        headers:{'Content-Type':"application/json",
          Authorization:token
        },
        body:JSON.stringify({
          uid:uid,
          fsalary:mcnData.fsalary,
          msalary:mcnData.msalary,
          mcertificate:mcnData.mcertificate,
          fcertificate:mcnData.fcertificate,
          categ:mcnData.categ
          })
      }) ;
      const res = await result.json();
      if(res.err===false){     
      
        setSuccess(true);
        setSuccessMsg(res.msg);
        setOpen(false);
        setUpdated(res.msg);
        setOpen(false);
        setEdit(false);
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
                    <h3 className={classes.modalTitle}><strong>EDIT MCN APPLICATION</strong></h3>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
               {mcnData.name!==undefined?
                <GridContainer justify="center" alignItems="center">
                 
                <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Name"                                 
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                      defaultValue:mcnData.name,
                                         disabled:true
                                    }}
                                   
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Category"                                 

                                    formControlProps={{
                                        fullWidth: true
                                    
                                    }}
                                    inputProps={{
                                      
                                      defaultValue:mcnData.categ,
                                         name: 'categ',
                                         disabled:!edit
                                    }}
                                    onChange={onChange}
                                />
                            </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer >
                    <GridItem xs={12} sm={12} md={6}>
         <FormControl fullWidth className={classes.formControl} disabled={!edit}>
                  <InputLabel className={classes.labelRoot}>Father's Income Certificate</InputLabel>
                  <Select
                   name="fcertificate"
                   className={classes.input+" "+classes.underline}
                   value={mcnData.fcertificate}
                   onChange={onChange}
                  >
                     <MenuItem value={``}>SELECT DOCUMENT</MenuItem>
                     <MenuItem value={`ITR-V`}>ITR-V</MenuItem>
                     <MenuItem value={`DOC-2`}>DOC-2</MenuItem>
                     <MenuItem value={`DOC-3`}>DOC-3</MenuItem>
                     
                  </Select>
               </FormControl>
                </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Fathers Income"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{
                                      
                                      defaultValue:mcnData.fsalary,
                                        name: 'fsalary',
                                        disabled:!edit
                                        
                                    }}

                                />
                      </GridItem>
                      </GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                    <GridContainer >
                      <GridItem xs={12} sm={12} md={6}>
         <FormControl fullWidth className={classes.formControl} disabled={!edit} >
                  <InputLabel className={classes.labelRoot}>Mother's Income Certificate</InputLabel>
                  <Select
                   name="mcertificate"
                   className={classes.input+" "+classes.underline}
                   onChange={onChange}
                   value={mcnData.mcertificate}
                  >
                     <MenuItem value={``}>SELECT DOCUMENT</MenuItem>
                     <MenuItem value={`ITR-V`}>ITR-V</MenuItem>
                     <MenuItem value={`DOC-2`}>DOC-2</MenuItem>
                     <MenuItem value={`DOC-3`}>DOC-3</MenuItem>
                     
                  </Select>
               </FormControl>
                </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Mothers Income"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{  
                                      defaultValue:mcnData.msalary,                                      
                                        name: 'msalary',
                                        disabled:!edit    
                                       }}

                                />
                      </GridItem>
                  </GridContainer>
                 </GridItem>
                 </GridItem>
              </GridContainer>:<p>Loading Data... if more than 30sec then refresh</p>}
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                {!edit? 
                <div>  
                  <Button
                      onClick={() => setEdit(true)}
                      color="info"
                      solid="true"
                      round
                    >
                      Edit Response
                  </Button>
                    <Button
                      onClick={() => setOpen(false)}
                      color="danger"
                      solid="true"
                      round
                    >
                      Close
                    </Button>
                    </div>
                    :
                    <div>
                    <Button
                    onClick={() => setSendingData(true)}
                    color="success"
                    solid="true"
                    round
                  >
                    Submit
                </Button>
                  <Button
                    onClick={() => setEdit(false)}
                    color="danger"
                    solid="true"
                    round
                  >
                    Cancel
                  </Button></div>}
                  </DialogActions>
                  
                </Dialog>
    );
}