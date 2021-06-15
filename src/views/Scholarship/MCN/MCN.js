import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components

import CardBody from "components/Card/CardBody.js";

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

export default function MCN() {
  const classes = useStyles();
  
 
  
  
  return (
      

          <CardBody>
              <div className={classes.typo}>

                  <h2 style={{ display: "flex", justifyContent: "center" }}><b>MCN Scholarship</b></h2>
                  <h3 style={{textTransform:'uppercase', display: "flex", justifyContent: "center" }}><strong>Documents to be Submitted</strong></h3>

                  <div>
  <p>The following documents for the FINANCIAL YEAR 2019-20 (ASSESSMENT YEAR 2020-21) should be submitted: -</p>
  <p><strong>If parents/guardians are:</strong></p>
  <ul>
    <li><strong>Salaried employee/ Business</strong></li>
  </ul>
  <ol>
    <li>ITR V acknowledgment (ASSESSMENT YEAR 2020-21)</li>
    <li>Computation of income/ Form 16</li>
    <li>Bank statements for one financial year ( 1st April 2019- 31st March 2020)</li>
  </ol>
  <ul>
    <li><strong>Engaged in Agriculture</strong></li>
  </ul>
  <ol>
    <li>Original Income Certificate from Mandal Revenue Officer gross income for the financial year 2019-2020 (ASSESSMENT YEAR 2020-21)</li>
    <li>Bank statements for one financial year ( 1st April 2019- 31st March 2020)</li>
  </ol>
  <ul>
    <li><strong>Pensioners</strong></li>
  </ul>
  <ol>
    <li>Retirement letter/Pension Certificate Copy</li>
    <li>ITR V acknowledgment (ASSESSMENT YEAR 2020-21)</li>
    <li>Bank statements for one financial year ( 1st April 2019- 31st March 2020) showing the pension credited.</li>
  </ol>
  <ul>
    <li><strong>Non earning parent </strong>(Ex: Homemaker)</li>
  </ul>
  <ol>
    <li>ITR V acknowledgment (ASSESSMENT YEAR 2020-21)</li>
    <li>Bank statements for one financial year ( 1st April 2019- 31st March 2020)</li>
  </ol>
  <ul>
    <li><strong> Cases</strong></li>
    <li>In case of the demise of a parent, a copy of the death certificate must be attached.</li>
    <li>If parents are separated/divorced, they need to check with the committee for the documents requirements.</li>
    <li>In the case of an Educational Loan, a copy of the loan sanction letter should be submitted.</li>
  </ul>
  <p><strong>NOTE</strong></p>
  <ol>
    <li><strong>AFFIDAVITS </strong>are directly rejected.</li>
    <li><strong>Mere income statements</strong> and <strong>declarations</strong> by parents/their employers, notary affidavit, a certificate from bank, annual pension statements, etc., will not be accepted.</li>
    <li>Every document needs to be self-attested with a date of submission.(Signature on the first page of every document by your parents)</li>
    <li>Income certificates of<strong> BOTH </strong>parents must be provided irrespective of whether or not they are earning.</li>
    <li>All the income statements should be for the Financial Year 2019-20 (Assessment Year 2020-21).</li>
    <li>Income statements for <strong>earlier years</strong> will be <strong>directly rejected.</strong></li>
    <li>If an application or the documents enclosed are found to be forged/ photoshopped, the applicant is <strong>liable for disciplinary action</strong> in addition to a fiscal penalty incommensurate with the nature of the offense.</li>
    <li>It is also mandatory to declare all the personal bank statements of the parent/guardian, which is linked to Aadhaar/PAN card numbers submitted.</li>
  </ol>
  <h3 style={{textTransform:'uppercase',display:'flex',justifyContent:'center'}}><b>Guidelines for document upload</b></h3>
  <ol>
    <li>Documents must be added to a folder and compressed to a <b>zip file</b>.</li>
    <li>The folder must be named as Id number_Name (20*******H_Name)</li>
    <li>Each document must be renamed as idnumber_nameofthedoc (20*******H_ITR_Father)</li>
    <li>Every document needs to be self-attested with a date of submission.</li>
  </ol>
  <h3 style={{textTransform:'uppercase',display:'flex',justifyContent:'center',marginTop:'30px'}}><b>THE ELIGIBILITY CRITERIA FOR AWARD OF SCHOLARSHIP</b></h3>
  <ul>
    <li>The scholarships are awarded to students based on <strong>CGPA</strong> and income limits fixed by Scholarships Committee.</li>
    <li>No case of <strong>indiscipline</strong> in the semester for which scholarship is applied.</li>
    <li>Not availing <strong>of other scholarships</strong>, which stipulates that students will not receive any other scholarship.</li>
    <li>In case of any ambiguity, certificates in original should be produced by the student on demand.</li>
    <li>Any discrepancies in the parent's details provided when compared with the previous semester, the application will be directly rejected without any intimation.</li>
    <li>Both the Parents/guardian's gross total income should be mentioned clearly.</li>
    <li>The online application for MCN should be filled in clearly, and <strong>no changes will be encouraged later</strong>.</li>
    <li>The authorities will scrutinize all the applications, documents, and certificates</li>
  </ul>
  <p>.</p>
  <p><strong>It is the students' responsibility to check notices on SWD Portal or contact the SWD office for details of the MCN Scholarship.</strong></p>
  <p><strong>All decisions of the Scholarships Committee are final and binding.</strong></p>
  <p><strong>NOTE:</strong> If any of the above documents are not available, please mail the MCN committee. (<a href="mailto:mcn@hyderabad.bits-pilani.ac.in?subject=Query regarding">mcn@hyderabad.bits-pilani.ac.in</a>)</p>
  <p>**Those who have applied in the first sem don't need to do it again.</p> 
   <p>Last date to apply- <strong>17/06/2021</strong></p> 
</div>


              </div>
          </CardBody>
             ); 
      
}
