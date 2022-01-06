import React from "react";
import moment from 'moment'
import axios from 'axios'
// @material-ui/core components
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import MenuItem from "@material-ui/core/MenuItem"

//Core Components
import Button from "components/CustomButtons/Button.js";
import AlertComponent from "components/Alert/Alert"


import { BaseUrl } from "variables/BaseUrl";

import styles from "assets/jss/material-kit-react/modalStyle";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function ItemDetailsModal({
  open,
  setOpen,
  setUpdated,
  data
}) {
  const classes = useStyles();
  const token = JSON.parse(localStorage.getItem("officialtokens"));
  const [loading, setLoading] = React.useState(false);
  const [sendingData, setSendingData] = React.useState(false);
  const [invData, setInvData] = React.useState({});
  const [docData, setDocData] = React.useState([])
  const [logData, setLogData] = React.useState([])
  const [allowEditing, setAllowEditing] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [succes, setSuccess] = React.useState(false)
  const [msg, setMsg] = React.useState("")
  const [imgLink, setImgLink] = React.useState("")
  React.useEffect(() => {

    if (open === true) {
      const fetchDocData = async () => {
        try {
          let caughtInError = 0
          const res = await axios.get(`${BaseUrl}/api/o/inventory/get-docs?item_code=${data.item_code}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).catch(e => {
            setErr(true)
            setMsg("Cannot get documents")
            caughtInError = 1
          })
          if (caughtInError === 1) {
            return
          }

          if (res.data.err) {
            setMsg("Cannot get documents")
            setErr(true)
          }
          else {
            setDocData(res.data.data)
          }
        } catch (error) {
          setMsg("Cannot get documents")
          setErr(true)
        }
      }
      const fetchLogData = async () => {
        try {
          let caughtInError = 0
          const res = await axios.get(`${BaseUrl}/api/o/inventory/log/all?item_code=${data.item_code}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).catch(e => {
            setErr(true)
            setMsg("Cannot get Inventory Logs")
            caughtInError = 1
          })
          if (caughtInError === 1) {
            return
          }

          if (res.data.err) {
            setMsg("Cannot get Inventory Logs")
            setErr(true)
          }
          else {
            setLogData(res.data.data)
          }
        } catch (error) {
          setMsg("Cannot get Inventory Logs")
          setErr(true)
        }
      }
      fetchDocData()
      fetchLogData()
      setInvData(prevData => ({
        ...prevData,
        item_asc: data.item_asc,
        item_code: data.item_code,
        item_comments: data.item_comments,
        item_condition: data.item_condition,
        item_name: data.item_name,
        item_procurement_date:  moment(data.item_procurement_date).format("YYYY-MM-DD"),
        item_purchased_for: data.item_purchased_for,
        item_type: data.item_type
      }))
      setImgLink(data.item_img)
    }

  }, [open])

  React.useEffect(() => {
    if (sendingData === true) {
      try {
        const sendData = async () => {
          setLoading(true);
          const result = await fetch(`${BaseUrl}/api/o/inventory/edit`, {
            method: 'post',
            headers: {
              'Content-Type': "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              ...invData,
              item_code: data.item_code
            })
          })
          const res = await result.json();
          setMsg(res.msg)
          if (res.err === false) {
            setUpdated(true);
            setAllowEditing(false);            
            setSuccess(true)
          }
          else if (res.err === true) {
            setErr(true)
          }
          setLoading(false);
        }
        sendData();
        setSendingData(false);
      }
      catch (err) {
        console.log(err);
      }
    }
  }, [sendingData])

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInvData(prevDate => ({
      ...prevDate,
      [name]: value
    }))
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal
      }}
      scroll="body"
      maxWidth="lg"
      fullWidth={true}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
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
        <h3 className={classes.modalTitle}><strong>{invData.item_code || ""} - {invData.item_name || ""}</strong></h3>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <GridContainer >
          <GridItem xs={4} sm={4} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={imgLink} alt="An Img here" style={{ maxWidth: '300px', maxHeight: '250px', border: '2px solid black', borderRadius: '2px' }} />
          </GridItem>
          <GridItem xs={4} sm={4} md={8}>
            <h3 style={{ textAlign: 'center' }}><b>ITEM DETAILS</b></h3>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  size="small"
                  name="item_name"
                  label="Item Name"
                  margin="normal"
                  fullWidth
                  disabled
                  variant="outlined"
                  value={invData.item_name || ""}
                  onChange={onInputChange}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  size="small"
                  name="item_code"
                  label="Item Inventory Code"
                  margin="normal"
                  fullWidth
                  disabled
                  variant="outlined"
                  value={invData.item_code || ""}
                  onChange={onInputChange}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  size="small"
                  name="item_type"
                  label="Equipment Type"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  value={invData.item_type || ""}
                  onChange={onInputChange}
                  disabled={!allowEditing}

                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  size="small"
                  name="item_purchased_for"
                  label="Purchased For"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  value={invData.item_purchased_for || ""}
                  onChange={onInputChange}
                  disabled={!allowEditing}

                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  size="small"
                  name="item_procurement_date"
                  label="Procurement Date"
                  margin="normal"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={moment(invData.item_procurement_date).format("YYYY-MM-DD")}
                  onChange={onInputChange}
                  disabled={!allowEditing}

                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
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
                  margin="normal"
                  fullWidth
                  disabled={!allowEditing}

                >
                  <MenuItem value={0}>Select here</MenuItem>
                  <MenuItem value={1}>Good</MenuItem>
                  <MenuItem value={2}>Decent</MenuItem>
                  <MenuItem value={3}>Needs Repair</MenuItem>
                  <MenuItem value={4}>Non-Functional</MenuItem>
                </TextField>
                {/* </FormControl> */}
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  size="small"
                  name="item_asc"
                  label="Item Acessories"
                  rows={3}
                  multiline
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  value={invData.item_asc || ""}
                  onChange={onInputChange}
                  disabled={!allowEditing}

                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  size="small"
                  name="item_comments"
                  label="Additional Comments(if any)"
                  rows={2}
                  multiline
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  value={invData.item_comments || ""}
                  onChange={onInputChange}
                  disabled={!allowEditing}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FormControlLabel
                  value="top"
                  control={<Switch checked={allowEditing} />}
                  label="Editing"
                  labelPlacement="start"
                  onChange={(e) => setAllowEditing(!allowEditing)}
                  style={{ marginRight: '20px' }}
                />
                <Button
                  onClick={() => setSendingData(true)}
                  color="info"
                  solid="true"
                  round
                  disabled={!allowEditing || loading}
                >
                  Submit
                </Button>
                {loading ? <CircularProgress size={24} /> : null}

              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <div style={{ width: "50%", display: 'flex', flexDirection: 'column', alignItems: 'center', float: 'right' }}>
              <h5 style={{ textAlign: 'center' }}><b>DOCUMENTS</b></h5>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Uploaded on</th>
                </tr>
                {
                  docData.map(item => {
                    return (

                      <tr> <td><a href={item.link} target="_blank">{item.doc_name}</a></td> <td>{moment(item.uploaded_on).format("DD-MM-YYYY")}</td></tr>
                    )
                  })
                }
              </table>
            </div>
            <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
              <h3 style={{ textAlign: 'center' }}><b>ITEM LOGS</b></h3>
              <table style={{ width: "80%", borderCollapse: 'collapse', textAlign: 'center' }} >
                <tr>
                  <th style={{ border: '1px solid black' }}>Name</th>
                  <th style={{ border: '1px solid black' }}>ID No.</th>
                  <th style={{ border: '1px solid black' }}>Lend Date</th>
                  <th style={{ border: '1px solid black' }}>Return Date</th>
                  <th style={{ border: '1px solid black' }}>Comments</th>
                </tr>
                {
                  logData.map(item => {
                    return (
                      <tr>
                        <td style={{ border: '1px solid black' }}>{item.borrower_name}</td>
                        <td style={{ border: '1px solid black' }}>{item.borrower_id}</td>
                        <td style={{ border: '1px solid black' }}>{moment(item.lend_date).format("DD-MM-YYYY")}</td>
                        <td style={{ border: '1px solid black' }}>{item.return_date !== null ? moment(item.return_date).format("DD-MM-YYYY") : " - "}</td>
                        <td style={{ border: '1px solid black' }}>{item.comment}</td>
                      </tr>
                    )
                  })
                }
              </table>
            </div>

          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>

        <Button
          onClick={handleClose}
          color="danger"
          solid="true"
          round
        >
          Close
        </Button>
      </DialogActions>
      <AlertComponent isOpen={succes}  msg={msg}  handleClose={() => setSuccess(false)}  type = "success" />
      <AlertComponent isOpen={err}  msg={msg}  handleClose={() => setErr(false)}  type = "error" />
    </Dialog>
  );
}