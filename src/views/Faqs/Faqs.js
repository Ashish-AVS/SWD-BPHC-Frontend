
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
       
        <GridItem xs={12} sm={12} md={10}>
          {faqData.length!==0?
          <CustomTabs
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
                        style={{whiteSpace:'pre-wrap'}}
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

