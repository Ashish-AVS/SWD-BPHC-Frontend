import React from "react";
import MaterialTable from "material-table";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Badge from "components/Badge/Badge.js";
import CustomTabs from "components/CustomTabs/EditedTabs1.js";
import {BaseUrl} from "variables/BaseUrl";
import {
    primaryColor,
    defaultFont
  } from "assets/jss/material-kit-react.js";
const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    top: "10px",
    letterSpacing: "unset",
    "& + $underline": {
      marginTop: "0px"
    }},
    input: {
      color: "#495057",
      height: "unset",
      "&,&::placeholder": {
        fontSize: "14px",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "400",
        lineHeight: "1.42857",
        opacity: "1"
      },
      "&::placeholder": {
        color: "#AAAAAA"
      }
    },
    formControl: {
      margin: "0 0 17px 0",
      paddingTop: "27px",
      position: "relative",
      "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
        color: "#495057"
      }
    },
    underline: {
      "&:hover:not($disabled):before,&:before": {
        borderColor: "#D2D2D2 !important",
        borderWidth: "1px !important"
      },
      "&:after": {
        borderColor: primaryColor
      }
    },
    label: {
      color: "rgba(0, 0, 0, 0.78)",
      top:"-17px",
      fontSize: "14px",
      transition: "0.3s ease all",
      lineHeight: "1.428571429",
      fontWeight: "400",
      paddingLeft: "0",
      letterSpacing: "normal",
      "& + $underline": {
        marginTop: "0px"
      }
    }
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(styles);

