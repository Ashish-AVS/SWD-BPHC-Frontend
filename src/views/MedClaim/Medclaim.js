import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import BaseUrl from "variables/BaseUrl";
import { set } from "d3";
const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
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
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Medclaim() {
  const [polNo,setPolNo]=React.useState("");
  const classes = useStyles();
  const token = JSON.stringify(localStorage.getItem("tokens"));
  const medData=React.useState({})
  React.useEffect(()=>{
    try{
    const fetchData1= async ()=>{
      const result= await fetch(`${BaseUrl}/api/ll/insurance`,{
        headers:{Authorization:token}
      }) ;
      const res = await result.json();
      if(res.err===false){
      setPolNo(res.data.pol_no);
      }
      else if(res.err===true) {
          alert(res.msg)
      }  
  }
    fetchData1();
    
  }catch(err){
      console.log(err);
    }
  
  },[token]);
  return (
      <div>
        <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
    <Card>
      <CardHeader color="success">
        <h4 className={classes.cardTitleWhite}><b>MEDICAL INSURANCE DETAILS</b></h4>
        
      </CardHeader>
      <CardBody>
      <h3 style={{display:"flex",justifyContent:"center"}}><b>POLICY DETAILS OF INSTITUTE</b></h3>
      <p><b>Policy Number:</b>51-20-00561-00-00<br/>
		<b>Insured Name:</b> M/s Birla Institute of Technology and Science Pilani Hyd<br/>
		<b>Period of Insurance:</b> From 00:01 Hrs of 03/09/2020 To Midnight 23:59 Hrs of 02/09/2021<br/><br/>

		<b>Name:</b> Raju Kumar, ADITYA BIRLA INSURANCE BROKERS LTD<br/>
		<b>Email:</b> <a href="mailto:raju.r.kumar@adityabirlacapital.com">raju.r.kumar@adityabirlacapital.com</a><br/>
		<b>Mobile Number:</b>+91 8510006711<br/><br/></p>
		<b><p>For Group Mediclaim Policy Ready Reckoner of BITS Pilani Hyderabad Campus for AY 2020 - 21 :</p></b><Button disabled round color="primary">Click Here</Button><br/><br/>
		<p><b>For Policy related assistance:</b> Contact Mr. Prasant Inturi on 9010202837 or Visit SWD office</p>
		<b><p>For more details:</p></b><Button disabled round color="primary">Click Here</Button><br/>
		<center><p><b>OR</b></p></center>
		<p>Please feel free to write to them on <b><a href="mailto:care@libertyvideocon.com?subject=Query Regarding Medical Insurance Policy">care@libertyvideocon.com</a></b></p>
		<center><p><b>OR</b></p></center>
		<p>Call the Toll Free number <b>1800 266 5844</b> (between 8:00 am to 8:00 pm, 7 days of the week) for help.<br/> For Claim related assistance: Please feel free to write to them on Email ID or call the Toll Free number</p><br/>


		<h3 style={{display:"flex",justifyContent:"center"}}><b>POLICY DETAILS OF STUDENT</b></h3>
		<p><b>Policy Number:</b> 51-20-00561-00-00</p>
  <p><b>Membership ID:</b> {polNo}</p>
      </CardBody>
      <CardFooter>
          <Button round color="primary" disabled> Download PDF</Button>
      </CardFooter>
    </Card>
  </div>
    );
}
