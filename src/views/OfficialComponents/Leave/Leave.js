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

  const stdID = React.useRef(); // store student's user ID, f20XXYYYY
  const token = JSON.parse(localStorage.getItem("officialtokens"));
  const [loading, setLoading] = React.useState(false);
  const [sendingData, setSendingData] = React.useState(false);

  React.useEffect(() => {
    console.log(
      `FROM: ${selectedFromDate.getFullYear()}-${
        selectedFromDate.getMonth() + 1
      }-${selectedFromDate.getDate()}`
    );

    console.log(
      `TO: ${selectedToDate.getFullYear()}-${
        selectedToDate.getMonth() + 1
      }-${selectedToDate.getDate()}`
    );
  }, [selectedToDate, selectedFromDate]);

  React.useEffect(() => {
    if (sendingData === true) {
      setLoading(true);
      setIsError(false);

      try {
        const fetchData = async () => {
          const result = await fetch(`${BaseUrl}/api/o/emergency-leave`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              uid: stdID.current.value,
              token: token,
              from: `${selectedFromDate.getFullYear()}-${
                selectedFromDate.getMonth() + 1
              }-${selectedFromDate.getDate()}`,
              to: `${selectedToDate.getFullYear()}-${
                selectedToDate.getMonth() + 1
              }-${selectedToDate.getDate()}`,
            }),
          });
          const res = await result.json();
          if (res.err === false) {
            setSuccessMsg("Operation Successful")
            setIsSuccess(true)
            setSendingData(false);
            stdID.current.value = "";
            setSelectedFromDate(new Date());
            setSelectedToDate(new Date());
            setLoading(false);
          } else if (res.err === true && result.status === 401) {
            logout();
          } else if (res.err === true && result.status === 422) {
            setErrorMsg("Empty Fields Detected");
            setIsError(true);
            setSendingData(false);
            setLoading(false);
          } else if (res.err === true) {
            setErrorMsg(res.msg);
            setIsError(true);
            setSendingData(false);
            setLoading(false);
          }
        };
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  }, [
    sendingData,
    token,
    stdID,
    selectedFromDate,
    selectedToDate,
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
          <GridContainer justifyContent="flex-start" alignItems="flex-start">
            <GridItem xs={12} sm={12} md={5} lg={4}>
              <FormControl fullWidth className={classes.formControl}>
              <InputLabel className={classes.label}>STUDENT UID</InputLabel>
                <TextField
                  style={{marginTop:'2.2px'}}
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  inputRef={stdID}
                  helperText="Ex: f20191435"
                />
              </FormControl>
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={5}
              lg={4}
            >
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.label}>FROM-DATE</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    format="dd/MM/yyyy"
                    variant="inline"
                    value={selectedFromDate}
                    disablePast
                    onChange={handleDateChangeFrom}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12}  md={5}  lg={4} >
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.label}>TO-DATE</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    id="date-picker-dialog"
                    format="dd/MM/yyyy"
                    disablePast
                    value={selectedToDate}
                    onChange={handleDateChangeTo}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </GridItem>
          </GridContainer>

          <GridContainer
            // direction="row"
            // alignItems="center"
            justify="flex-end"
          >
            <GridItem style={{ marginRight: "14px" }}>
              <Button
                color="success"
                disabled={loading}
                onClick={() => {
                  setSendingData(true);
                }}
              >
                Submit
              </Button>
              {loading ? <CircularProgress size={24} color="primary" /> : null}
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
              lg={12}
              style={{ marginLeft: "27px" }}
            >
              <h3>
                <b>Download CSV</b>
              </h3>
              <h4>
                Click on the button to download the .csv file of leaves for the
                current month
              </h4>
            </GridItem>
          </GridContainer>
          <GridContainer justify="flex-end" xs={12} sm={12} md={5} lg={12}>
            <Button color="success" disabled={loading} onClick={exportCsv}>
              Download
            </Button>
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
