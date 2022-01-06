import React from "react";
import axios from "axios"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment"
//Core Components
import Button from "components/CustomButtons/Button.js";
import {BaseUrl} from "variables/BaseUrl";
import styles from "assets/jss/material-kit-react/modalStyle";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import AlertComponent from "components/Alert/Alert"
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";


const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function CheckoutModal({
    open, 
    setOpen,
    setUpdated,
    data
   }){
const classes=useStyles();
const token=JSON.parse(localStorage.getItem("officialtokens"));
const [loading,setLoading]=React.useState(false);
const [err, setErr] = React.useState(false)
const [succes, setSuccess] = React.useState(false)
const [msg, setMsg] = React.useState("")

const [ checkoutData, setCheckoutData ] = React.useState({})

const [sendingData,setSendingData]=React.useState(false);

    React.useEffect(() => {
        if (sendingData === true) {
            try {
                const sendData = async () => {
                    setLoading(true);
                   
                    let caughtInError = 0
                    const res = await axios.post(`${BaseUrl}/api/o/inventory/log/check-out`, {...checkoutData, item_code : data.item_code, lend_date : moment().format("yyyy-MM-DD")}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).catch(e => {
                        setMsg(e.response.data.msg)
                        setErr(true)
                        caughtInError = 1
                    })
                    setLoading(false)
                    if(caughtInError){
                        return
                    }
                    setMsg(res.data.msg)
                    if (res.data.err) {
                        setErr(true)
                    }
                    else {
                        setSuccess(true)
                        setUpdated(true)
                        handleClose()
                    }
                }
                sendData();
                setSendingData(false);
            }
            catch (err) {
                console.log("hi")
                setMsg("Error in processing request");
                setErr(true);
            }
        }

    }, [sendingData])



const handleClose = () => {
    setCheckoutData({})
    setOpen(false)
}


const onInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData( prevDate => ({
        ...prevDate,
        [ name ] : value
    }))
}

    return (
        <Dialog
            classes={{
                root: classes.center,
                paper: classes.modal
            }}

            fullWidth={true}
            open={open}
            scroll="body"
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
            disableBackdropClick
            disableEscapeKeyDown
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
                <h3 className={classes.modalTitle}><strong>Checkout Modal</strong></h3>
            </DialogTitle>
            <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
            >
                <GridContainer jsutify = "center" alignItems = "center">
                    <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="borrower_name"
                            label = "Borrower Name"
                            margin = "normal"
                            fullWidth
                            variant = "outlined"
                            value = { checkoutData.borrower_name || ""}
                            onChange = { onInputChange }
                        />
                    </GridItem>
                    <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="borrower_id"
                            label = "Borrower ID"
                            margin = "normal"
                            fullWidth
                            variant = "outlined"
                            value = { checkoutData.borrower_id || "" }
                            onChange = { onInputChange }
                        />
                    </GridItem>
                    <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="purpose"
                            label = "Purpose"
                            rows = {3}
                            multiline
                            margin = "normal"
                            fullWidth
                            variant = "outlined"
                            value = { checkoutData.purpose || "" }
                            onChange = { onInputChange }
                        />
                    </GridItem>
                    
                    <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="comment"
                            label = "Checkout Comments(if any)"
                            rows = {3}
                            multiline
                            margin = "normal"
                            fullWidth
                            variant = "outlined"
                            value = { checkoutData.comment || "" }
                            onChange = { onInputChange }
                        />
                    </GridItem>
            </GridContainer>
                
                
                
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                {loading ? <div style={{ display: 'flex', flexDirection: 'row' }}><CircularProgress size={20} style={{ marginRight: "10px" }} /></div> : null}
                 
                <Button
                    onClick={() => setSendingData(true)}
                    color="info"
                    solid="true"
                    round
                    disabled={loading}
                >
                    Submit
                </Button>
                <Button
                    onClick={handleClose}
                    color="danger"
                    solid="true"
                    round
                >
                    Cancel
                </Button>
            </DialogActions>
            <AlertComponent isOpen={succes}  msg={msg}  handleClose={() => setSuccess(false)}  type = "success" />
            <AlertComponent isOpen={err}  msg={msg}  handleClose={() => setErr(false)}  type = "error" />
        </Dialog>
    );
}