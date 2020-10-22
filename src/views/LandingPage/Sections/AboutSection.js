import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
//import Chat from "@material-ui/icons/Chat";
//import VerifiedUser from "@material-ui/icons/VerifiedUser";
//import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer0.js";
import GridItem from "components/Grid/GridItem0.js";
//import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/aboutStyle.js";

const useStyles = makeStyles(styles);

export default function AboutSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>About The Campus</h2>
          <h5 className={classes.description}>
           <p>&nbsp;&nbsp;&nbsp;&nbsp;Birla Institute of Technology and Science, Pilani  - Hyderabad campus is one of the premier technical and science institutes of higher learning in India. It was established by Birla Institute of Technology and Science, Pilani (Rajasthan) as one of its latest campuses in the year 2008 with the first batch graduating in the year 2012. BITS, Pilani is one of India{"'"}s  top technical and science universities established under Sec. 3 of the UGC act.  </p>
           <p> &nbsp;&nbsp;&nbsp;&nbsp;The sprawling campus is built amidst lush greenery spreading over 200 acres of land at Jawahar Nagar, Shameerpet, Hyderabad. Surrounded by natural beauty, the campus is about 70 kilometers away from Rajiv Gandhi International Airport, Shamshabad and 27 kilometers from Secunderabad railway station. The campus is easily accessible by road with a bus stop just outside the campus. Public transport (route# 212) runs every one hour from Secunderabad to the campus. The campus is in close proximity to many schools, medical facilities, and recreational centers.</p>
           <p > &nbsp;&nbsp;&nbsp;&nbsp;The campus is built with state-of-the-art infrastructure without affecting the scenic beauty of the area. Modern laboratories, well-furnished classrooms, lecture theatre complexes, student activity center, auditorium, playground and modern ICT infrastructure, all come together to make BITS Pilani, Hyderabad campus a well-equipped campus.
                 Around 1100 bright minds are admitted every year into first degree, higher degree and doctoral programmes of the institute through a single entrance test conducted by BITS, Pilani. Being a campus of BITS, Pilani, Hyderabad campus follows the same curriculum, teaching methodologies and educational practices of its parent campus. BITS Pilani, Hyderabad Campus is fully residential, housing over 3400 students, around 170 faculty members and 160 technical and support staff. The teaching faculty brings with them extensive research, teaching and industry experience to offer comprehensive education to students. Currently around 65 research projects are ongoing in the campus, most of which are supported by prominent funding agencies from India and abroad.</p>
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>About Us</h2>
          <h5 className={classes.description}>
          <p>The Student Welfare Division at BITS Pilani, Hyderabad Campus shall always strive to provide the most conducive environment to bring out the best out of every student. It is our endeavor to do anything and everything possible to make the student's stay in the campus the most memorable one. 
 
 Our division cares for every student and shall always look into their needs that may arise from time to time.
  </p>
   
   <h3 style={{fontFamily:"Product Sans"}}>Other Responsibilities Include</h3>
   
   <div >
     <div >
     <ul>
       <li>Collection Of Fees</li>
      
       <li>Coordinating for various Fests organized</li>
       <li>Maintenance of Individual students account related to Mess Advance</li>
       <li>Hostel accommodation to students</li>
     </ul>
     </div></div>
          </h5>
        </GridItem>
      </GridContainer>
      {/*<div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Free Chat"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Verified Users"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Fingerprint"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>*/}
    </div>
  );
}
