import React from "react";
import axios from 'axios';
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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

//Core Components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import CustomInput from "components/CustomInput/CustomInput";
import CircularProgress from '@material-ui/core/CircularProgress';

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
const [safData,setSafData]=React.useState({
    fname:'',
    mname:'',
    fprof:'',
    mprof:'',
    fcert:'',
    mcert:'',
    fsalary:'',
    msalary:'',
    categ:'',
    upload:null,
    fitr:'',
    mitr:'',
    fbs:'',
    mbs:'',
    pc:'',
    f16:'',
    tehsil:'',
    fci:'',
    mci:'',
    others:'',
    cgpa:'',
    loan:'',
    phone:'',
    bank_ac_no:''

});
const [sendingData,setSendingData]=React.useState(false)
const [others,setOthers]=React.useState(false);
const [uploadMsg,setUploadMsg]=React.useState("");
const [uploading,setUploading]=React.useState(false);


React.useEffect(()=>{
if(sendingData===true){
  try{
    const fetchData= async ()=>{
      const fileData= new FormData();
      /*Performing validation over mcn data*/
      if (safData.cgpa < 0 || safData.cgpa > 10) {
        setErr(true);
        setErrMsg("CGPA should be 0-10 inclusive");
        return;
      }
      if(safData.others !=='')
      {
        fileData.append('attached',`${safData.fitr}${safData.mitr}${safData.fbs}${safData.mbs}${safData.pc}${safData.f16}${safData.tehsil}${safData.fci}${safData.mci}${safData.others}`)
      }
      else {
        fileData.append('attached',`${safData.fitr}${safData.mitr}${safData.fbs}${safData.mbs}${safData.pc}${safData.f16}${safData.tehsil}${safData.fci}${safData.mci}${safData.others}`.slice(0,-1))
      }
      if(safData.upload instanceof Blob) {
        /*Performing validation over attached file*/
        let attachedFile = safData.upload;
        let attachedFileSize = attachedFile.size / (1024*1024);
        let attachedFileType = attachedFile.type;
        if (attachedFileSize >= 15) {
          setErr(true);
          setErrMsg("File size exceeded, limit is 15 MB");
          return;
        }
        if (!attachedFileType.includes("zip")) {
          setErr(true);
          setErrMsg("Invalid file type, allowed file type(s): .zip");
          return;
        }
        fileData.append('upload', safData.upload,`${uid}.zip`);
      } else {
        setErr(true);
        setErrMsg("No zip file attached");
        return;
      }
      fileData.append('fsalary', safData.fsalary);
      fileData.append('msalary', safData.msalary);
      fileData.append('categ', safData.categ);
      fileData.append('fname',safData.fname);
      fileData.append('mname',safData.mname);
      fileData.append('fcert',safData.fcert);
      fileData.append('mcert',safData.mcert);
      fileData.append('fprof',safData.fprof);
      fileData.append('mprof',safData.mprof);
      fileData.append('phone',safData.phone);
      fileData.append('bank_ac_no',safData.bank_ac_no);       
      fileData.append('loan', safData.loan);
      fileData.append('cgpa', safData.cgpa);
      setUploading(true);
      let caughtInError = 0;
      const res= await axios.post(`${BaseUrl}/api/saf`,fileData,{
        headers:{
          Authorization:token
        },  
        onUploadProgress:progressEvent=>{
          setUploadMsg(`${Math.round(progressEvent.loaded*100/progressEvent.total)} % uploaded`)
        }
      }).catch((e) => {
        setUploading(false);
        setErr(true);
        let message = e.response.data.msg;
        setErrMsg(message);
        caughtInError = 1;
      });
      if (caughtInError === 1) {
        return;
      }
      if(res.data.err===false){     
      setSafData({ 
        fname: '',
        mname: '',
        fprof: '',
        mprof: '',
        fcert: '',
        mcert: '',
        fsalary: '',
        msalary: '',
        categ: '',
        upload: null,
        fitr: '',
        mitr: '',
        fbs: '',
        mbs: '',
        pc: '',
        f16: '',
        tehsil: '',
        fci: '',
        mci: '',
        others: '',
        cgpa: '',
        loan: 0,
        phone:'',
        bank_ac_no:''

      })
      setUploading(false)
        setSuccess(true);
        setSuccessMsg(res.data.msg);
        setUpdated(`${res.msg} applied`);
        setOpen(false);
  } else {
    setUploading(false)
      setErr(true);
      setErrMsg(res.data.msg);
  }
  
}
    fetchData();
    setSendingData(false)
    
  } catch(err){
      console.log(err);
    }
}
   
  });
 
  function onChange(e){
    const { name, value } = e.target;
    setSafData(prevState=>({
         ...prevState,
         [name]: value
     }));
     
 }

 async function  onDocChange(e){
  const file=e.target.files[0];
  if(file!==undefined){
  setSafData(prevState=>({
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

  function onCgChange(e){
    const { name,id} = e.target;
    document.getElementById(id).oninput = function () {
        var max = parseInt(this.max);
        var min = parseInt(this.min);
        if (parseInt(this.value) > max) {
            this.value = max;
            setSafData(prevState=>({
                ...prevState,
                [name]: this.value
            })
            ); 
        }
        else if (parseInt(this.value) < min) {
            this.value = min;
            setSafData(prevState=>({
                ...prevState,
                [name]: this.value
            })
            ); 
        }
        else{
        setSafData(prevState=>({
            ...prevState,
            [name]: this.value
        })
        );  
      }  
    }
    
    }



  function onCheckChange(e){
    const {name,checked,value}=e.target;
   
   if(checked===true){
     
    setSafData(prevState=>({
      ...prevState,
      [name]:`${value} ,`
    }))
   }    
   else{
    setSafData(prevState=>({
      ...prevState,
      [name]:''
    }))
   
   }

    }
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
                    <h3 className={classes.modalTitle}><strong>SAF APPLICATION</strong></h3>
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
                                    labelText={<p>Father's Name<span style={{color:'red'}}>*</span></p>}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{
                                      value:safData.fname,
                                        name: 'fname',
                                        type:'text'
                                        
                                    }}

                                />
                      </GridItem>
                     
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText={<p>Mother's Name <span style={{color:'red'}}>*</span></p>}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{  
                                      value:safData.mname,                                      
                                        name: 'mname',
                                        type:'text'    
                                       }}

                                />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText={<p>Father's Occupation <span style={{color:'red'}}>*</span></p>}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{
                                      value:safData.fprof,
                                        name: 'fprof',
                                        type:'text'
                                        
                                    }}

                                />
                      </GridItem>
                     
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText={<p>Mother's Profession <span style={{color:'red'}}>*</span></p>}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{  
                                      value:safData.mprof,                                      
                                        name: 'mprof',
                                        type:'text'    
                                       }}

                                />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText={<p>Father's Income(in ₹) <span style={{color:'red'}}>*</span></p>}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{
                                      value:safData.fsalary,
                                        name: 'fsalary',
                                        type:'number'
                                        
                                    }}

                                />
                      </GridItem>
                     
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText={<p>Mother's Income(in ₹) <span style={{color:'red'}}>*</span></p>}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{  
                                      value:safData.msalary,                                      
                                        name: 'msalary',
                                        type:'number'    
                                       }}

                                />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText={<p>Father's Income Certificate<span style={{color:'red'}}>*</span></p>}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{
                                      value:safData.fcert,
                                        name: 'fcert',
                                        type:'text'
                                        
                                    }}

                                />
                      </GridItem>
                     
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText={<p>Mother's Income Certificate <span style={{color:'red'}}>*</span></p>}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{  
                                      value:safData.mcert,                                      
                                        name: 'mcert',
                                        type:'text'    
                                       }}

                                />
                      </GridItem>
                      
                            <GridItem xs={12} sm={12} md={5}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel className={classes.labelRoot}>Category<span style={{color:'red'}}>*</span></InputLabel>
                    <Select
                      name="categ"
                      className={classes.input + " " + classes.underline}
                      value={safData.categ}
                      onChange={onChange}
                    >
                      <MenuItem value={'General'}>General</MenuItem>
                      <MenuItem value={'SC'}>Scheduled Caste (SC)</MenuItem>
                      <MenuItem value={'ST'}>Scheduled Tribe (ST)</MenuItem>
                      <MenuItem value={'OBC'}>Other Backward Class (OBC)</MenuItem>
                      <MenuItem value={'Others'}>Others</MenuItem>
                    </Select>
                  </FormControl> 
                            </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <InputLabel className={classes.label}>
                    Documents<span style={{color:'red'}}>*</span>
                 </InputLabel>
                  <input name="g_img" type='file' style={{ marginTop: '10px' }} onChange={onDocChange}></input>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText={<p>Phone Number<span style={{color:'red'}}>*</span></p>}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{
                                      value:safData.phone,
                                        name: 'phone',                                       
                                    }}

                                />
                      </GridItem>
                     
                      <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText={<p>Bank Account Number<span style={{color:'red'}}>**</span></p>}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onChange}
                                    inputProps={{  
                                      value:safData.bank_ac_no,                                      
                                        name: 'bank_ac_no',
                                        type:'text'    
                                       }}

                                />
                      </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                    labelText={<p>Current CGPA <span style={{color:'red'}}>*</span></p>}
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={onCgChange}
                    inputProps={{ 
                      name: 'cgpa',
                      id:'cgp',
                      type: "number",
                      inputProps:{ min: 0, max: 10 },
                      value: safData.cgpa,
                    }}

                  />
               
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                <FormControlLabel
                    control={<Switch color="primary" />}
                    label={<h5 style={{color:"black"}}>Applied for loan</h5>} 
                    name='loan'
                    checked={safData.loan}
                    onChange={(e)=>{
                      const {checked}=e.target;
                      if(checked){
                        setSafData(prevData=>({
                          ...prevData,
                          loan:1
                        }))
                      }
                      else
                      setSafData(prevData=>({
                        ...prevData,
                        loan:0
                      }))
                    }}
                    labelPlacement="start"
                  />
                </GridItem>
                  
                  </GridContainer>
                 </GridItem>
                 <GridItem xs={12} sm={12} md={12}>
                <h6 style={{display:"flex",justifyContent:"center"}}><b>All Submitted Documents<span style={{color:'red'}}>*</span></b></h6>
                <FormGroup aria-label="position" row style={{display:'flex',justifyContent:'flex-start',marginLeft:'40px'}}>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Father/Guardian's ITR"
                    value="Father/Guardian's ITR"
                    name='fitr'
                    onChange={onCheckChange}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    
                    control={<Checkbox color="primary" />}
                    label="Mother/Guardian's ITR"
                    name='mitr'
                    value="Mother/Guardian's ITR"
                    onChange={onCheckChange}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    
                    control={<Checkbox color="primary" />}
                    label="Bank Statement of Father/Guardian"
                    value="Bank Statement of Father/Guardian"
                    name='fbs'
                    onChange={onCheckChange}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    
                    control={<Checkbox color="primary" />}
                    label="Bank Statement of Mother/Guardian"
                    value="Bank Statement of Mother/Guardian"
                    name='mbs'
                    onChange={onCheckChange}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                  
                    control={<Checkbox color="primary" />}
                    label="Pension Certificate(if applicable)"
                    value="Pension Certificate"
                    name='pc'
                    onChange={onCheckChange}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    
                    control={<Checkbox color="primary" />}
                    label="Form 16(if applicable)"
                    value="Form 16"
                    name='f16'
                    onChange={onCheckChange}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    
                    control={<Checkbox color="primary" />}
                    label="Tehsildar's Income Certificate(if applicable)"
                    value="Tehsildar's Income Certificate"
                    name='tehsil'
                    onChange={onCheckChange}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    
                    control={<Checkbox color="primary" />}
                    label="Computation of Income(Father)"
                    value="Computation of Income(Father)"
                    name='fci'
                    onChange={onCheckChange}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    
                    control={<Checkbox color="primary" />}
                    label="Computation of Income(Mother)"
                    value="Computation of Income(Mother)"
                    name='mci'
                    onChange={onCheckChange}
                    labelPlacement="end"
                  />
                  
                </FormGroup>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                <GridContainer >
                  <GridItem xs={12} sm={12} md={2}>
                  <FormGroup aria-label="position" row style={{display:'flex',justifyContent:'flex-start',flexDirection:'row',marginLeft:'40px'}}>
                <FormControlLabel 
                    control={<Checkbox color="primary" />}
                    label="Others"
                    value="Others"
                    name='mci'
                    onChange={(e)=>{
                      const {checked} = e.target;
                      if (checked === true) {
                        setOthers(true)
                      }
                      else {
                        setOthers(false);
                        setSafData(prevState=>({
                          ...prevState,
                          others:''
                        }))
                      }

                    }}
                    labelPlacement="end"
                  />
                </FormGroup>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8} style={{marginLeft:'40px'}}>
                  {others ?
                   <TextField
                   id="outlined-multiline-static"
                   label="Other Documents(with reasons)"
                   name="others"
                   multiline
                   rows={4}
                   defaultValue=""
                   variant="outlined"
                   value={safData.others}
                   onChange={onChange}
                   fullWidth={true}
                    /> 
                   : null}
                  </GridItem>
                </GridContainer>
               
            
                </GridItem>
              </GridContainer>

                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                  {uploading?<div style={{display:'flex',flexDirection:'row'}}><CircularProgress size={20} style={{marginRight:"10px"}} /><p>{uploadMsg}</p></div>:null}
                  <Button
                      onClick={() => 
                        setSendingData(true)
                        }
                      color="success"
                      solid="true"
                      round
                      disabled={uploading}
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