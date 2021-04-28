import React from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

// @material-ui/icons
import VisibilityIcon from '@material-ui/icons/Visibility';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";

//Auth Components
import { useAuth } from "context/auth";


import {BaseUrl} from "variables/BaseUrl";

// import { official,
//   department,
//   techassocs,
//   regionalassocs,
//   miscellaneous,
//   sports,
//   clubs,
//   others } from "variables/general.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// import CardBody from "components/Card/CardBody";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function Notices() {
 
  const [noticeData,setNoticeData]=React.useState([]);
  const token=JSON.parse(localStorage.getItem("tokens"));
  React.useEffect(()=>{
    try{
    const fetchData= async ()=>{
      const result= await axios.get(`${BaseUrl}/api/notices/feed?start=0&limit=10`,{headers:{
        Authorization:token
      }}) ;
      //const res = await result.json();
      if(result.data.err===false)
      setNoticeData(result.data.data);
      else {
        alert(result.data.err)
      }
         
  }
    fetchData();
    
  }catch(err){
      console.log(err);
    }
  
  },[]);
  
//   React.useEffect(()=>{
//     if(messDetails.menu!==undefined){
//     setMessMenu(messDetails.menu.map((item)=>{
//       let menu=[];
//       menu.push(item.day,item.breakfast,item.lunch,item.snacks,item.dinner);
//       return menu;
//     })
//     ) 
//     }
//   },[messDetails])
  
 
  const classes = useStyles();
  return (
    <div>      
      <div className={classes.note} style={{marginTop:"20px"}}>
          <h4><b>CAMPUS NEWS AND NOTICES</b></h4>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Notices:"
            headerColor="success"
            tabs={[
              {
                tabName: "Official",                
                tabContent: (
                    <GridContainer justify="center" alignItems="center">
                    {
                      noticeData.length>0?noticeData.map(data=>{
                      return  (
                      <GridItem xs={12} sm={4} md={4}>
                       <Card style={{border:'1px solid black'}}>
                         <CardBody>
                           <div style={{display:'flex',justifyContent:'center'}}><h4><b>{data.title}</b></h4></div>
                           <div style={{display:'flex',justifyContent:'start'}}><p>{data.body}</p></div>
                           {/* <div style={{display:'flex',justifyContent:'center'}}><p>HOST- {room.r_host}</p></div> */}
                           
                         </CardBody>
                         <CardFooter style={{display:'flex',justifyContent:'center'}}>
                            <a target="_blank" href={data.attachment} style={{textDecoration:'none',color:'white'}}>
                                <Button color="info" round>
                                  <VisibilityIcon/>
                                  View
                               </Button>
                            </a>
                         </CardFooter>
                       </Card>
                       </GridItem>)
                      })
                     :null
                }
                   </GridContainer>
                )
              },
              {
                tabName: "Departments",              
                tabContent: (
                  <h4>No Notices to Show</h4>
                )
              },
              {
                tabName: "Clubs",                
                tabContent: (
                  <h4>No Notices to Show</h4>
                )
              },
              {
                tabName: "TechAssocs",                
                tabContent: (
                  <h4>No Notices to Show</h4>
                )
              },
              {
                tabName: "RegionalAssocs",                
                tabContent: (
                  <h4>No Notices to Show</h4>
                )
              },
              {
                tabName: "Sports",                
                tabContent: (
                  <h4>No Notices to Show</h4>
                )
              },
              {
                tabName: "Miscellaneous",
                tabContent: (
                  <h4>No Notices to Show</h4>
                )
              },
              {
                tabName: "others",
                tabContent: (
                  <h4>No Notices to Show</h4>
                )
              },
            ]}
          />
        </GridItem>
     
      </GridContainer>
      
    </div>
  );
}
