import React from "react";
import {saveAs} from 'file-saver';

import { Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// core components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//Auth Components
import { useAuth } from "context/auth";

import { BaseUrl } from "variables/BaseUrl";
import { primaryColor, defaultFont } from "assets/jss/material-kit-react.js";
const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    top: "10px",
    letterSpacing: "unset",
    "& + $underline": {
      marginTop: "0px",
    },
  },
  input: {
    color: "#495057",
    height: "unset",
    "&,&::placeholder": {
      fontSize: "14px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "400",
      lineHeight: "1.42857",
      opacity: "1",
    },
    "&::placeholder": {
      color: "#AAAAAA",
    },
  },
  formControl: {
    margin: "0 0 5px 0",
    paddingTop: "27px",
    position: "relative",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057",
    },
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: primaryColor,
    },
  },
  label: {
    color: "rgba(0, 0, 0, 0.78)",
    top: "-17px",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0",
    letterSpacing: "normal",
    "& + $underline": {
      marginTop: "0px",
    },
  },
};


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(styles);

export default function Leave() {
  const [selectedToDate, setSelectedToDate] = React.useState(new Date());
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());

  const handleDateChangeTo = (date) => {
    setSelectedToDate(date);
  };
  const handleDateChangeFrom = (date) => {
    setSelectedFromDate(date);
  };
  const classes = useStyles();
  const { onOfficialLogin } = useAuth();

  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");

  const arrUidRef = React.useRef();
  const deptUidRef = React.useRef(); 
  const token = JSON.parse(localStorage.getItem("officialtokens"));
  const [loading, setLoading] = React.useState(false);
  const [sendingArrData, setSendingArrData] = React.useState(false);
  const [sendingDeptData, setSendingDeptData] = React.useState(false);
 
  // Arrival Request
  React.useEffect(() => {
    if (sendingArrData === true) {
      setLoading(true);
      setIsError(false);

      try {
        const fetchData = async () => {
          const result = await fetch(`${BaseUrl}/api/o/emergency-leave/arrival`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              uid: arrUidRef.current.value,
              token: token,
              from: `${selectedFromDate.getFullYear()}-${
                selectedFromDate.getMonth() + 1
              }-${selectedFromDate.getDate()}`,
            }),
          });
          const res = await result.json();
          if (res.err === false) {
            setSuccessMsg("Operation Successful")
            setIsSuccess(true)
            setSendingArrData(false);
            arrUidRef.current.value = "";
            setSelectedFromDate(new Date());
            // setSelectedToDate(new Date());
            setLoading(false);
          } else if (res.err === true && result.status === 401) {
            setErrorMsg("Authentication failed. Login again and retry");
            logout();
          } else if (res.err === true && result.status === 422) {
            setErrorMsg("Empty Fields Detected in the request");
            setIsError(true);
            setSendingArrData(false);
            setLoading(false);
          } else if (res.err === true) {
            setErrorMsg(res.msg);
            setIsError(true);
            setSendingArrData(false);
            setLoading(false);
          }
        };
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  }, [
    sendingArrData
  ]);


  // Departure Request
  React.useEffect(() => {
    if (sendingDeptData === true) {
      setLoading(true);
      setIsError(false);

      try {
        const fetchData = async () => {
          const result = await fetch(`${BaseUrl}/api/o/emergency-leave/leave`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              uid: deptUidRef.current.value,
              token: token,
              to: `${selectedToDate.getFullYear()}-${
                selectedToDate.getMonth() + 1
              }-${selectedToDate.getDate()}`,
            }),
          });
          const res = await result.json();
          if (res.err === false) {
            setSuccessMsg("Operation Successful")
            setIsSuccess(true)
            setSendingDeptData(false);
            deptUidRef.current.value = "";
            // setSelectedFromDate(new Date());
            setSelectedToDate(new Date());
            setLoading(false);
          } else if (res.err === true && result.status === 401) {
            setErrorMsg("Authentication failed. Login again and retry");
            logout();
          } else if (res.err === true && result.status === 422) {
            setErrorMsg("Empty Fields Detected in the request");
            setIsError(true);
            setSendingDeptData(false);
            setLoading(false);
          } else if (res.err === true) {
            setErrorMsg(res.msg);
            setIsError(true);
            setSendingDeptData(false);
            setLoading(false);
          }
        };
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  }, [
    sendingDeptData
  ]);


  const exportCsv = async (e) => {
    e.preventDefault();
    const result = await fetch(`${BaseUrl}/api/o/emergency-leave/report`, {
      headers: {  Authorization: `Bearer ${token}` ,Accept: "text/csv"},
    })
    const date =new Date();
    const res = await result.text();
    if(result.status===201||result.status===200||result.status===304){
        const csvBlob=new Blob([res],{type:'text/csv'});
        saveAs(csvBlob,`LeaveData-${date.toLocaleDateString()}.csv`);
        setSuccessMsg("Download Successful")
        setIsSuccess(true)
      }
      else {
        setIsError(true);
        setErrorMsg('Error in Downloading!');
    }

  }



  const logout = () => {
    localStorage.removeItem("officialtokens");
    // localStorage.removeItem("data");
    onOfficialLogin(false);
    return <Redirect exact to="/official-login" />;
  };

  return (
    <div>
      <div className={classes.typo} style={{ marginTop: "-50px" }}>
        <h2>
          <strong>BITS PILANI HYDERABAD CAMPUS</strong>
        </h2>
      </div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            <b>EMERGENCY LEAVE PORTAL</b>
          </h4>
        </CardHeader>
        <CardBody>
        <GridContainer justify="center" >
            <GridItem xs={12} sm={12} md={4}  >
             <h2><b>STUDENT ARRIVAL</b></h2> 
            </GridItem>
        </GridContainer>
          <GridContainer justify="center" >
            <GridItem xs={12} sm={12} md={4} lg={4} >
              <FormControl fullWidth className={classes.formControl}>
              <InputLabel className={classes.label}>STUDENT UID</InputLabel>
                <TextField
                  style={{marginTop:'3px'}}
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  inputRef={arrUidRef}
                  helperText="Ex: f20191435"
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12}  md={4} lg={4} >
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.label}>ARRIVAL-DATE</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    format="dd/MM/yyyy"
                    variant="inline"
                    value={selectedFromDate}
                    disableFuture
                    onChange={handleDateChangeFrom}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </GridItem>
            <GridItem xs={12}   sm={12}    md={2}   lg={2}>
              <Button
                color="success"
                disabled={loading}
                onClick={() => {
                  setSendingArrData(true);
                }}
              >
                Submit
              </Button>
              {sendingArrData && loading ? <CircularProgress size={24} color="primary" /> : null}
            </GridItem>
            
          </GridContainer>
          <GridContainer justify="center" >
            <GridItem xs={12} sm={12} md={5}  >
             <h2><b>STUDENT DEPARTURE</b></h2> 
            </GridItem>
        </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth className={classes.formControl}>
              <InputLabel className={classes.label}>STUDENT UID</InputLabel>
                <TextField
                  style={{marginTop:'3px'}}
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  inputRef={deptUidRef}
                  helperText="Ex: f20191435"
                />
              </FormControl>
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={4}
              lg={4}
            >
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.label}>DEPARTURE-DATE</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    format="dd/MM/yyyy"
                    variant="inline"
                    value={selectedToDate}
                    disablePast
                    onChange={handleDateChangeTo}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </GridItem>
            <GridItem xs={12}   sm={12}    md={2}   lg={2}>
              <Button
                color="success"
                disabled={loading}
                onClick={() => {
                  setSendingDeptData(true);
                }}
              >
                Submit
              </Button>
              {sendingDeptData &&loading ? <CircularProgress size={24} color="primary" /> : null}
            </GridItem>
            
          </GridContainer>
          <GridContainer
          // justify="center"
          // alignItems="center"
          >
            <GridItem
              xs={12}
              sm={12}
              md={5}
              lg={11}
              style={{ marginLeft: "27px"}}
            >
              <h3>
                <b>Download CSV</b>
              </h3>
              <h4>
                Click on the button to download the .csv file of student present on the campus
              </h4>
            </GridItem>
            <GridItem xs={12} sm={12} md={2} style={{ marginLeft: "27px"}} >
            <Button color="success" disabled={loading} onClick={exportCsv}>
              Download
            </Button>
            </GridItem>
          </GridContainer>
          <GridContainer justify="flex-end" xs={12} sm={12} md={5} lg={12}>
            
          </GridContainer>
        </CardBody>
      </Card>

      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        open={isSuccess}
        autoHideDuration={5000}
        onClose={() => { setIsSuccess(false) }}>
        <Alert
          onClose={() => { setIsSuccess(false) }}
          severity="success">
          {successMsg}
                  </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        open={isError}
        autoHideDuration={5000}
        onClose={() => { setIsError(false) }}>
        <Alert
          onClose={() => { setIsError(false) }}
          severity="error">
          {errorMsg}
                  </Alert>
      </Snackbar>
    </div>
  );
}
