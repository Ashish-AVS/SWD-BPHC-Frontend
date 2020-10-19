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



Transition.displayName = "Transition";
export default function GraceModal({
  open,
  setOpen,
  setUpdated, 
  setSuccess,
  setErr,
  setErrMsg,
  setSuccessMsg}){
const classes=useStyles();
const {uid}=JSON.parse(localStorage.getItem("data"));

const token=JSON.parse(localStorage.getItem("tokens"));
const [mcnData,setMcnData]=React.useState({
  fsalary:'',
    msalary:'',
    categ:'',
    upload:null
});
const [sendingData,setSendingData]=React.useState(false)




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
      setMcnData({
        fsalary:'',
          msalary:'',
          upload:null,
          categ:''
      })
        setSuccess(true);
        setSuccessMsg(res.msg);
        setUpdated(res.msg);
        setOpen(false);
        
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
    }
}
   
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
  // function convertToFileData(file){
  //   return new Promise((resolve,reject)=>{
  //     const fileData = new FormData();
  //     fileData.append('file', file)
  //       resolve(fileData)
  //   })
  // }

    return(
        <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  maxWidth="sm"
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
                <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer justify="center" alignItems='center' >
                    
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText="Fathers Income(in ₹)"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{
                                      value:mcnData.fsalary,
                                        name: 'fsalary',
                                        type:'number'
                                        
                                    }}

                                />
                      </GridItem>
                     
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText="Mothers Income(in ₹)"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{  
                                      value:mcnData.msalary,                                      
                                        name: 'msalary',
                                        type:'number'    
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
                                      value:mcnData.categ,
                                         name: 'categ'
                                    }}
                                    onChange={onChange}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={5}>
                 <InputLabel className={classes.label}>
                  Documents
                 </InputLabel>
                 <input name="g_img" type='file' style={{marginTop:'10px'}} onChange={onDocChange}></input>      
                </GridItem>
                  
                  </GridContainer>
                 </GridItem>
              </GridContainer>

                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                   
                  <Button
                      onClick={() => 
                        setSendingData(true)
                        }
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
                 
                </Dialog>
    );
}