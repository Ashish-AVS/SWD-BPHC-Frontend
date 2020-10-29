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
      const fileData= new FormData();
      fileData.append('upload', mcnData.upload,`${uid}.zip`);
      fileData.append('fsalary', mcnData.fsalary);
      fileData.append('msalary', mcnData.msalary);
      fileData.append('categ', mcnData.categ);
     
      const result= await fetch(`${BaseUrl}/api/mcn`,{
        method:'post',
        headers:{
          Authorization:token
        },
        
        body:fileData
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

 async function  onDocChange(e){
  const file=e.target.files[0];
  if(file!==undefined){
  setMcnData(prevState=>({
    ...prevState,
    upload:file
  }))
  }
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
                <FormControl fullWidth className={classes.formControl} disabled={!edit}>
                  <InputLabel className={classes.labelRoot}>Category</InputLabel>
                  <Select
                    name="categ"
                    className={classes.input + " " + classes.underline}
                    value={mcnData.categ}
                    onChange={onChange}
                  >

                    <MenuItem value={'General'}>General</MenuItem>
                    <MenuItem value={'SC'}>Scheduled Caste (SC)</MenuItem>
                    <MenuItem value={'ST'}>Scheduled Tribe (ST)</MenuItem>
                    <MenuItem value={'OBC'}>Other Backward Class (OBC)</MenuItem>
                  </Select>
                </FormControl> 
                            </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer >
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
                   <GridItem>
                     {!edit?<Button
                      onClick={() => {
                        window.open(data.upload)
                      }}
                      color="danger"
                      
                    >
                     Download Submitted Documents 
                  </Button>: 
                  <div><InputLabel className={classes.label}>
                  Upload New Document File(.zip file )
                 </InputLabel>
                 <input name="g_img" type='file' style={{marginTop:'10px'}} onChange={onDocChange} ></input></div>}
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