import React from "react";
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Check from "@material-ui/icons/Check";
import CircularProgress from '@material-ui/core/CircularProgress';
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
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";


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

const useStyles = makeStyles(styles);
{/*const useComponentWillMount = func => {
  const willMount = React.useRef(true);

  if (willMount.current) {
    func();
  }

  willMount.current = false;
};*/}

export default function UserProfile() {
  const classes = useStyles();
  const {uid}=JSON.parse(localStorage.getItem("data"));
  const token=JSON.parse(localStorage.getItem("tokens"));
  const [profile,setProfile]=React.useState({});
  const [emptyError,setEmptyError]=React.useState(false);
  const [isError, setIsError] = React.useState(false);
 
  const [isFetching,setIsFetching]=React.useState(true);
  const [isEnabled,setIsEnabled]=React.useState(false);
  const [profileUpdated,setProfileUpdated]=React.useState(false);
 // const [valueChanged,setValueChanged]=React.useState(false);
  const [updatingProfile,setUpdatingProfile]=React.useState(false);
  React.useEffect(()=>{
    try{
    const fetchData= async ()=>{
      
      const result= await fetch(`http://40.121.181.70/api/usr/profile?uid=${uid}&token=${token}`) ;
      const res = await result.json();
      setProfile(res);
      setIsFetching(false);
  }
    fetchData();
    
  }catch(err){
      console.log(err);
    }
   
  },[]);
  
  React.useEffect(()=>{
    if(updatingProfile===true){
      try{
        const sendData=async ()=>{
          const result =await fetch('http://40.121.181.70/api/usr/profile',{
            method:"post",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({
              uid:uid,
              token:token,
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
         }
         else{
          
           setIsError(true);
         }
        }
        sendData();
        setIsEnabled(false);
      }
      catch(err){
        console.log(err);
      }
    }
  },[updatingProfile])  
  

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
  <h4>Fetching Users....</h4>
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
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Room No."
        id="room"
        helperText="Please update your Room No."
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.room,name:'room'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
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
          defaultValue:profile.id
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
      <div className={classes.typo} style={{marginTop:"-50px"}}>
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
           {profileUpdated?<div>
             <SnackbarContent
                message={
                    <span>
                      <b>PROFILE UPDATED SUCCESSFULLY</b>
                    </span>}
                close
                color="success"
                icon={Check}
               />
               <Clearfix />
               </div>:null}
               {emptyError?
                  <div>
                    <SnackbarContent
                      message={
                      <span >
                        <b>EMPTY FIELDS</b>:Ensure that every field is filled or set to nil
                      </span>
                        }
                      close
                      color="danger"
                      icon="info_outline"
                    />
                    <Clearfix /></div>:null}
                    {isError?
                  <div><SnackbarContent
                    message={
                      <span>
                         <b>ERROR:</b>Try logging in again
                       </span>
                             }
                    close
                    color="danger"
                    icon="info_outline"
                    />
                    <Clearfix /></div>:null}
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
            <Button  round color="info" >
             Change Password
            </Button>
          </GridItem>
          
         </GridContainer>
      </GridContainer>
    </div>
  );
}
