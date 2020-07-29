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

 {/* showFile(blob){
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([blob], {type: "application/pdf"})
  
    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    } 
  
    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download="file.pdf";
    link.click();
    setTimeout(function(){
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
    }, 100);
  }
*/} 
  //fetch([url to fetch], {[options setting custom http-headers]})
  //.then(r => r.blob())
  //.then(showFile)
  React.useEffect(()=>{
    if(sendingData===true){
      try{
      const sendData=async ()=>{
          const result =await fetch(`http://40.121.181.70/api/doc?uid=${uid}&token=${token}&key=${docKey}`);
          const res= await result.blob();       
          if(result.status===200||result.status===201){  
          
            const pdfBlob=new Blob([res],{type:'application/pdf'});
          saveAs(pdfBlob,`${uid}-${docKey}`);          
          }
         
        }
      sendData();
      //console.log(totalQty);
      setSendingData(false);  
      }
      catch(err){
        console.log(err);
      }
    }
  },[sendingData])
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
                <Button round color="info" onClick={()=>{setSendingData(true)}}>
                    Download
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>        
  );
}
