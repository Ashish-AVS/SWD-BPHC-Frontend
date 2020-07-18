import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// @material-ui/icons
import InfoIcon from '@material-ui/icons/Info';
import Restaurant from "@material-ui/icons/Restaurant";
import EventNoteIcon from '@material-ui/icons/EventNote';
import Close from "@material-ui/icons/Close";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Table from "components/Table/Table";




import { official,
  department,
  techassocs,
  regionalassocs,
  miscellaneous,
  sports,
  clubs,
  others } from "variables/general.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function Dashboard() {
 
  const [Modal, openModal] = React.useState(false);
  const  [Mess,openMess]= React.useState(false);
  const user=JSON.parse(localStorage.getItem("data"));
  const [messDetails,setMessDetails]=React.useState({});
  let messNo=messDetails.mess;
  let [messMenu,setMessMenu]=React.useState([]);
  
  React.useEffect(()=>{
    try{
    const fetchData= async ()=>{
      const result= await fetch(`http://localhost:9000/api/mess/menu?uid=${user.uid}`) ;
      const res = await result.json();
      setMessDetails(res);
      
    
   
  }
    fetchData();
    
  }catch(err){
      console.log(err);
    }
  
  },[]);
  
  React.useEffect(()=>{
    if(messDetails.menu!==undefined){
    setMessMenu(messDetails.menu.map((item)=>{
      let menu=[];
      menu.push(item.Day,item.Breakfast,item.Lunch,item.Tiffin,item.Dinner);
      return menu;}))
      
    }
  },[messDetails])

  const classes = useStyles();
  return (
    <div>
      <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note}>
          <h3>Hello, {user.name}</h3>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Restaurant/>
              </CardIcon>
              <p className={classes.cardCategory}>Current Mess</p>
              <h3 className={classes.cardTitle}>
                MESS {messNo}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="rose" onClick={()=>{openMess(true)}}>
                  Check Menu
                </Button>
              </div>
              <div className={classes.stats}>
                <Button round color="rose">
                  Grace
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="primary">
                <EventNoteIcon /> 
              </CardIcon>
              <h2 className={classes.cardCategory}>Events</h2>
              <h4 className={classes.cardTitle}>No recent Events </h4>
            </CardHeader>
            {/*<CardBody>
              <h5>No New Events in between</h5>
            </CardBody>*/}
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="rose">Check Events Calender</Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
               <InfoIcon/> 
              </CardIcon>
              <p className={classes.cardCategory}>Complaints</p>
              <h3 className={classes.cardTitle}><small>Status</small> None</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button round color="rose" onClick={()=>{openModal(true)}}>Post a Complaint</Button>
                
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
      
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
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={official}
                  />
                )
              },
              {
                tabName: "Departments",              
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0, 1]}
                    tasks={department}
                  />
                )
              },
              {
                tabName: "Clubs",                
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={clubs}
                  />
                )
              },
              {
                tabName: "TechAssocs",                
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={techassocs}
                  />
                )
              },
              {
                tabName: "RegionalAssocs",                
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={regionalassocs}
                  />
                )
              },
              {
                tabName: "Sports",                
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={sports}
                  />
                )
              },
              {
                tabName: "Miscellaneous",
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={miscellaneous}
                  />
                )
              },
              {
                tabName: "others",
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0]}
                    tasks={others}
                  />
                )
              },
            ]}
          />
        </GridItem>
       {/* <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
              </Card>
        </GridItem>*/}
      </GridContainer>
   {                                      /*COMPLAINTS MODAL*/                          }
      <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={Modal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => openModal(false)}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                    <IconButton
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={() => openModal(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h3 className={classes.modalTitle}><strong>Procees to send Complaints</strong></h3>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                   <h4>
                    A cloud-based solution has been purchased for maintenance and IT services. From now on, this system will be utilized to submit requests associated with all the maintenance division and IPC support activities
                    </h4>
                    <div>
  
                       <ol>
                          <li>Log-in using the "G Sign in" box on the bottom-left of the page. Use the official (institute) gmail account to sign-in. This is based on google authentication and we do not have to create a new sign-in information.</li>

 

                          <li>On the QuickFMS home page, click on the top-left located "Help Desk" button. Then click on the "Raise Request" button.</li>

 

                          <li>Select the main category - sub-category - child category for a specific service request. In the case a specific job description is not found in the pre-existing drop down menu, please select "others" in the child category. Then describe the service request in "description" box along with "location."</li>

 

                          <li>Click submit request.</li>

                       </ol> 

                       The respective help-desk incharge and user will receive email notification after a request is submitted.<br />
                      <div align="center">
                        The link to access the portal is given below<br />
                      </div>
                    </div>
                    <div align="center">
                          <h4> <u><a href ="https://live.quickfms.com/login.aspx" target="blank">https://live.quickfms.com/login.aspx</a></u></h4>
                    </div>



                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                   
                    <Button
                      onClick={() => openModal(false)}
                      color="danger"
                      simple
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>

            {/********** MESS MODAL **********/}
            <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  maxWidth="lg"
                  fullWidth={true}
                  open={Mess}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => openMess(false)}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                    <IconButton
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={() => openMess(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h3 className={classes.modalTitle}><strong>Mess Menu</strong></h3>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                                           
                   <Table
                tableHeaderColor="primary"
                tableHead={["Day", "Breakfast", "Lunch", "Tiffin","Dinner"]}
                tableData={messMenu}
              />         
               



                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                   
                    <Button
                      onClick={() => openMess(false)}
                      color="danger"
                      simple
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>    
    </div>
  );
}
