
import React from "react";
import classNames from "classnames";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Button from "components/CustomButtons/Button.js";
//import Danger from "components/Typography/Danger.js";
import Footer from "components/Footer/Footer.js";
import Img from 'assets/img/bitslogo.png'
import {BaseUrl} from "variables/BaseUrl";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function FAQ() {  
  const classes = useStyles();
  const [faqData,setFaqData]=React.useState([]);
  const [dataLoaded,setDataLoaded]=React.useState(false);
  const imageClasses = classNames(
    classes.imgFluid1
  );
  React.useEffect(()=>{
    try{
      const fetchData=async ()=>{
        const result =await fetch(`${BaseUrl}/api/faq`)
         const res = await result.json();
        if(result.status===200||result.status===201){
        console.log(res.data.faqs);
        setFaqData(res.data.faqs);
        setDataLoaded(true)  
        }
       else if(result.status===401)
       alert(res.msg)
    }
      fetchData();      
    }
    catch(err){
      console.log(err);
     
    } 
  
  },[])
  


  return (
    <div>
      <GridContainer justify="center" alignItems="center">
      <GridItem xs={6} sm={6} md={3}>
      <img  src={Img} alt="..." className={imageClasses}  />
      </GridItem>
      <GridItem xs={6} sm={6} md={7}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>    
      </GridItem>
      
      </GridContainer>
      <div style={{display:'flex',justifyContent:'center'}}>
          <h4><strong>General Queries And FAQs</strong></h4>
      </div>
      
      
     
      <GridContainer direction="column" justify="center" alignItems="center">
        {/* <GridItem xs={12} sm={12} md={11}>
          <CustomTabs
           
            headerColor="primary"
            tabs={[
              {
                tabName: "ERP",                
                tabContent: (

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
                   
                    <p style={{ marginTop: '0cm', marginRight: '0cm', marginBottom: '8.0pt', marginLeft: '0cm', lineHeight: '107%', fontSize: '15px', fontFamily: '"Calibri",sans-serif' }}><strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>*Note:</span></strong><span style={{ fontSize: '17px', lineHeight: '107%', fontFamily: '"Arial",sans-serif' }}>&nbsp;A thesis is for 16 units and for a full semester duration. But a student has the option of pursuing a Thesis of 9 units concurrently with coursework over a full semester, in which case the additional coursework would be at least 2 courses of total 6 units to meet the minimum unit requirements.</span></p>
                  </div>
                  </AccordionDetails>
                </Accordion>
                
               )
              },
              {
                tabName: "Computer Science(CS)",              
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "Electrical and Electronics(EEE)",                
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "Electronics and Communication(ECE)",                
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "Civil",                
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "Mechanical",                
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "Chemical",
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "B.Pharm",
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "M.Sc Chemistry",
                tabContent: (
                  <></>
                )
              },
              {
                tabName: "M.Sc Physics",
                tabContent: (
                  <></>
                )
              },
            ]}
          />
        </GridItem> */}
        <GridItem xs={12} sm={12} md={11}>
          {faqData.length!==0?<CustomTabs
           
            headerColor="primary"
            tabs={faqData.map(items=>{
              return({
                tabName:`${items.group_name}`,
                tabContent:(
                 items.data.map(content=>{
                   return(
                    <div>
                    <strong><h3 style={{display:"flex",justifyContent:'center'}}>{content.main_topic.toUpperCase()}</h3></strong>
                  
                  {content.qa.map(qa=>{
                    return(<Accordion style={{marginTop:"5px",background:'#e8e8e8'}}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                         <b>{qa.q}</b>
                      </AccordionSummary>
                      <AccordionDetails>
                      {qa.a}
                      </AccordionDetails>
                    </Accordion>)
                  })}
                 </div>
                   )
                 })
                )
              })
            })}
          />
:null}      
  </GridItem>
  
      </GridContainer> 
     <Footer />
      
    </div>
  );
}

