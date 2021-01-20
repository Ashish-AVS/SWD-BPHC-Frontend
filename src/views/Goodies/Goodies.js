import React from "react";
import {Redirect} from "react-router-dom";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
//Created Components
import GoodieItem from "./GoodieItem";
import AddGoodie from "./AddGoodie";
//Auth Components
import { useAuth } from "context/auth";



import {swdUid} from "variables/swdmembers.js";
import {BaseUrl} from "variables/BaseUrl";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


const useStyles = makeStyles(styles);

export default function Goodies() {
  const classes = useStyles();
  const [isFetching,setIsFetching]=React.useState(true);
  const [goodie,setGoodie]=React.useState([]);
  const { onLogin } = useAuth();
  const [isUpdated,setIsUpdated]=React.useState("");
  const [deductions,setDeductions]=React.useState([]);
  const user=JSON.parse(localStorage.getItem("data"));
  const token=JSON.parse(localStorage.getItem("tokens"));
  const [error,isError]=React.useState(false);
  const [addGoodie,setAddGoodie]=React.useState(false)
  React.useEffect(()=>{
    try{
        const fetchData= async ()=>{
        const result= await fetch(`${BaseUrl}/api/goodies`,{
          headers:{Authorization:token}
        }) ;
        const res = await result.json();
       //console.log(res);
       if(res.err===false){
        setGoodie(res.data);   
        setIsFetching(false);
      }
       else if(res.err===true && result.status===401){ 
        logout();
      }
       else{
        isError(true);
        }
        
      }
      const fetchDeduction= async ()=>{
        const result= await fetch(`${BaseUrl}/api/deductions`,{
          headers:{Authorization:token}
        }) ;
        const res = await result.json();
        if(res.err===false)
        setDeductions(res.data);
       
        }
        
      fetchData();
      fetchDeduction();
      
      
    }catch(err){
        console.log(err);
      }
     
  },[isUpdated,user.uid,token])
  const logout=()=>{
    localStorage.removeItem("tokens");
    localStorage.removeItem("data");
    onLogin(false);  
    return (<Redirect exact to='/login-page' />);
  }
let GoodieData=<></>;
if(isFetching && !error)
GoodieData=<h4>Loading data...</h4>
else if(isFetching && error){
  GoodieData=<div>
  <SnackbarContent
    message={
    <span >
      <b>UNKNOWN ERROR</b>:Contact SWD Nucleus
    </span>
      }
    close
    color="danger"
    icon="info_outline"
  />
  <Clearfix /></div>
}
else{
 GoodieData=
  <GridContainer>
  {goodie.length!==0? goodie.map((item,index)=>{
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
  }):
  <div className={classes.note}>
  <h3><b>No Goodies to show </b></h3>
</div>}
  {!addGoodie?
  <GridItem xs={12} sm={12} md={12}>
    <div style={{display:'flex',justifyContent:'center'}}>
  { swdUid.map(item=>{
       if(item===user.uid){
       return(    
        <GridContainer  justify='center' alignItems='center'>
        <GridItem xs={12} sm={12} md={12} >
          <Button size='lg' round color="rose" onClick={()=>{
            setAddGoodie(true)
          }}>
            Add New Goodie
          </Button>
        </GridItem>
      </GridContainer>
       )
      }
     })}
     </div>
     </GridItem>:null}
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
     
 {addGoodie ?
 <AddGoodie setVisible={setAddGoodie} setIsUpdated={setIsUpdated}/>
 :null}
    </div>
  );
}
