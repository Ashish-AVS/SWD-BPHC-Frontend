import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import Image1 from "assets/img/know/img1.png";
import Image2 from "assets/img/know/img2.jpg";
import Image3 from "assets/img/know/img3.jpg";
import Image4 from "assets/img/know/img4.jpg";
import Image5 from "assets/img/know/img5.jpg";
import Image6 from "assets/img/know/img6.jpg";
import Image7 from "assets/img/know/img7.jpg";
import Image8 from "assets/img/know/img8.jpg";
import Image9 from "assets/img/know/img9.jpg";
import Image10 from "assets/img/know/img10.jpg";
import Image11 from "assets/img/know/img11.jpg";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
export default function General(){
    const classes = useStyles();
return(
    <div className={classes.note3}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
           <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Q. What is the semester distribution like (including CDCs and Electives)</span></strong></p>
        </AccordionSummary>
        <AccordionDetails>
        <div>
          <p><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A.&nbsp;</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>This is the structure/requirements for the First Degrees namely B.E, B. Pharm, and M.Sc.:</span></p>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}><img src={Image1} alt="image can't be loaded" width="400px"></img></div>
          <br />
          <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A student should complete the minimum number of courses and units required in each category as well as meet the minimum requirements of courses (42) and units (144) in total. Also, the credit limit cannot cross 25 credits per semester.</span></p>
          <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>*Note:</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>&nbsp;A thesis is for 16 units and for a full semester duration. But a student has the option of pursuing a Thesis of 9 units concurrently with coursework over a full semester, in which case the additional coursework would be at least 2 courses of total 6 units to meet the minimum unit requirements.</span></p>
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p style={{marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif'}}><strong><span style={{fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif'}}>Q. What are DELs| HELs| OELs| Project Type Courses?</span></strong></p>
        </AccordionSummary>
        <AccordionDetails>
        <div>
        <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A.&nbsp;</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>DELs stand for Disciplinary Electives. These courses span various disciplines and offer a variety of subjects as per student’s requirement. A list of discipline wise electives is provided in the discipline specific blogs of each branch.</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>HELs stand for Humanity Electives. These courses are meant to give an insight in social knowledge, history, philosophy, politics, etc. &nbsp;</span></p>
    <p><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A list of HELs is provided here:</span></p>
    <br/>
    <div style={{display:'flex',justifyContent:'flex-start',flexWrap:'wrap'}}>
      <img style={{border:'solid black 1px',marginBottom:'5px',marginRight:'5px'}} src={Image4} alt="image can't be loaded" width="250px" height="550px"></img>
      <img style={{border:'solid black 1px',marginBottom:'5px',marginRight:'5px'}} src={Image5} alt="image can't be loaded" width="250px" height="550px"></img>
      <img style={{border:'solid black 1px',marginBottom:'5px',marginRight:'5px'}} src={Image2} alt="image can't be loaded" width="250px" height="550px"></img>
      <img style={{border:'solid black 1px',marginBottom:'5px'}} src={Image3} alt="image can't be loaded" width="250px" height="250px"></img>
    </div>
    <br/>
    <br/>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>PROJECT TYPE COURSES:</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>In addition to discipline electives, the following project type courses are also being offered by the departments for each of their respective programmes. These courses may be taken by the students to meet the discipline elective requirements.&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>XXX F266 Study Project &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;3&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>XXX F366 Laboratory Project &nbsp; &nbsp;3&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>XXX F367 Laboratory Project &nbsp; &nbsp;3&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>XXX F376 Design Project &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;3&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>XXX F377 Design Project &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;3&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>XXX F491 Special Project &nbsp; &nbsp; &nbsp; &nbsp; 3</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>where XXX indicates the Degree programme. For example, CHE F266 Study Project is intended for a student of B.E. Chemical Engineering.</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A student may avail a maximum of 3 Project courses to meet the Discipline Electives Requirement under the head of (Discipline) Electives with the following limitations:</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>(a) All of these Project courses should be&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>(i) within the Discipline (for which the degree is being awarded) or&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>(ii) from an allied Discipline if so specified by the Department offering the degree</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>(b) The projects may be chosen from under these sub-heads.&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>(i) Study Projects (maximum of 1)&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>(ii) Laboratory (maximum of 2)</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>(iii) Design Projects (maximum of 2)&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>(iv) Special Projects (maximum of 1)</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A student may avail a maximum of 3 Project courses (under any of the heads mentioned above offered by any discipline as an Open Elective. However, in total a student may avail at most 5 Project courses against Electives slots in any category.</span></p>

        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
           <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>MINOR PROGRAMMES FOR FIRST DEGREE STUDENTS</span></strong></p>
        </AccordionSummary>
        <AccordionDetails>
        <div>
        <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>“Minor programs” are offered as options for first degree students with the intent of encouraging them to add focus to their supplemental learning (outside a major area) as well as recognizing and certifying the knowledge obtained in an area that is outside of their major area.</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>General Guidelines:</span></strong></p>
    <ol style={{ listStyleType: 'decimal' }}>
      <li><span style={{ fontFamily: '"Arial",sans-serif' }}>&nbsp;</span><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>A minor would allow a Department (or multiple Departments) to offer a package of courses in an area/sub-area to students for whom this area/sub-area would not be part of their (major) program.</span></li>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>A minor option would allow a student to pursue the study of an area or a sub-area through a set of courses but not as exhaustively as required to obtain a degree (i.e. a major) in that area.</span></li>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>A minor may be inter-disciplinary (e.g. a minor in Computational Science may include courses in Numerical Analysis, Computational Physics, Computational Chemistry, and Bioinformatics among others).</span></li>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>A minor will be recognized by means of a separate certificate.</span></li>
    </ol>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '0cm', marginLeft: '36.0pt', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '0cm', marginLeft: '36.0pt', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Requirements for a minor:</span></strong></p>
    <ol style={{ listStyleType: 'decimal', marginLeft: '44px' }}>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>Courses and Units Requirement: Each minor would be defined by coursework requirement with the following conditions:</span></li>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>&nbsp; <strong>Category &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Courses &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Units</strong></span></li>
    
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '0cm', marginLeft: '54.0pt', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Minor-Core &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;4 (max) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 12 (max)</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '0cm', marginLeft: '54.0pt', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Minor-Electives&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;2 (min)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; 6 (min)</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '0cm', marginLeft: '54.0pt', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Minor-Total&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;5 (min) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 15 (min)&nbsp;</span></p>
    
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>&nbsp;Elective Pool:</span></li>
    
    <ol start={1} style={{ listStyleType: 'lower-alpha', marginLeft: '25px' }}>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>The pool of electives specific to a minor may include courses from one or more disciplines and may include project / seminar type courses.</span></li>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>A student may use at most one project / seminar type course to meet the requirements of a minor.</span></li>
    </ol>
    
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>Overlap in requirements:</span></li>
    
    <ol start={1} style={{ listStyleType: 'lower-alpha', marginLeft: '25px' }}>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>At most 2 courses (and at most 6 units) out of the above requirement (of 5 courses and 15 units) may be met by mandatory courses of the student’s degree i.e. major (or degrees i.e. majors) : i.e. from the general institutional requirement (excluding Humanities requirement) or the (Major) discipline Core(s).</span></li>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>No course may be used to meet the requirements of two different minors nor may a course be used to the meet the requirements of two majors and a minor.</span></li>
    </ol>
    
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>GPA requirement:</span></li>
    
    <ol start={1} style={{ listStyleType: 'lower-alpha', marginLeft: '25px' }}>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>A student – on completion of the requirements for a minor – must have maintained a cumulative GPA of 4.5 or above (out of 10) in the courses applied to the minor.</span></li>
    </ol>
    </ol>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '0cm', marginLeft: '72.0pt', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '0cm', marginLeft: '72.0pt', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Process for declaring / obtaining a minor:</span></strong></p>
    <ol style={{ listStyleType: 'decimal', marginLeft: '80px' }}>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>A student – if he/she chooses to pursue a minor – must declare at the end of the 2nd year that he/she will pursue a specific minor. The student will charged a small fee for logistics.</span></li>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>If and when he/she completes the requirements for the minor – as stipulated above and as stipulated for the specific minor, then he/she may apply for a “minor” certificate.</span></li>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>If it is verified that the requirements are met then he/she will be awarded a “minor certificate” (separate from a degree – i.e. major – certificate).</span></li>
      <li><span style={{ lineHeight: '107%', fontFamily: '"Arial",sans-serif', fontSize: '17px' }}>x A minor certificate will be issued only on completion of a degree (i.e. a major).</span></li>
    </ol>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '90.0pt', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
    <p><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>At present Nine minor programs viz. Minor in Data Science, English Studies, Entrepreneurship, Film and Media, Finance, Materials Science and Engineering, Philosophy, Economics and Politics (PEP), Physics and Public Policy have been designed. The details of which are given below</span></p>
    <br/>
    <div  style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
      <img  src={Image6} alt="image can't be loaded" width="500px"></img>
      <img src={Image7} alt="image can't be loaded" width="500px"></img>
      <img src={Image8} alt="image can't be loaded" width="500px"></img>
      <img src={Image9} alt="image can't be loaded" width="500px"></img>
      <img src={Image10} alt="image can't be loaded" width="500px"></img>
      <img src={Image11} alt="image can't be loaded" width="500px"></img>
    </div>
  
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        ><div>
           <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>About Electives:</span></strong></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Q.&nbsp;</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Minimum number of DELs to do.</span></p></div>
        </AccordionSummary>
        <AccordionDetails>
        <div>
        <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A.&nbsp;</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Depends upon your discipline:</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A1: 5 DELs</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>All other AX: 4 DELs</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>B2: 4 DELs</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>B3: 6 DELs</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>B1, B4, B5: 5 DELs</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>You can exceed the nos. The minimum is for your graduation quota.</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>*Note: The 5 OPELs you do can be from the same field, doing that gets you an official Minor degree from the college.</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Q.&nbsp;</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>How to opt for electives?</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A.&nbsp;</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Since we make our own timetable at BITS, every semester you will get the list of electives being offered. You can take up anything that does not clash with your CDCs. You just have to register for them on ERP on the day of timetable registration.</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Q.&nbsp;</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Any specific order to complete these electives?</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A.&nbsp;</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>You can take any elective in absolutely any semester as long as it is not clashing with any of the other courses. You can do OPELs in 2-1 as well, however it is advisable to do only Humanities Electives in your 2-1 as your workload will <em>substantially</em> increase in your 2-1 after your lame and easy 1-1 - 1-2, hence it is advisable to do only HELs in 2-1.&nbsp;</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Q.&nbsp;</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Is there any cap on the number of credits per semester?</span></p>
    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>A.&nbsp;</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>Yes, there is. You can do courses worth up to 25 credits only (per semester).</span></p>
        </div>
        </AccordionDetails>
      </Accordion>
    
    
       
    
    
    
  </div>

);

    }