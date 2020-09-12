import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem";


//Created Components
import GoodieItem from "./GoodieItem";

import {swdUid} from "variables/swdmembers.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


const useStyles = makeStyles(styles);

export default function Goodies() {
  const classes = useStyles();
  const [isFetching,setIsFetching]=React.useState(true);
  const [goodie,setGoodie]=React.useState([]);
  const [isUpdated,setIsUpdated]=React.useState("");
  const [deductions,setDeductions]=React.useState([]);
  const user=JSON.parse(localStorage.getItem("data"));
  const token=JSON.parse(localStorage.getItem("tokens"));
  
  React.useEffect(()=>{
    try{
        const fetchData= async ()=>{
        const result= await fetch(`https://swdnucleus.ml/api/goodies?uid=${user.uid}`,{
          headers:{Authorization:token}
        }) ;
        const res = await result.json();
       //console.log(res);
        setGoodie(res);   
        setIsFetching(false);
        
      }
      const fetchDeduction= async ()=>{
        const result= await fetch(`https://swdnucleus.ml/api/deductions?uid=${user.uid}`,{
          headers:{Authorization:token}
        }) ;
        const res = await result.json();
        setDeductions(res);
        console.log(res);   
       // setIsFetching(false);
        }
      fetchData();
      fetchDeduction();
      console.log(isUpdated);
      
    }catch(err){
        console.log(err);
      }
     
  },[isUpdated,user.uid,token])
let GoodieData=<></>;
if(isFetching)
GoodieData=<h4>Fetching data...</h4>
else{
 GoodieData=
  <GridContainer>
  { goodie.map((item,index)=>{
       return(<GoodieItem
         key={index} 
         goodieId={item.g_id}
         goodieType={item.g_type}
         goodieName={item.g_name}
         goodieImage={item.g_img}
         goodieHostId={item.host_id}
         goodieContactName={item.host_name}
         goodieContactNo={item.host_mobile}
         goodieSeller={item.g_host}
         goodiePrice={item.g_price}
         minAmount={item.min_amount}
         maxAmount={item.max_amount}
         size={item.sizes}
         limit={item.limit}
         deduction={deductions}
         setIsUpdated={setIsUpdated}
         />)
  })}
  </GridContainer>
};

  
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note2}>
          <h5>This is the Funds and Goodies section of BPHC. </h5>
      </div>
      
      {GoodieData}
     { swdUid.map(item=>{
       if(item===user.uid){
       return(
        
        <GridContainer direction='column' justify='center' alignItems='center'>
        <GridItem xs={12} sm={12} md={8} >
          <Button size='lg' round color="rose">
            Add Goodie
          </Button>
        </GridItem>
      </GridContainer>
     
       )
      }
     })   
      
}
    </div>
  );
}
