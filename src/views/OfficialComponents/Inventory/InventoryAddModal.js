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
export default function RemarkModal({
    open, 
    setOpen,
    setUpdated,
   }){
const classes=useStyles();
const token=JSON.parse(localStorage.getItem("officialtokens"));
const [loading,setLoading]=React.useState(false);
const [err, setErr] = React.useState(false)
const [succes, setSuccess] = React.useState(false)
const [msg, setMsg] = React.useState("")

const [ invData, setInvData ] = React.useState({})

const [sendingData,setSendingData]=React.useState(false);
const [uploadMsg,setUploadMsg]= React.useState('');

    React.useEffect(() => {
        if (sendingData === true) {
            try {
                const sendData = async () => {
                    setLoading(true);
                    const fileData = new FormData();

                    if (invData.item_img[0] instanceof Blob) {
                        /*Performing validation over attached file*/
                        let attachedImageFile = invData.item_img[0];
                        let attachedImageFileType = attachedImageFile.type;
                        if (!["image/jpg", "image/jpeg", "image/png"].includes(attachedImageFileType)) {
                            setErr(true);
                            setMsg("Invalid file type, allowed file type(s)");
                            return;
                        }
                        fileData.append('item_files', attachedImageFile, `img@@${attachedImageFile.name}`);
                    } else {
                        setErr(true);
                        setMsg("No image file attached");
                        return;
                    }

                    for (const key of Object.keys(invData.item_docs)) {
                        if (invData.item_docs[key] instanceof Blob) {
                            let attachedFile = invData.item_docs[key];
                            let attachedFileType = attachedFile.type;

                            if (!["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(attachedFileType)) {
                                console.log(attachedFile)
                                setErr(true);
                                setMsg("Invalid file type found, allowed file type(s): pdf, jpeg, jpg, png ");
                                return;
                            }
                            fileData.append('item_files', attachedFile, `doc@@${attachedFile.name}`);
                        }
                    }
                    fileData.append('item_name', invData.item_name);
                    fileData.append('item_code', invData.item_code);
                    fileData.append('item_type', invData.item_type);
                    fileData.append('item_comments', invData.item_comments);
                    fileData.append('item_asc', invData.item_asc);
                    fileData.append('item_purchased_for', invData.item_purchased_for);
                    fileData.append('item_procurement_date', invData.item_procurement_date);
                    fileData.append('item_condition', invData.item_condition);

                    setLoading(true);
                    let caughtInError = 0;
                    const res = await axios.post(`${BaseUrl}/api/o/inventory/add`, fileData, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        onUploadProgress: progressEvent => {
                            setUploadMsg(`${Math.round(progressEvent.loaded * 100 / progressEvent.total)} % uploaded`)
                        }
                    }).catch((e) => {
                        setLoading(false);
                        setErr(true);
                        let message = e.response.data.msg;
                        setMsg(message);
                        caughtInError = 1;
                    });
                    if (caughtInError === 1) {
                        return;
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
                console.log(err);
            }
        }

    }, [sendingData, token])



const handleClose = () => {
    setInvData({})
    setOpen(false)
}


const onInputChange = (e) => {
    const { name, value } = e.target;
    setInvData( prevDate => ({
        ...prevDate,
        [ name ] : value
    }))
}

const onFileUpload = (e) => {
    const {name , files} = e.target
    setInvData( prevData => ({
        ...prevData,
        [ name ] : files
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
                <h3 className={classes.modalTitle}><strong>Add Items to the Inventory</strong></h3>
            </DialogTitle>
            <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
            >
                <GridContainer jsutify = "center" alignItems = "center">
                    <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="item_name"
                            label = "Item Name"
                            margin = "normal"
                            fullWidth
                            variant = "outlined"
                            value = { invData.item_name || ""}
                            onChange = { onInputChange }
                        />
                    </GridItem>
                    <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="item_code"
                            label = "Item Inventory Code"
                            margin = "normal"
                            fullWidth
                            variant = "outlined"
                            value = { invData.item_code || "" }
                            onChange = { onInputChange }
                        />
                    </GridItem>
                    <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="item_type"
                            label = "Equipment Type"
                            margin = "normal"
                            fullWidth
                            variant = "outlined"
                            value = { invData.item_type || ""}
                            onChange = { onInputChange }
                        />
                    </GridItem>
                    <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="item_purchased_for"
                            label = "Purchased For"
                            margin = "normal"
                            fullWidth
                            variant = "outlined"
                            value = { invData.item_purchased_for || "" }
                            onChange = { onInputChange }
                        />
                    </GridItem>
                    <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="item_procurement_date"
                            label = "Procurement Date"
                            margin = "normal"
                            type="date"
                            fullWidth
                            variant = "outlined"
                            value = { invData.item_procurement_date || moment().format("yyyy-MM-DD") }
                            onChange = { onInputChange }
                        />
                    </GridItem>
                    <GridItem xs = {12} sm = {6} md = {6}>
                    <InputLabel className={classes.label}>
                        Item Image
                    </InputLabel>
                    <input name="item_img" type='file' style={{ marginTop: '10px' }} onChange={onFileUpload}></input>
                </GridItem>
                <GridItem xs = {12} sm = {6} md = {6}>
                    <InputLabel className={classes.label}>
                        Item Documents
                    </InputLabel>
                    <input name="item_docs" type='file' style={{ marginTop: '10px' }} onChange={onFileUpload} multiple></input>
                </GridItem>
                <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="item_asc"
                            label = "Item Acessories"
                            rows = {3}
                            multiline
                            margin = "normal"
                            fullWidth
                            variant = "outlined"
                            value = { invData.item_asc || "" }
                            onChange = { onInputChange }
                        />
                    </GridItem>
                    <GridItem xs = {12} sm = {6} md = {6}>
                        {/* <FormControl fullWidth className={classes.formControl}> */}
                            {/* <InputLabel className={classes.labelRoot}>Condition</InputLabel> */}
                            <TextField
                                name="item_condition"
                                select
                                size="small"
                                value={invData.item_condition || 0}
                                onChange={onInputChange}
                                variant="outlined"
                                label="Condition"
                                margin = "normal"
                                fullWidth
                            >
                                <MenuItem value={0}>Select here</MenuItem>
                                <MenuItem value={1}>Good</MenuItem>
                                <MenuItem value={2}>Decent</MenuItem>
                                <MenuItem value={3}>Needs Repair</MenuItem>
                                <MenuItem value={4}>Non-Functional</MenuItem>
                            </TextField>
                        {/* </FormControl> */}
                    </GridItem>
                    <GridItem xs = {12} sm = {6} md = {6}>
                        <TextField
                            size="small"
                            name="item_comments"
                            label = "Additional Comments(if any)"
                            rows = {2}
                            multiline
                            margin = "normal"
                            fullWidth
                            variant = "outlined"
                            value = { invData.item_comments || "" }
                            onChange = { onInputChange }
                        />
                    </GridItem>
            </GridContainer>
                
                
                
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                {loading ? <div style={{ display: 'flex', flexDirection: 'row' }}><CircularProgress size={20} style={{ marginRight: "10px" }} /><p>{uploadMsg}</p></div> : null}
                 
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