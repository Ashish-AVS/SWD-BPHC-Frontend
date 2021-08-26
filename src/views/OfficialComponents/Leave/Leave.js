import React from "react";
// import MaterialTable from "material-table";
import Datetime from "react-datetime";
import { Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// core components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Check from "@material-ui/icons/Check";
//import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Badge from "components/Badge/Badge.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import CancelOutstation from "./CancelOutstation";

//Auth Components
import { useAuth } from "context/auth";

import { BaseUrl } from "variables/BaseUrl";
import { primaryColor, defaultFont } from "assets/jss/material-kit-react.js";
const styles = {
  // typo: {
  //   paddingLeft: "25%",
  //   marginBottom: "40px",
  //   position: "relative",
  // },
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
    margin: "0 0 17px 0",
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

const useStyles = makeStyles(styles);

export default function Leave() {
  const classes = useStyles();
  const { onLogin } = useAuth();
  const [isError, setIsError] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  // const { uid } = JSON.parse(localStorage.getItem("data"));
  const token=JSON.parse(localStorage.getItem("officialtokens"));
  const [loading, setLoading] = React.useState(false);
  const [reqSent, setReqSent] = React.useState(false);
  const [sendingData, setSendingData] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [cancelId, setCancelId] = React.useState(null);
  const [isUpdated, setIsUpdated] = React.useState(null);
  const [data, setData] = React.useState({
    from: "",
    to: "",
    uid: ""
  });

  /**  DATE FUNCTION - To prevent showing dates before today  **/
  var yesterday = Datetime.moment().subtract(1, "day");
  var validfrom = function (current) {
    return current.isAfter(yesterday);
  };

  /* ********** */


  React.useEffect(() => {
    if (sendingData === true) {
      setLoading(true);
      setReqSent(false);
      setIsError(false);

      try {
        const fetchData = async () => {
          const result = await fetch(`${BaseUrl}/`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              from: data.from,
              to: data.to,
              uid: data.uid
            })
          });
          const res = await result.json();
          if (res.err === false) {
            setData({
              from: "",
              to: "",
              uid: ""
            });
          } else if (res.err === true && result.status === 401) {
            logout();
          } else if (res.err === true && result.status === 422) {
            setMsg("Empty Fields Detected");
            setIsError(true);
          } else if (res.err === true) {
            setMsg(res.msg);
            setIsError(true);
          }
          setLoading(false);

        };
        fetchData();
        setSendingData(false);
      } catch (err) {
        console.log(err);
      }
    }
  }, [
    sendingData,
    // uid,
    token,
    data.from,
    data.to,
    data.uid,
    data.location,
  ]);

  const logout = () => {
    localStorage.removeItem("officialtokens");
    localStorage.removeItem("data");
    onLogin(false);
    return <Redirect exact to="/official-login" />;
  };

  function onChange(e) {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  return (
    <div>
      <GridContainer justify="center" alignItems="center">
        <GridItem >
            <h2>
              <strong>STUDENT WELFARE DIVISION</strong>
            </h2>
        </GridItem>
      </GridContainer>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            <b>EMERGENCY LEAVE </b>
          </h4>
        </CardHeader>
        <CardBody>
          {reqSent ? (
            <div>
              <SnackbarContent
                message={
                  <span>
                    <b>OUTSTATION REQUEST SENT SUCCESSFULLY</b>
                  </span>
                }
                close
                color="success"
                icon={Check}
              />
              <Clearfix />
            </div>
          ) : null}
          {isError ? (
            <div>
              <SnackbarContent
                message={
                  <span>
                    <b>ERROR:</b>
                    {msg}
                  </span>
                }
                close
                color="danger"
                icon="info_outline"
              />
              <Clearfix />
            </div>
          ) : null}
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            <b>APPLY FOR OUTSTATION</b>
          </h3>
          <GridContainer justify="center" alignItems="center">
            <GridItem xs={12} sm={12} md={5}>
              <CustomInput
                labelText="UID"
                // helperText="Enter the ID in the format f20XXYYYY"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  multiline: true,
                  name: "uid",
                  value: data.uid,
                }}
                onChange={onChange}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.label}>FROM-DATE</InputLabel>
                <Datetime
                  dateFormat="DD-MM-YYYY"
                  timeFormat={false}
                  className={classes.input + " " + classes.underline}
                  isValidDate={validfrom}
                  value={data.from}
                  onChange={(e) => {
                    const date = new Date(`${e}`);
                    const { Date1, Month, Year } = {
                      Date1: date.getDate(),
                      Month: date.getMonth() + 1,
                      Year: date.getFullYear(),
                    };
                    if (Month > 9) {
                      if (Date1 < 10) {
                        setData((prevState) => ({
                          ...prevState,
                          from: `${Year}-${Month}-0${Date1}`,
                        }));
                      } else
                        setData((prevState) => ({
                          ...prevState,
                          from: `${Year}-${Month}-${Date1}`,
                        }));
                    } else {
                      if (Date1 < 10)
                        setData((prevState) => ({
                          ...prevState,
                          from: `${Year}-0${Month}-0${Date1}`,
                        }));
                      else
                        setData((prevState) => ({
                          ...prevState,
                          from: `${Year}-0${Month}-${Date1}`,
                        }));
                    }
                  }}
                />
              </FormControl>
            </GridItem>

            <GridItem xs={12} sm={12} md={5}>
              <CustomInput
                labelText="Location of Travel"
                onChange={onChange}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: "location",
                  value: data.location,
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.label}>TO-DATE</InputLabel>
                <Datetime
                  dateFormat="DD-MM-YYYY"
                  timeFormat={false}
                  className={classes.input + " " + classes.underline}
                  isValidDate={validfrom}
                  value={data.to}
                  onChange={(e) => {
                    const date = new Date(`${e}`);
                    const { Date1, Month, Year } = {
                      Date1: date.getDate(),
                      Month: date.getMonth() + 1,
                      Year: date.getFullYear(),
                    };
                    if (Month > 9) {
                      if (Date1 < 10) {
                        setData((prevState) => ({
                          ...prevState,
                          to: `${Year}-${Month}-0${Date1}`,
                        }));
                      } else
                        setData((prevState) => ({
                          ...prevState,
                          to: `${Year}-${Month}-${Date1}`,
                        }));
                    } else {
                      if (Date1 < 10)
                        setData((prevState) => ({
                          ...prevState,
                          to: `${Year}-0${Month}-0${Date1}`,
                        }));
                      else
                        setData((prevState) => ({
                          ...prevState,
                          to: `${Year}-0${Month}-${Date1}`,
                        }));
                    }
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <GridContainer
                direction="row"
                justify="center"
                alignItems="center"
              >
                <GridItem>
                  <Button
                    color="success"
                    disabled={loading}
                    onClick={() => {
                      setSendingData(true);
                    }}
                  >
                    Submit
                  </Button>
                  {loading ? (
                    <CircularProgress size={24} color="primary" />
                  ) : null}
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
      
    </div>
  );
}
