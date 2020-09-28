import React from "react";
import Datetime from "react-datetime";
import {Redirect} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import ChangePasswordModal from './ChangePassword';
//Auth Components
import { useAuth } from "context/auth";

import {BaseUrl} from "variables/BaseUrl";
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
    }},
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
      top:"-17px",
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
  const {uid}=JSON.parse(localStorage.getItem("data"));
  const token=JSON.parse(localStorage.getItem("tokens"));
  const [profile,setProfile]=React.useState({});
  const [hostels,setHostels]=React.useState([]);
  const [open,setOpen]=React.useState(false);
  const [emptyError,setEmptyError]=React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSessionError, setIsSessionError] = React.useState(false);
  const { onLogin } = useAuth();
  const [isFetching,setIsFetching]=React.useState(true);
  const [isEnabled,setIsEnabled]=React.useState(false);
  const [profileUpdated,setProfileUpdated]=React.useState(false);
 // const [valueChanged,setValueChanged]=React.useState(false);
  const [updatingProfile,setUpdatingProfile]=React.useState(false);
  React.useEffect(()=>{
    try{
    const fetchData= async ()=>{
      
      const result= await fetch(`${BaseUrl}/api/usr/profile?uid=${uid}`,{
        headers:{Authorization:token}
      }) ;
      const res = await result.json();
      if(res.err===false){
      setProfile(res.data.profile);
      setHostels(res.data.hostels);
      setIsFetching(false);
      }
      else if(res.err===true && result.status===401){
      setIsSessionError(true);
          logout();
        }
  }
    fetchData();
    
  }catch(err){
      console.log(err);
    }
   
  },[uid,token]);
  
  React.useEffect(()=>{
    if(updatingProfile===true){
      try{
        const sendData=async ()=>{
          const result =await fetch(`${BaseUrl}/api/usr/profile`,{
            method:"post",            
            headers:{'Content-Type':"application/json",Authorization:token},
            body:JSON.stringify({
              uid:uid,
              
              aadhaar: profile.aadhaar,
              acno: profile.acno,
              bank: profile.bank,
              blood: profile.blood,
              bonafide_no: profile.bonafide_no,
              branch: `ID dekh lo`,
              category: profile.category,
              city: profile.city,
              current_med: profile.current_med,
              dob: profile.dob,
              email: profile.email,
              father: profile.father,
              fcomp: profile.fcomp,
              fdesg: profile.fdesg,
              fmail: profile.fmail,
              foccup:profile.foccup,
              fphone: profile.fphone,
              gender: profile.gender,
              gphone: profile.gphone,
              guardian: profile.guardian,
              homeadd: profile.homeadd,
              hphone: profile.hphone,
              id: profile.id,
              ifsc: profile.ifsc,
              income: profile.income,
              localadd: profile.localadd,
              mcomp: profile.mcomp,
              mdesg: profile.mdesg,
              med_history: profile.med_history,
              mmail:profile.mmail,
              moccup: profile.moccup,
              mother: profile.mother,
              name: profile.name,
              nation: profile.nation,
              pan_card: profile.pan_card,
              phone: profile.phone,
              pimage: profile.pimage,
              hostel:profile.hostel,
              room: profile.room,
              state: profile.state,
              time:profile.time,
              
            })
           })
          if(result.status===200||result.status===201){
            setProfileUpdated(true);
            setUpdatingProfile(false);
           
          }
         else if(result.status===422){
          setEmptyError(true);
          setUpdatingProfile(false);
         
        }
        else if(result.status===401){
          setIsSessionError(true);
          logout();
        }
         else{
           setIsError(true);
           setUpdatingProfile(false);
          
         }
        }
        sendData();
        setIsEnabled(false);
      }
      catch(err){
        console.log(err);
      }
    }
  },[updatingProfile, uid, token, profile.aadhaar, profile.acno, profile.bank, profile.blood, profile.bonafide_no, profile.category, profile.city, profile.current_med, profile.dob, profile.email, profile.father, profile.fcomp, profile.fdesg, profile.fmail, profile.foccup, profile.fphone, profile.gender, profile.gphone, profile.guardian, profile.homeadd, profile.hphone, profile.id, profile.ifsc, profile.income, profile.localadd, profile.mcomp, profile.mdesg, profile.med_history, profile.mmail, profile.moccup, profile.mother, profile.name, profile.nation, profile.pan_card, profile.phone, profile.pimage, profile.room, profile.state, profile.time])  
  
  const logout=()=>{
    localStorage.removeItem("tokens");
    localStorage.removeItem("data");
    onLogin(false);  
    return (<Redirect exact to='/login-page' />);
  }

  var today = Datetime.moment();
  var valid = function( current ){
    return current.isBefore( today );
  };

 
  function onChange(e){
     const { name, value } = e.target;
     setProfile(prevState=>({
          ...prevState,
          [name]: value
      }));
      
  }
  const UserComponent=isFetching?

 

  <h4>Loading Your Profile....</h4>

  :
  <CardBody>
  <h3><b>PERSONAL DETAILS</b></h3>
  <GridContainer  justify="center">
    
    <GridItem xs={12} sm={12} md={4}>
      
      <CustomInput
        labelText="Name"
        id="name"                    
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.name,
          disabled:true
        }}
        />
    </GridItem>
    <GridItem xs={12} sm={12} md={3}>
     <FormControl fullWidth className={classes.formControl}>
      <InputLabel className={classes.labelRoot}>Hostel</InputLabel>
      <Select
        name="hostel"
        className={classes.input+" "+classes.underline}
        defaultValue={profile.hostel}
        onChange={onChange}
       >
         <MenuItem value={'NA'}>Select</MenuItem>
         {hostels.map((item)=>{
        return <MenuItem value={item.key}>{item.name}</MenuItem>
       })
         
       }
         </Select>
     </FormControl>  
    </GridItem>
    <GridItem xs={12} sm={12} md={2}>
      <CustomInput
        labelText="Room No."
        id="room"
        
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.room,name:'room'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={3}>
      <CustomInput
        labelText="Phone No."
        id="phone"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.phone,name:'phone'
        }}
        onChange={onChange}
      />                  
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="ID"
        id="myid"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.id,disabled:true
        }}
      />                  
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
    <FormControl fullWidth className={classes.formControl}>
     <InputLabel className={classes.label}>
          Birth-Date
      </InputLabel>
     <Datetime
        dateFormat="DD-MM-YYYY" 
        defaultValue={new Date(`${profile.dob}`)}
        timeFormat={false}
        className={classes.input+" "+classes.underline}
        isValidDate={valid}
        onChange={(e)=>{
          const date = new Date(`${e}`);
          const {Date1,Month,Year}={
            Date1:date.getDate(),
            Month:date.getMonth()+1,
            Year:date.getFullYear()
          }
          if(Month>9)
          setProfile(prevState=>({
            ...prevState,
            dob:`${Year}-${Month}-${Date1}`
          }));
          else
          setProfile(prevState=>({
            ...prevState,
            dob:`${Year}-0${Month}-${Date1}`
          }));
          
        }}
      />
      </FormControl>          
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
     <FormControl fullWidth className={classes.formControl}>
      <InputLabel className={classes.labelRoot}>Gender</InputLabel>
      <Select
        name="gender"
        className={classes.input+" "+classes.underline}
        value={profile.gender}
        onChange={onChange}
       >
         <MenuItem value={'M'}>Male</MenuItem>
         <MenuItem value={'F'}>Female</MenuItem>
         <MenuItem value={'Others'}>Others</MenuItem>
      </Select>
     </FormControl>  
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Aadhar Card No."
        id="aadhar"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.aadhaar,name:"aadhaar"
        }}
        onChange={onChange}
      />                  
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="PAN Card No."
        id="pan"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.pan_card,name:"pan_card"
        }}
        onChange={onChange}
      />                  
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Category"
        id="category"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.category,name:"category"
        }}
        onChange={onChange}
      />                  
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Personal Mail"
        id="mail"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          type:"email",
          defaultValue:`${profile.email}`,
          name:'email'
        }}
        onChange={onChange}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
      <CustomInput
       labelText="BITSmail"
       id="bitsmail"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          type:"email",
          defaultValue:`${profile.uid}@hyderabad.bits-pilani.ac.in`,
          disabled:true
        }}
      />
      </GridItem>
  </GridContainer>
  <h3><b>MEDICAL DETAILS</b></h3>
  <GridContainer>
    <GridItem xs={12} sm={12} md={4}>
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel className={classes.labelRoot}>Blood Group</InputLabel>
      <Select
        name="blood"
        className={classes.input+" "+classes.underline}
        value={profile.blood}
        onChange={onChange}
       >
         <MenuItem value={'A+'}>A+</MenuItem>
         <MenuItem value={'A-'}>A-</MenuItem>
         <MenuItem value={'B+'}>B+</MenuItem>
         <MenuItem value={'B-'}>B-</MenuItem>
         <MenuItem value={'AB+'}>AB+</MenuItem>
         <MenuItem value={'AB-'}>AB-</MenuItem>
         <MenuItem value={'O+'}>O+</MenuItem>
         <MenuItem value={'O-'}>O-</MenuItem>
      </Select>
     </FormControl>
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Medical History"
        id="medHistory"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          multiline:true,
          defaultValue:`${profile.med_history}`,
          name:'med_history'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Current Medication"
        id="CurrMed"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          multiline:true,
          defaultValue:`${profile.current_med}`,
          name:'current_med'
        }}
        onChange={onChange}
      />
    </GridItem>
  </GridContainer>
  <h3><b>ADDRESS</b></h3>
  <GridContainer>
    <GridItem xs={12} sm={12} md={10}>
      <CustomInput
        labelText="Address"
        id="Address"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          multiline:true,
          defaultValue:`${profile.homeadd}`,
          name:"homeadd"
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="City/Town"
        id="city"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.city,
          name:"city"
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="State"
        id="state"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.state,
          name:'state'
        }}
        onChange={onChange}
      />
    </GridItem>
    
  </GridContainer>
  <h3><b>BANK ACCOUNT DETAILS</b></h3>
  <GridContainer>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Account Number"
        id="accno"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.acno,
          name:"acno"
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Bank Name"
        id="bankname"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.bank,
          name:"bank"
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="IFSC Code"
        id="ifscCode"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.ifsc,
          name:"ifsc"
        }}
        onChange={onChange}
      />
    </GridItem>
    
  </GridContainer>
  <h3><b>LOCAL GUARDIAN'S DETAILS</b></h3>
  <GridContainer>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Name"
        id="locname"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.guardian,
          name:'guardian'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Phone No."
        id="locphno"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.gphone,
          name:'gphone'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={10}>
      <CustomInput
        labelText="Address"
        id="Address"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          multiline:true,
          defaultValue:profile.localadd,
          name:'localadd'
        }}
        onChange={onChange}
      />
    </GridItem>
    </GridContainer>
    <h3><b>OTHER DETAILS</b></h3>
  <GridContainer>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Father's Name"
        id="paname"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.father,
          name:'father'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Father's Phone No."
        id="paphno"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.fphone,
          name:'fphone'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={10}>
      <CustomInput
        labelText="Father's Email"
        id="pamail"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.fmail,
          name:'fmail'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Father's Occupation"
        id="paocc"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.foccup,
          name:'foccup'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Father's Company"
        id="pacomp"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.fcomp,
          name:'fcomp'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Father's Designation"
        id="padesg"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.fdesg,
          name:'fdesg'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Mother's Name"
        id="maname"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.mother,
          name:'mother'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Mother's Phone No."
        id="maphno"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.hphone,
          name:'hphone'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={10}>
      <CustomInput
        labelText="Mothers's Email"
        id="mamail"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.mmail,
          name:'mmail'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Mother's Occupation"
        id="maocc"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.moccup,
          name:'moccup'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Mother's Company"
        id="macomp"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.mcomp,
          name:'mcomp'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Mother's Designation"
        id="madesg"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.mdesg,
          name:'mdesg'
        }}
        onChange={onChange}
      />                  
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel className={classes.labelRoot}>Family Income</InputLabel>
      <Select
        name='income'
        className={classes.input+" "+classes.underline}
        value={profile.income}
        onChange={onChange}
       >
         <MenuItem value={'NIL'}>NIL</MenuItem>
         <MenuItem value={'INR 0-4 Lakh'}>INR 0-4 Lakh</MenuItem>
         <MenuItem value={'INR 4-8 Lakh'}>INR 4-8 Lakh</MenuItem>
         <MenuItem value={'INR 8-12 Lakh'}>INR 8-12 Lakh</MenuItem>
         <MenuItem value={'INR 12 Lakh Above'}>INR 12 Lakh Above</MenuItem>
      </Select>
     </FormControl>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Nationality"
        id="nationality"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.nation,
          name:'nation'
        }}
        onChange={onChange}
      />
      </GridItem>
  </GridContainer>
  <GridItem xs={12} sm={12}>
    <FormControlLabel
        control=
        {<Checkbox 
          checked={isEnabled}
          onChange={(e)=>{
            if(e.target.checked)
            setIsEnabled(true);
            else
            setIsEnabled(false);
        }} name="checked"
           color="primary" />}
        label={<p style={{color:"#474e59"}}>I understand that the information I provided above will be used by SWD, ARCD and other administrative divisions for their internal use/communication. I agree that all the information provided above is correct to the best of my knowledge. Any inconvenience or problem arising due to any discrepancy in the provided data shall solely be my responsibility.</p>}
      />
      </GridItem>
  </CardBody> ;

  return (
    <div>
      <div  className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>STUDENT PROFILE DETAILS</b></h4>
              <p className={classes.cardCategoryWhite}>Your Profile Must Stay Updated</p>
            </CardHeader>
            <CardBody>
             {UserComponent}
            </CardBody>
            <CardFooter>
              <Button color="info" disabled={!isEnabled} onClick={()=>{setUpdatingProfile(true)}}>Update Profile</Button>
             
            </CardFooter>
          </Card>
        </GridItem>
        <GridContainer  direction="column" >
          <GridItem  >
          <Card >
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody >
              <h6 >Your Mentor</h6>
              <h4 className={classes.cardTitle}><b>Prof. G. Sunder</b></h4>
              <h7>profmail@hyderabad.bits-pilani.ac.in</h7>
              <p>Ph No. 040-1111-1111</p>              
            </CardBody>
          </Card>
          </GridItem>
          <GridItem >
            <Button  round color="info" onClick={()=>{setOpen(true)}} >
             Change Password
            </Button>
          </GridItem>
          
         </GridContainer>
      </GridContainer>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        open={profileUpdated}
        autoHideDuration={5000}
        onClose={() => { setProfileUpdated(false) }}>
        <Alert
          onClose={() => { setProfileUpdated(false) }}
          severity="success">
          Profile Updated Successfully
                  </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        open={emptyError}
        autoHideDuration={5000}
        onClose={() => { setEmptyError(false) }}>
        <Alert
          onClose={() => { setEmptyError(false) }}
          severity="error">
          Empty fields detected!
                  </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        open={isSessionError}
        autoHideDuration={5000}
        onClose={() => { setIsSessionError(false) }}>
        <Alert
          onClose={() => { setIsSessionError(false) }}
          severity="error">
          Session Expired! Logging Out 
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
          Unknown Error Contact SWD Nucleus 
                  </Alert>
      </Snackbar>
      <ChangePasswordModal open={open} setOpen={setOpen} />
    </div>
  );
}
