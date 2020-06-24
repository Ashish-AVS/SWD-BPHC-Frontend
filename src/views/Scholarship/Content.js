import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

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

export default function Content({contentId}) {
  const classes = useStyles();
  if(contentId===0){ 
  return (
      
    <Card>
      
      <CardBody>
        <div className={classes.typo}>
  
        <h2 style={{display:"flex",justifyContent:"center"}}><b>MCN Scholarship</b></h2>        
		<h3 style={{display:"flex",justifyContent:"center"}}><strong>Documents to be Submitted</strong></h3>

<p>The following documents for the FINANCIAL YEAR 2018-19 (ASSESSMENT YEAR 2019-20) should be submitted:-<br/></p>
<p><b>If parents/guardians are:</b></p>
<p><i>Salaried/Engaged in Business/Pensioner -</i></p>
<ul>
<li> If parent(s)/guardian are <b>salaried persons/Business</b>, Copy of <b>ITR V along with Computation of income</b> stamped by IT department clearly showing the gross income can  be submitted (Copy of E-Filing of returns is also valid). It should also be noted that the parents(s)/gaurdians with no income must also submit a copy of <b>ITR V along with the computation of Income</b>.</li>
<li> If Engaged in <b>Agriculture only</b>, Original Income Certificate from <b>Mandal Revenue Officer</b> gross income for the <b>financial year 2018-2019 (ASSESSMENT YEAR 2019-20)</b> based on the income of the preceding financial year along with parents bank statement for the last six months. In case of any education loan, a copy of loan sanction letter to be submitted.</li>
<li> <b>Pensioners</b> shall submit the Retirement letter along with ITR and bank statement showing the pension credited. In case of any educational loan, a copy of loan sanction letter to be submitted.</li>
</ul>
<b>NOTE</b><br/>
<ol>
<li> <b>AFFIDAVITS </b> are directly rejected.</li>
<li> <b>Mere income statements</b> and <b>declarations</b> by parents/their employers, notary affidavit, certificate from bank, annual pension statements etc will not be accepted.</li>
<li> <b>Fax / SCANNED COPIES</b> of any form is<b> NOT </b>acceptable.</li>
<li> Income certificates of<b> BOTH </b>parents must be provided in case both are earning persons.</li>
<li> All the income statements should be for the Financial Year 2018-19 (Assessment Year 2018-19) dated after 1st April 2019.</li>
<li> Income statements of <b>earlier years</b> will be <b>directly rejected.</b></li>
<li> If an application is found to have forged, photoshopped documents that the applicant is <b>liable for disciplinary action</b> in addition to a fiscal penalty incommensurate with the nature of the offense.</li>
<li> It is also mandatory to declare all the personal bank statements of the parent/gaurdian which is linked to Aadhaar/PAN card numbers submitted.</li>
</ol>
<h3 style={{display:"flex",justifyContent:"center"}}><strong>THE ELIGIBILTY CRITERIA FOR AWARD OF SCHOLARSHIP</strong></h3>
<ul>
<li> The scholarships are awarded to students based on <b>CGPA</b> and income limit fixed by Scholarships Committee.</li>
<li> No case of <b>indiscipline</b> in the semester for which scholarship is applied.</li>
<li> Not availing <b>other scholarships</b>, which stipulates that student will not receive any other scholarship.</li>
<li> In case of any ambiguity, certificates in original should be produced by the student on demand.</li>
<li> Any discrepancies in the Parents details provided when compared with the previous semester the application will be directly rejected without any intimation.</li>
<li> Both the Parents/guardians gross total income should be clearly mentioned.</li>
<li> The online application for MCN should be filled in very clearly and <b>no changes will be encouraged later</b>.</li>
<li> All the applications, documents and certificates will be scrutinized by the authorities.</li>
{/*<li> Students availing Educational loan shall upload their sanction letter <b>(PDF only)</b> in SWD Portal.</li>*/}
</ul>
<p><b>It is the responsibility of all the students to <b>check notices and SWD Portal or contact the SWD office </b>for details of the MCN Scholarship.<br/>

    All decisions of the Scholarships Committee are final and binding.</b></p>

		<p><b>NOTE:</b> If any of the above documents are not available, Please contact SWD Office</p>
		
            </div>
      </CardBody>
    
    </Card>
    );
    }
    else if(contentId===1){
    return(
    <Card>
      
      <CardBody>
        <div className={classes.typo}>

        <h2 style={{display:"flex",justifyContent:"center"}}><b>SAF Scholarship</b></h2>
		
		<h3 style={{display:"flex",justifyContent:"center"}}><b>Procedure</b></h3>
		<p>
			Eligible students shall apply through SWD PORTAL from 05/11/2019 to 15/11/2019 and submit
			the downloaded Application form with all relevant details before 20/11/2019 from 9:30 am to
			4:30 pm.. Incomplete applications will not be considered under any circumstances.
			Latest income certificate(s) should be submitted before the deadline along with the
			downloaded Application form.</p>
		<p>
			A proper income proof indicating the TOTAL GROSS INCOME shall be submitted. Original
			Income certificates of both parents, if both are employed, should be submitted. Those in
			service should submit the IT Returns indicating gross income for the financial year
			2018-19 (AY 2019-20). Pensioners should submit a statement from bank/post office
			from where pension is drawn.</p>
		<p>
			Photocopies of pension books (except attested copy of Form-16) or any other
			document(s) as proof of income are not acceptable.
		</p>
		<p>
			THE LAST DATE FOR RECEIPT OF APPLICATIONS BY THE STUDENT
			WELFARE DIVISION OFFICE is 28/11/2019.</p>
		<p><b>NOTE: </b>No application will be entertained under any circumstances, if received after
			the deadline.</p>
		<center><h3>The following documents <b>(Hard Copy)</b> have to be submitted along with the Application <b>2019-2020:</b></h3></center>
		<ul><b>
		<li>ITR V along with the computation of income (Father/Guardian)</li>
		<li>ITR V along with the computation of income (Mother)</li>
		<li>Form-16 (If applicable)</li>
		<li>Pensioners (Pension Certificate if applicable)</li>
		<li>Tehsildar Certificate/ Mandal Revenue Officer Certificate (If Applicable)</li>
		<li>Bank Statement (Father/Guardian)</li>
		<li>Bank Statement (Mother)</li>
		 </b></ul>


            </div>
      </CardBody>
     <CardFooter>
         <Button round color="info">Download Application</Button>
     </CardFooter>
    </Card>);
    }
      
}
