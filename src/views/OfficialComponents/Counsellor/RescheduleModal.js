import React from "react";
import moment from 'moment';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import FormControl from '@material-ui/core/FormControl';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import InputLabel from "@material-ui/core/InputLabel";
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
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
export default function CancelModal({
    open, 
    setOpen,
    cancelId,
    setIsUpdated
   }){
const classes=useStyles();
let DateArray=[];
const {uid}=JSON.parse(localStorage.getItem("data"));
const token=JSON.parse(localStorage.getItem("officialtokens"));
const [bookData,setBookData]=React.useState({date:'',slot:''});
const [slotData,setSlotData]=React.useState([]);
const [loading,setLoading]=React.useState(false);
const [dateValues,setDateValues]=React.useState([]);
const [sendingData,setSendingData]=React.useState(false);
const [success, setSuccess] = React.useState(false);
const [err,setErr]=React.useState(false);
const [errMsg,setErrMsg]=React.useState('');
const [enabled,setEnabled]=React.useState(false);

React.useEffect(()=>{
    try{
    const fetchData0= async ()=>{
        const result = await fetch(`${BaseUrl}/api/o/counsellor/free`, {
            headers: { Authorization: `Bearer ${token}` }
          });
      const res = await result.json();
      if(res.err===false){
       setSlotData(
        res.data.map((info)=>{
            let hour= moment(info.slot,'H').format('hh:mm a');
            let hour1=moment(info.slot,'H').add(1,'h').format('hh:mm a');
            DateArray.push(info.date);
             return {date:info.date,slotTime:`${hour}-${hour1}`,slot:info.slot}   
            })
       )
       setDateValues(removeDuplicates(DateArray));
      }
     
      else if(res.err===true) {
          setErr(true);
          setErrMsg(res.msg);
      }  
  }
    fetchData0();
    
  }catch(err){
      console.log(err);
    }
  
  },[]);
 

React.useEffect(()=>{
  if(sendingData===true){
    try{
    const sendData=async ()=>{
      setLoading(true);  
      const result =await fetch(`${BaseUrl}/api/o/counsellor/reschedule`,{
          method:"post",
          headers:{'Content-Type':"application/json",Authorization: `Bearer ${token}`},
          body:JSON.stringify({
             new_slot:bookData.slot,
             new_date:bookData.date,
             booking_id:cancelId
          })
         })
         const res = await result.json();
        if(res.err===false){ 
          setLoading(false);
          setBookData({
            date:'',
            slot:''
        })
          setSuccess(true);
          setSendingData(false);
          setOpen(false);
          setIsUpdated(`Cancel ${cancelId}`);
        }
       if(res.err===true){
        setErr(true);
        setErrMsg(res.msg);
        setBookData({
            date:'',
            slot:''
        })
        setLoading(false);
        setSendingData(false);
        
       }
      }
    sendData();
    
   
   
    }
    catch(err){
      console.log(err);
    }
  }
},[sendingData,uid,token,cancelId,setOpen,setIsUpdated])
function removeDuplicates(array) {
    return [...new Set(array)]
  }
  function onDateChange(e){
    const {value} = e.target;
    setBookData({
        date:value,
        slot:''
    });
    if(value!=='')
     setEnabled(true)
    }
    function onSlotChange(e){
        const { value } = e.target;
        setBookData(previosState=>({
            ...previosState,
            slot:value
        }));}  

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
                <h3 className={classes.modalTitle}><strong>Re-Schedule Appointment</strong></h3>
            </DialogTitle>
            <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
            >
                <GridContainer justify="center" alignItems="center">
                    <GridItem xs={12} sm={12} md={5}>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel className={classes.labelRoot}>Select Date</InputLabel>
                            <Select
                                name="date"
                                className={classes.input + " " + classes.underline}
                                value={bookData.date}
                                onChange={onDateChange}
                            >
                                <MenuItem value={''}>SELECT DATE</MenuItem>
                                {dateValues.map(item => {

                                    return <MenuItem value={item}>{item}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                        <FormControl fullWidth className={classes.formControl} disabled={!enabled}>
                            <InputLabel className={classes.labelRoot}>Select Slot</InputLabel>
                            <Select
                                name="slot"
                                className={classes.input + " " + classes.underline}
                                value={bookData.slot}
                                onChange={onSlotChange}
                            >
                                <MenuItem value={''}>Select</MenuItem>
                                {slotData.map(item => {
                                    if (bookData.date === item.date)
                                        return <MenuItem value={item.slot}>{item.slotTime}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </GridItem>
                </GridContainer>

            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                {loading ? <CircularProgress size={24} /> : null}
                <Button
                    onClick={() => setSendingData(true)}
                    color="info"
                    solid="true"
                    round
                    disabled={loading}
                >
                    Confirm
                    </Button>

                <Button
                    onClick={() => setOpen(false)}
                    color="danger"
                    solid="true"
                    round
                >
                    Cancel
                    </Button>
            </DialogActions>
            <Snackbar
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                open={success}
                autoHideDuration={4000}
                onClose={() => {
                    setSuccess(false)
                }}>
                <Alert
                    onClose={() => {
                        setSuccess(false)
                    }}
                    severity="success">
                    Booking rescheduled Succesfully
        </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                open={err}
                autoHideDuration={4000}
                onClose={() => {
                    setErr(false)
                }}>
                <Alert
                    onClose={() => {
                        setErr(false)
                    }}
                    severity="error">
                    {errMsg}
                </Alert>
            </Snackbar>
        </Dialog>
    );
}