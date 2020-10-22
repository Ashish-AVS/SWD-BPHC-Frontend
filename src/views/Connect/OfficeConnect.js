import React from "react";
import MaterialTable from "material-table";
import {csv} from "d3";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {BaseUrl} from "variables/BaseUrl";
import Button from '@material-ui/core/Button';
//Core Components
// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


//import Table from "components/Table/Table";
import office from "./office.csv";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = "Transition";


export default function ConnectModal(){
const classes=useStyles();
const [open,setOpen]=React.useState(false);
const [data,setData]=React.useState();
const [isFetching,setIsfetching]=React.useState(false)
const [isFetched,setIsFetched]=React.useState(false)
//const [isFetched,setIsFetched]=React.useState(false)
const token=JSON.parse(localStorage.getItem("tokens"));

React.useEffect(()=>{
    
    try{
        const fetchData= async ()=>{
          const result= await fetch(`${BaseUrl}/api/con/office`,{
            headers:{Authorization:token}
          }) ;
          const res = await result.json();
          const off=[];
          res.data.map(item=>{ 
            item.off.map(item1=>{
             off.push(item1);
           })
         })
         //console.log(off)
          setData(off.map((item,index)=>{
            return {sno:index+1,name:item.name,designation:item.designation,email:item.email}
          }))
         setIsFetched(true);

      }
        fetchData();
        
      }catch(err){
          console.log(err);
        }
      
  },[])

// React.useEffect(()=>{
    
//     try{
//       const fetchData= async ()=>{
//       setData( await csv(office)) ;
//       setIsfetching(true)        
      
      
//     }
//   fetchData();
 
//   }catch(err){
//       console.log(err);
//     }
//   },[])
//   React.useEffect(()=>{
// if(isFetching===true)
// setIsFetched(true);

//   },[isFetching])
  let modal=<></>
  if(isFetched===true){
    modal=<Dialog
              classes={{
                root: classes.center,
                paper: classes.modal
              }}
              fullScreen
              fullWidth={true}
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                >
                  <Close className={classes.modalClose} />
                </IconButton>
                <h3 className={classes.modalTitle}><strong>Office</strong></h3>
              </DialogTitle>
              <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
              >
                 <MaterialTable
                  title="ADMINISTRATIVE HEADS"
                  columns={[
                    {title:"S.No", field:'sno'},
                    {title:"Name", field:'name'},
                    {title:"Email", field:'email'},
                    {title:"Designation", field:'designation'}]}
                  data={data}
                  options={{
                    pageSize:20,
                    emptyRowsWhenPaging:false,
                    headerStyle: {
                      backgroundColor: '#A28089',
                      color: '#FFF'
                    },
                    rowStyle: {
                      border: "1.2px solid black",
                    }
                  }}
                  />           



              </DialogContent>
              <DialogActions className={classes.modalFooter}>
               
                <Button
                  onClick={() => setOpen(false)}
                  color="danger"
                  solid="true"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>}
    
 
    return(
        <Card>
            <CardHeader color="primary">  
               <h3 className={classes.cardTitleCon}>
                OFFICE DETAILS
               </h3>
            </CardHeader>
            <CardBody>
                <p>A complete Directory of all the office in-charges and administrative heads. </p>
                <div className={classes.stats} style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
                <Button variant="outlined" style={{borderRadius:'30px',border:"1px solid blue"}} color="primary" onClick={()=>{setOpen(true)}}>
                  View Directory
                </Button>
              </div>
            </CardBody>
           
            {modal}      
        </Card>
    );
}