export default function Outstation() {
  const classes = useStyles();
  const token=JSON.parse(localStorage.getItem("officialtokens"));
  const [data0,setData0]=React.useState([]);
  const [data1,setData1]=React.useState([]);
  const [data2,setData2]=React.useState([]);
  const [data3,setData3]=React.useState([]);  
  const [status,setStatus]=React.useState(0);
  const [dataSent,setDataSent]=React.useState(false)
  //const [loading,setLoading]=React.useState(false)
  //const [outData,setOutData]=React.useState({
    //  fsalary:null,
      //new_status:null
  //})
  const [success, setSuccess] = React.useState(false);

  
    
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };
  

  React.useEffect(()=>{
    try{
      if (status == 0) {
        const fetchData0 = async () => {
          const result = await fetch(`${BaseUrl}/api/o/mcn/applied`, {
            headers: { Authorization: `Bearer ${token}` }

          });
          const res = await result.json();
          if (res.err===false) {
            setData0(
                
              res.data.map((info, index) => {
                let badge=null;  
                if(info.status===-1){
                   badge=<Badge color="danger">Denied</Badge>
                   }
                else if(info.status===0){
                    badge=<Badge color="warning">Applied</Badge>
                }
                else if(info.status===1){
                    badge=<Badge color="info">Submitted</Badge>
                }
                else if(info.status===2){
                    badge=<Badge color="success">Verified</Badge>
                }
                return { sno: index + 1, uid: info.uid, fsalary: info.fsalary, fcertificate: info.fcertificate, msalary: info.msalary, mcertificate: info.mcertificate, categ: info.categ,status:badge,statusCode:info.status }
              })
            )
          }
          else if (result.status === 400) {
            alert('task not completed');
          }
          else if (result.status === 401) {
            alert('Session timed out. Login again');
          }
        }
        fetchData0();
      }
      if (status === 1) {
        const fetchData1 = async () => {
          const result = await fetch(`${BaseUrl}/api/o/mcn/submitted`, {
            headers: { Authorization: `Bearer ${token}` }

          });
          const res = await result.json();
          if (res.err===false) {
            setData1(
              res.data.map((info, index) => {
                let badge=null;  
                if(info.status===-1){
                   badge=<Badge color="danger">Denied</Badge>
                   }
                else if(info.status===0){
                    badge=<Badge color="warning">Applied</Badge>
                }
                else if(info.status===1){
                    badge=<Badge color="info">Submitted</Badge>
                }
                else if(info.status===2){
                    badge=<Badge color="success">Verified</Badge>
                }
                return { sno: index + 1, uid: info.uid, fsalary: info.fsalary, fcertificate: info.fcertificate, msalary: info.msalary, mcertificate: info.mcertificate, categ: info.categ,status:badge }
              })
            )
          }
          else if (result.status === 400) {
            alert('task not completed');
          }
          else if (result.status === 401) {
            alert('Session timed out. Login again');
          }
        }
        fetchData1();
      }
      if (status === 2) {
        const fetchData2 = async () => {
          const result = await fetch(`${BaseUrl}/api/o/mcn/verified`, {
            headers: { Authorization: `Bearer ${token}` }

          });
          const res = await result.json();
          if (res.err===false) {
            setData2(
              res.data.map((info, index) => {
                let badge=null;  
                if(info.status===-1){
                   badge=<Badge color="danger">Denied</Badge>
                   }
                else if(info.status===0){
                    badge=<Badge color="warning">Applied</Badge>
                }
                else if(info.status===1){
                    badge=<Badge color="success">Submitted</Badge>
                }
                else if(info.status===2){
                    badge=<Badge color="success">Verified</Badge>
                }
                return { sno: index + 1, uid: info.uid, fsalary: info.fsalary, fcertificate: info.fcertificate, msalary: info.msalary, mcertificate: info.mcertificate, categ: info.categ,status:badge }
              })

            )
          }
          else if (result.status === 400) {
            alert('task not completed');
          }
          else if (result.status === 401) {
            alert('Session timed out. Login again');
          }
        }
        fetchData2();
      }
      if (status === 3) {
        const fetchData3 = async () => {
          const result = await fetch(`${BaseUrl}/api/o/mcn/denied`, {
            headers: { Authorization: `Bearer ${token}` }

          });
          const res = await result.json();
          if (res.err===false) {
            setData3(
              res.data.map((info, index) => {
                let badge=null;  
                if(info.status===-1){
                   badge=<Badge color="danger">Denied</Badge>
                   }
                else if(info.status===0){
                    badge=<Badge color="warning">Applied</Badge>
                }
                else if(info.status===1){
                    badge=<Badge color="success">Submitted</Badge>
                }
                else if(info.status===2){
                    badge=<Badge color="success">Verified</Badge>
                }
                return { sno: index + 1, uid: info.uid, fsalary: info.fsalary, fcertificate: info.fcertificate, msalary: info.msalary, mcertificate: info.mcertificate,categ: info.categ,status:badge  }
              })

            )
          }
          else if (result.status === 400) {
            alert('task not completed');
          }
          else if (result.status === 401) {
            alert('Session timed out. Login again');
          }
        }
        fetchData3();
      }





  }catch(err){
      console.log(err);
    }
  
  },[status,token,dataSent]);


  const sendSubmitData = async (uid,fcerti,mcerti) => {

    const result = await fetch(`${BaseUrl}/api/o/mcn/submit`, {
      method: "post",
      headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        uid:uid,
        fcertificate:fcerti,
        mcertificate:mcerti
      })
    })
    const res = await result.json();
    if (result.status === 200 || result.status === 201 || result.status === 304) {
     setDataSent(`sent-${uid}-${fcerti}`);
     setSuccess(true);
     
     
    }
    else if (res.err===false) {
      alert("error")
    }
    else if (result.status === 422) {
      alert("Empty field")
    }
    else if (result.status === 500) {
      alert("Server Error Contact SWD Nucleus")
    }

  }
  const sendVerifyData = async (uid) => {

    const result = await fetch(`${BaseUrl}/api/o/mcn/verify`, {
      method: "post",
      headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        uid:uid
      })
    })
    const res = await result.json();
    if (result.status === 200 || result.status === 201 || result.status === 304) {
     setDataSent(`verify-${uid}`);
     setSuccess(true);
     
     
    }
    else if (res.err===false) {
      alert("error")
    }
    else if (result.status === 422) {
      alert("Empty field")
    }
    else if (result.status === 500) {
      alert("Server Error Contact SWD Nucleus")
    }

  }
  const sendDenyData = async (uid) => {

    const result = await fetch(`${BaseUrl}/api/o/mcn/deny`, {
      method: "post",
      headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        uid:uid
      })
    })
    const res = await result.json();
    if (result.status === 200 || result.status === 201 || result.status === 304) {
     setDataSent(`deny-${uid}`);
     setSuccess(true);
     
     
    }
    else if (res.err===false) {
      alert("error")
    }
    else if (result.status === 422) {
      alert("Empty field")
    }
    else if (result.status === 500) {
      alert("Server Error Contact SWD Nucleus")
    }

  }
  
      

        
          
    
 
  return (
      <div>
        <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>BITS-PILANI,HYDERABAD CAMPUS</strong></h2>
      </div>
      <GridContainer  justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            setStatus={setStatus}
            headerColor="primary"
            tabs={[
              {
                tabName: "Applied",
                                
                tabContent: (
                  <MaterialTable
                  title="APPLIED MCN APPLICATIONS"
                  columns={[
                   {title:"S No.",field:"sno"},
                   {title:"Student ID",field:"uid"},
                   {title:"Father's Salary",field:"fsalary"},
                   {title:"Father's Certificate",field:"fcertificate"},
                   {title:"Mother's Salary",field:"msalary"},
                   {title:"Mother's Certificate",field:"mcertificate"},
                   {title:"Category",field:"categ"},
                   {title:"Appln Status",field:"status"}
                  ]}
                  data={data0}
                  actions={[
                    rowData=>({
                        icon: 'check',
                        disabled:rowData.statusCode!==0,
                        tooltip: 'Submit',
                        onClick: async (event, rowData) => {
                          sendSubmitData(rowData.uid,rowData.fcertificate,rowData.mcertificate)
                          }         
            
                      })
                  ]}
            
                  options={{
                    
                    search:true,
                    pageSize:10,
                    emptyRowsWhenPaging:false
                    }}
                  
                           
                />
                )
              },
              {
                tabName: "Submitted", 
                            
                tabContent: (
                  <MaterialTable
                  title="SUBMITTED MCN APPLICATIONS"
                  columns={[
                    {title:"S No.",field:"sno"},
                   {title:"Student ID",field:"uid"},
                   {title:"Father's Salary",field:"fsalary"},
                   {title:"Father's Certificate",field:"fcertificate"},
                   {title:"Mother's Salary",field:"msalary"},
                   {title:"Mother's Certificate",field:"mcertificate"},
                   {title:"Category",field:"categ"},
                   {title:"Appln Status",field:"status"}
                  ]}
                  data={data1}
                  actions={[
                    {
                      icon: 'check',
                      tooltip: 'Verify',
                      onClick: async (event, rowData) => {
                        sendVerifyData(rowData.uid)
                        }         
          
                    },
                    {
                        icon: 'close',
                        tooltip: 'Deny',
                        onClick: async (event, rowData) => {
                          sendDenyData(rowData.uid)
                          }         
            
                      }
                ]}
            
                  options={{
                    
                    search:true,
                    pageSize:10,
                    emptyRowsWhenPaging:false
                    }}
                  
                           
                />
                )
              },
              {
                tabName: "Verified", 
                               
                tabContent: (
                  <MaterialTable
                  title="VERIFIED APPLICATIONS"
                  columns={[
                    {title:"S No.",field:"sno"},
                   {title:"Student ID",field:"uid"},
                   {title:"Father's Salary",field:"fsalary"},
                   {title:"Father's Certificate",field:"fcertificate"},
                   {title:"Mother's Salary",field:"msalary"},
                   {title:"Mother's Certificate",field:"mcertificate"},
                   {title:"Category",field:"categ"},
                   {title:"Appln Status",field:"status"}
                  ]}
                  data={data2}
                  actions={[
                    {
                        icon: 'close',
                        tooltip: 'Deny',
                        onClick: async (event, rowData) => {
                          sendDenyData(rowData.uid)
                          }         
            
                      }
                  ]}
            
                  options={{
                    
                    search:true,
                    pageSize:10,
                    emptyRowsWhenPaging:false
                    }}
                  
                           
                />
                )
              },
              {
                tabName: "Denied", 
                               
                tabContent: (
                  <MaterialTable
                  title="DENIED APPLICATIONS"
                  columns={[
                    {title:"S No.",field:"sno"},
                    {title:"Student ID",field:"uid"},
                    {title:"Father's Salary",field:"fsalary"},
                    {title:"Father's Certificate",field:"fcertificate"},
                    {title:"Mother's Salary",field:"msalary"},
                    {title:"Mother's Certificate",field:"mcertificate"},
                    {title:"Category",field:"categ"},
                    {title:"Appln Status",field:"status"}
                  ]}
                  data={data3}
                  actions={[
                      {
                        icon: ()=><AssignmentReturnIcon/>,
                        tooltip: 'Re-submit',
                        onClick: async (event, rowData) => {
                            sendSubmitData(rowData.uid,rowData.fcertificate,rowData.mcertificate)  
                                                       
            
                      }
                    }
                  ]}
            
                  options={{
                    
                    search:true,
                    pageSize:10,
                    emptyRowsWhenPaging:false
                    }}
                  
                           
                />
                )
              }
            ]}
          />
          <Snackbar
           anchorOrigin={{horizontal:'left',vertical:'bottom'}}
            open={success}
            autoHideDuration={4000}
            onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success">
              Task Completed SuccessFully
        </Alert>
          </Snackbar>
        </GridItem>
        </GridContainer>
         
  </div>
    );
}
