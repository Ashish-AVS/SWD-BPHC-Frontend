import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";
import Button from "components/CustomButtons/Button.js";

const styles = {
  typo: {
    paddingLeft: "10%",
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

export default function SAF() {
  const classes = useStyles();
  
    return(
    
      
      <CardBody>
    <h2 style={{display:"flex",justifyContent:"center"}}><b>SAF Scholarship</b></h2>
		<h3 style={{display:"flex",justifyContent:"center"}}><b>Procedure</b></h3>
		<p>
			Eligible students shall apply through SWD PORTAL from <b>17/04/2021 to 25/04/2021</b> and submit
			the downloaded Application form with all relevant details before <b> 25/04/2021 </b>. Incomplete applications will not be considered under any circumstances.<br/>
			<b>Latest income certificate(s),</b>. should be submitted before the deadline along with the
			downloaded Application form.</p>
		<p>
			A proper income proof indicating the TOTAL GROSS INCOME shall be submitted. Original
			Income certificates of both parents, should be submitted. Those in
			service should submit the IT Returns indicating gross income for the financial year  
			<b> 2019-20 (AY 2020-21)</b>.<br/> Pensioners should submit a statement from bank/post office
			from where pension is drawn.Photocopies of pension books (except attested copy of Form-16) or any other
			document(s) as proof of income are not acceptable.</p>
		
		<p>
			THE LAST DATE FOR RECEIPT OF APPLICATIONS BY THE STUDENT
			WELFARE DIVISION OFFICE is<b> 25/04/2021.</b></p>
		<p><b>NOTE: </b>No application will be entertained under any circumstances, if received after
			the deadline.</p>
		{/* <center><h3>The following documents <b>(Hard Copy)</b> have to be submitted along with the Application <b>2019-2020:</b></h3></center>
		<ul><b>
		<li>ITR V along with the computation of income (Father/Guardian)</li>
		<li>ITR V along with the computation of income (Mother)</li>
		<li>Form-16 (If applicable)</li>
		<li>Pensioners (Pension Certificate if applicable)</li>
		<li>Tehsildar Certificate/ Mandal Revenue Officer Certificate (If Applicable)</li>
		<li>Bank Statement (Father/Guardian)</li>
		<li>Bank Statement (Mother)</li>
		 </b></ul> */}


      </CardBody>);
     {/* <CardFooter>
         <Button round color="info" disabled>Download Application</Button>
     </CardFooter> */}
    
    
      
}
