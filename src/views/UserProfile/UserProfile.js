import React from "react";
import Datetime from "react-datetime";
import { Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AlertComponent from "components/Alert/Alert";

// Child Components
import ChangePasswordModal from './ChangePassword';
import PersonalDetails from "./PersonalDetails";
import MedicalDetails from "./MedicalDetails";
import AddressDetails from "./AddressDetails";
import BankDetails from "./BankDetails";
import OtherDetails from "./OtherDetails";
//Auth Components
import { useAuth } from "context/auth";

import { BaseUrl } from "variables/BaseUrl";
import avatar from "assets/img/bitslogo.png";
import {
  primaryColor,
  defaultFont
} from "assets/jss/material-kit-react.js";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  typo: {
    paddingLeft: "25%",
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
    textDecoration: "none"
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
      marginTop: "0px"
    }
  },
  input: {
    color: "#495057",
    height: "unset",
    "&,&::placeholder": {
      fontSize: "14px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "400",
      lineHeight: "1.42857",
      opacity: "1"
    },
    "&::placeholder": {
      color: "#AAAAAA"
    }
  },
  formControl: {
    margin: "0 0 17px 0",
    paddingTop: "27px",
    position: "relative",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: primaryColor
    }
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
      marginTop: "0px"
    }
  },
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const { uid } = JSON.parse(localStorage.getItem("data"));
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [profile, setProfile] = React.useState({});
  const [hostels, setHostels] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [emptyError, setEmptyError] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSessionError, setIsSessionError] = React.useState(false);
  const { onLogin } = useAuth();
  const [isFetching, setIsFetching] = React.useState(true);
  const [fileSizeError, setFileSizeError] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [profileUpdated, setProfileUpdated] = React.useState(false);
  const [mentorData, setMentorData] = React.useState(false);
  // const [valueChanged,setValueChanged]=React.useState(false);
  const [updatingProfile, setUpdatingProfile] = React.useState(false);
  React.useEffect(() => {
    try {
      const fetchData = async () => {

        const result = await fetch(`${BaseUrl}/api/usr/profile`, {
          headers: { Authorization: token }
        });
        const res = await result.json();
        if (res.err === false) {
          setProfile(res.data.profile);
          setHostels(res.data.hostels);
          setIsFetching(false);
        }
        else if (res.err === true && result.status === 401) {
          setIsSessionError(true);
          logout();
        }
      }
      fetchData();
      const fetchData1 = async () => {

        const result = await fetch(`${BaseUrl}/api/ll/mentor`, {
          headers: { Authorization: token }
        });
        const res = await result.json();
        if (res.err === false) {
          setMentorData(res.data)

        }
        else if (res.err === true && result.status === 401) {
          setIsSessionError(true);
          logout();
        }
      }
      fetchData1();

    } catch (err) {
      console.log(err);
    }

  }, [uid, token]);

  React.useEffect(() => {
    if (updatingProfile === true) {
      try {
        const sendData = async () => {
          let dp = profile.dp || '';
          if (parseInt(profile.uploadImage) === 1 && dp.length < 5) {
            setIsError(true);
            setUpdatingProfile(false);
            return;
          }
          const result = await fetch(`${BaseUrl}/api/usr/profile`, {
            method: "post",
            headers: { 'Content-Type': "application/json", Authorization: token },
            body: JSON.stringify({
              uid: uid,
              aadhaar: profile.aadhaar || 'null',
              acno: profile.acno || 'null',
              bank: profile.bank,
              blood: profile.blood,
              bonafide_no: profile.bonafide_no,
              category: profile.category,
              city: profile.city,
              current_med: profile.current_med || 'NA',
              dob: profile.dob,
              email: profile.email,
              father: profile.father,
              fcomp: profile.fcomp,
              fdesg: profile.fdesg,
              fmail: profile.fmail,
              foccup: profile.foccup,
              fphone: profile.fphone,
              gender: profile.gender,
              gphone: profile.gphone,
              guardian: profile.guardian,
              homeadd: profile.homeadd || 'NA',
              hphone: profile.hphone,
              id: profile.id,
              ifsc: profile.ifsc,
              income: profile.income,
              localadd: profile.localadd,
              mcomp: profile.mcomp,
              mdesg: profile.mdesg,
              med_history: profile.med_history || 'NA',
              mmail: profile.mmail,
              moccup: profile.moccup,
              mother: profile.mother,
              name: profile.name,
              nation: profile.nation,
              pan_card: profile.pan_card,
              phone: profile.phone,
              alt_phone: profile.alt_phone,
              dp: profile.dp,
              hostel: profile.hostel,
              room: profile.room || 'NA',
              dist: profile.dist,
              state: profile.state,
              pin_code: profile.pin_code,
              time: profile.time,
            })
          })
          if (result.status === 200 || result.status === 201) {
            setProfileUpdated(true);
            setUpdatingProfile(false);

          }
          else if (result.status === 422) {
            setEmptyError(true);
            setUpdatingProfile(false);

          }
          else if (result.status === 401) {
            setIsSessionError(true);
            logout();
          }
          else {
            setIsError(true);
            setUpdatingProfile(false);
          }
        }
        sendData();
        setIsEnabled(false);
      }
      catch (err) {
        console.log(err);
      }
    }
  }, [updatingProfile, uid, token, profile.aadhaar, profile.acno, profile.bank, profile.blood, profile.bonafide_no, profile.category, profile.city, profile.current_med, profile.dob, profile.email, profile.father, profile.fcomp, profile.fdesg, profile.fmail, profile.foccup, profile.fphone, profile.gender, profile.gphone, profile.guardian, profile.homeadd, profile.hphone, profile.id, profile.ifsc, profile.income, profile.localadd, profile.mcomp, profile.mdesg, profile.med_history, profile.mmail, profile.moccup, profile.mother, profile.name, profile.nation, profile.pan_card, profile.phone, profile.pimage, profile.room, profile.state, profile.time])

  const logout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("data");
    onLogin(false);
    return (<Redirect exact to='/login-page' />);
  }

  var today = Datetime.moment();
  var valid = function (current) {
    return current.isBefore(today);
  };


  function onChange(e) {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));

  }

  async function onImgChange(e) {
    const file = e.target.files[0];
    if (file.size > 2000000) {
      setFileSizeError(true);
    }
    else if (file !== undefined) {
      setFileSizeError(false)
      const base64 = await convertTobase64(file);
      setProfile(prevState => ({
        ...prevState,
        dp: base64
      }))
    }
  }
  function convertTobase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const UserComponent = isFetching ?
    <h4>Loading Your Profile....</h4> :
    <CardBody>
      <PersonalDetails
        classes={classes}
        profile={profile}
        setProfile={setProfile}
        hostels={hostels}
        onChange={onChange}
        valid={valid}
      />
      <MedicalDetails
        classes={classes}
        profile={profile}
        setProfile={setProfile}
        hostels={hostels}
        onChange={onChange}
        valid={valid}
      />
      <AddressDetails
        classes={classes}
        profile={profile}
        setProfile={setProfile}
        hostels={hostels}
        onChange={onChange}
        valid={valid}
      />
      <BankDetails
        classes={classes}
        profile={profile}
        setProfile={setProfile}
        hostels={hostels}
        onChange={onChange}
        valid={valid}
      />
      <OtherDetails
        classes={classes}
        profile={profile}
        setProfile={setProfile}
        hostels={hostels}
        onChange={onChange}
        valid={valid}
      />


      {profile.uploadImage === 1 ?
        <GridItem style={{ marginBottom: '50px' }}>
          <h4><b>IMAGE FOR ID CARD</b>(One Time Only)</h4>
          <p >Hello ,{profile.name}<br /> Kindly upload your passport size picture below in .jpg/.jpeg format only (Maximum size-<b> 2MB</b>)</p>
          <input name="p_img" type='file' accept="image/jpeg" style={{ marginTop: '10px' }} onChange={onImgChange}></input>
          {fileSizeError ? <p style={{ color: 'red' }}>*File size limit exceeded</p> : null}
        </GridItem> : null}
      <GridItem xs={12} sm={12} >
        <FormControlLabel
          control=
          {<Checkbox
            checked={isEnabled}
            onChange={(e) => {
              if (e.target.checked)
                setIsEnabled(true);
              else
                setIsEnabled(false);
            }} name="checked"
            color="primary" />}
          label={<p style={{ color: "#474e59" }}>I understand that the information I provided above will be used by SWD, ARCD and other administrative divisions for their internal use/communication. I agree that all the information provided above is correct to the best of my knowledge. Any inconvenience or problem arising due to any discrepancy in the provided data shall solely be my responsibility.</p>}
        />
      </GridItem>
    </CardBody>;

  return (
    <div>
      <div className={classes.typo} style={{ marginTop: "-50px" }}>
        <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>STUDENT PROFILE DETAILS</b></h4>
              {/* <p className={classes.cardCategoryWhite}>Your Profile Must Stay Updated</p> */}
            </CardHeader>
            <CardBody>
              {UserComponent}
            </CardBody>
            <CardFooter>
              <Button color="primary" round disabled={!isEnabled} onClick={() => { setUpdatingProfile(true) }}>Update Profile</Button>

            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <GridContainer direction="column" >
            {mentorData.length === 1 ?
              <GridItem >
                <Card >
                  <CardAvatar profile>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={avatar} alt="..." />
                    </a>
                  </CardAvatar>
                  <CardBody >
                    <h6 >Your Mentor</h6>
                    <h4 className={classes.cardTitle}><b>{mentorData[0].prof_name}</b></h4>
                    <h7><b>
                      <a href={`mailto:${mentorData[0].prof_mail}?subject=Query`}> {mentorData[0].prof_mail}</a>
                    </b> </h7>

                  </CardBody>
                </Card>
              </GridItem> : null}

            <GridItem >
              <Button round color="primary" onClick={() => { setOpen(true) }} >
                Change Password
              </Button>
            </GridItem>

          </GridContainer>
        </GridItem>
      </GridContainer>
      <AlertComponent 
         type="success"
         isOpen={profileUpdated}
         msg={"Profile Updated Successfully"}
         handleClose={() => { setProfileUpdated(false)}}
      />
      <AlertComponent 
         type="error"
         isOpen={emptyError}
         msg={"Empty Fields Detected !"}
         handleClose={() => { setEmptyError(false) }}
      />
      <AlertComponent 
         type="error"
         isOpen={isSessionError}
         msg={"Session Expired! Logging Out"}
         handleClose={() => { setIsSessionError(false) }}
      />
      <AlertComponent 
         type="error"
         isOpen={isError}
         msg={"An error occured, check details again."}
         handleClose={() => { setIsError(false) }}
      />
      <ChangePasswordModal open={open} setOpen={setOpen} />
    </div>
  );
}
