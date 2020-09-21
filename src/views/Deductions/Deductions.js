import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import {BaseUrl} from "variables/BaseUrl";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "30px",
    position: "relative",
   },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Deductions() {
  const [deduction,setDeduction]=React.useState({});
  const [isFetching,setIsFetching]=React.useState(true);
  const {uid}=JSON.parse(localStorage.getItem("data"));
  const token=JSON.parse(localStorage.getItem("tokens"));
  const classes = useStyles();

  React.useEffect(()=>{
    try{
      const fetchData= async ()=>{
        const result= await fetch(`${BaseUrl}/api/deductions?uid=${uid}`,{
          headers:{Authorization:token}
        }) ;
        const res = await result.json();
        if(result.status===200||result.status===200||result.status===304){
        console.log(res);
          setDeduction(res.map((item)=>{
            let OrderedOn= new Date(parseInt(item.time));
            let goodieDetails="";
            if(item.g_type===0){
            goodieDetails=parseInt(item.xs)?`${goodieDetails} XS-${item.xs}`:goodieDetails;
            goodieDetails=parseInt(item.s)?`${goodieDetails} S-${item.s}`:goodieDetails;
            goodieDetails=parseInt(item.m)?`${goodieDetails} M-${item.m}`:goodieDetails;
            goodieDetails=parseInt(item.l)?`${goodieDetails} L-${item.l}`:goodieDetails;
            goodieDetails=parseInt(item.xl)?`${goodieDetails} XL-${item.xl}`:goodieDetails;
            goodieDetails=parseInt(item.xxl)?`${goodieDetails} XXL-${item.xxl}`:goodieDetails;
            goodieDetails=parseInt(item.xxxl)?`${goodieDetails} XXXL-${item.xxxl}`:goodieDetails;
            } 
            else if(item.g_type===1){
              goodieDetails=` Qty - ${item.net_quantity} `;
            }    
            else if(item.g_type===2){
              goodieDetails= "Fund";
            }      
              let data=[];
            data.push(item.g_name,goodieDetails,item.total_amount,OrderedOn.toDateString());
            return data;
          })
        ) 
        setIsFetching(false) ;  
        }
      }
      fetchData();
      
    }catch(err){
        console.log(err);
      }
  },[token,uid])

  return (
  <div>
          <div className={classes.typo} style={{marginTop:"-50px"}}>
              <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
          </div>
        <div className={classes.typo}>
          <h5>Here you can see all your deductions of this semester</h5>
        </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}><b>GOODIES BOUGHT FROM SWD PORTAL</b></h4>
           
          </CardHeader>
          <CardBody>
            {isFetching?
            <h5>Fetching Details</h5>:
            <Table
              tableHeaderColor="primary"
              tableHead={["Goodie Name","Goodie info.","Amount(in ₹)","Ordered On"]}
              tableData={deduction}
            />}
            
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              <b>MESS DEDUCTIONS</b>
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here you can see all the mess related deductions
            </p>
          </CardHeader>
          <CardBody>
            <h3>We haven't recieved any data for this semester</h3>
           
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              <b>OTHER ADVANCE DEDUCTIONS</b>
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here you can see all the deductions from other advances
            </p>
          </CardHeader>
          <CardBody>
            <h3>We haven't recieved any data for this semester</h3>
            
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
 </div>
  );
}
