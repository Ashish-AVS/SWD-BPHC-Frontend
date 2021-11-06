import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import BarcodeReader from 'react-barcode-reader';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

//Auth Components
import { useAuth } from "context/auth";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import AlertComponent from "components/Alert/Alert";
import { BaseUrl } from "variables/BaseUrl";
import { primaryColor, defaultFont } from "assets/jss/material-kit-react.js";

//Media elements
import tickImage from "../../../assets/img/accept.png";
import crossImage from "../../../assets/img/cancel.png";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  typo: {
    paddingLeft: "20%",
    marginBottom: "30px",
    position: "relative",
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
    color: "rgba(0, 0, 0, 0.26)",
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
};

const useStyles = makeStyles(styles);

export default function MessLog() {
  const token = JSON.parse(localStorage.getItem("officialtokens"));
  const [uid, setUid] = React.useState("");
  const [mealType, setMealType] = React.useState(0);
  const [sendingData, setSendingData] = React.useState(false);
  const [success, setSuccess] = React.useState(-1);
  const [msg, setMsg] = React.useState("");
  const { onOfficialLogin } = useAuth();
  const classes = useStyles();

  const logout = () => {
    localStorage.removeItem("officialtokens");
    onOfficialLogin(false);
    return <Redirect exact to="/" />;
  };

  const sendData = async () => {
    // check the uid
    let u = uid;
    u = u.toLowerCase();
    if (u[u.length - 1] === 'h') {
      u = u.substr(0, uid.length - 1);
    }
    let data = {
      uid: u,
      meal_type: mealType,
    };
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      let res = await axios.post(`${BaseUrl}/api/o/messlog`, data, {
        headers: headers,
      });
      if (res.data.err) {
        setSuccess(0);
      } else {
        setSuccess(1);
      }
      setMsg(res.data.msg);
    } catch (e) {
      console.log(e);
      alert("error");
    }
    setUid('');
    setSendingData(false);
  };

  React.useEffect(() => {
    if (sendingData) {
      sendData();
    }
  }, [sendingData]);

  React.useEffect(() => {
    var userInput = document.getElementById("uid");
    userInput.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        setSendingData(true);
      }
    });
    let u = '';
    document.addEventListener("keydown", (e) => {
      
      if(e.keyCode == 16 || e.keyCode == 17) {
        e.preventDefault();
      } else {
        alert(String.fromCharCode(e.keyCode));
        u += e.key;
      }
    });
  });

  return (
    <div>
      <div className={classes.typo} style={{ marginTop: "-70px" }}>
        <h2>
          <strong>BITS PILANI, HYDERABAD CAMPUS</strong>
        </h2>
      </div>
      <GridContainer justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <b>MESS LOG</b>
              </h4>
            </CardHeader>
            <CardBody>
              <h3 style={{ display: "flex", justifyContent: "center" }}>
                <b>MAKE ENTRY</b>
              </h3>
              <GridContainer
                direction="row"
                justify="center"
                alignItems="center"
              >
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel className={classes.labelRoot}>Meal</InputLabel>
                    <Select
                      name="meal_type"
                      className={classes.input + " " + classes.underline}
                      defaultValue={"breakfast"}
                      value={mealType}
                      onChange={(e) => {
                        setMealType(e.target.value);
                      }}
                    >
                      <MenuItem value={0}>Breakfast</MenuItem>
                      <MenuItem value={1}>Lunch</MenuItem>
                      <MenuItem value={2}>Snacks</MenuItem>
                      <MenuItem value={3}>Dinner</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="UID (Eg. f2019xxxx)"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      id: "uid",
                      name: "uid",
                      value: uid,
                      onChange: (e) => {
                        setUid(e.target.value);
                      },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Button
                    type="submit"
                    color="success"
                    disabled={sendingData}
                    onClick={() => {
                      setSendingData(true);
                    }}
                  >
                    Log
                  </Button>
                </GridItem>
              </GridContainer>
              <GridContainer
                direction="row"
                justify="center"
                alignItems="center"
              >
                <GridItem xs={12} sm={12} md={12} justifyContent="center">
                  <center>
                    {success === 1 && <img src={tickImage} height={120} />}
                    {success === 0 && <img src={crossImage} height={120} />}
                    <br />
                    <h3>{msg}</h3>
                  </center>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <BarcodeReader
        onError={(err) => {
          alert('Error');
        }}
        onScan={(data) => {
          alert('Success');
        }} 
      /> */}
    </div>
  );
}
