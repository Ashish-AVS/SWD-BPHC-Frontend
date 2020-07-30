import React from "react";
import {saveAs} from 'file-saver';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";

import Logo from "assets/img/bitslogo.png";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function DocItem({docTitle,docKey}) {
  const classes = useStyles();
  const [sendingData,setSendingData]=React.useState(false);
  const {uid}=JSON.parse(localStorage.getItem("data"));
  const token=JSON.parse(localStorage.getItem("tokens"));
  const [loading,setLoading]=React.useState(false);

 
  React.useEffect(()=>{
    if(sendingData===true){
      setLoading(true);
      try{
      const sendData=async ()=>{
          const result =await fetch(`http://40.121.181.70/api/doc?uid=${uid}&token=${token}&key=${docKey}`);
          const res= await result.blob();       
          if(result.status===200||result.status===201){  
          
            const pdfBlob=new Blob([res],{type:'application/pdf'});
          saveAs(pdfBlob,`${uid}-${docKey}`);
          setLoading(false);          
          }
         
        }
      sendData();
      setSendingData(false);  
      }
      catch(err){
        console.log(err);
      }
    }
  },[sendingData,uid,docKey])
  return (
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader>
              <img src={Logo} alt="BitsLogo" className={classes.img}></img>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{docTitle} </h4>
              <p className={classes.cardCategory}>
                You can download {docTitle} in pdf format below
              </p>
            </CardBody>
            <CardFooter style={{display:"flex",justifyContent:"center"}}>
              <div>
                <Button round color="info" disabled={loading} onClick={()=>{setSendingData(true)}}>
                    Download
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>        
  );
}
