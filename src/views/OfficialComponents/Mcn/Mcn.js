import React from "react";
import MaterialTable from "material-table";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import GetAppIcon from '@material-ui/icons/GetApp';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Badge from "components/Badge/Badge.js";
import CustomTabs from "components/CustomTabs/EditedTabs.js";
import RemarkModal from "./RemarkModal";
import RejectModal from "./RejectModal";
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

  const [status,setStatus]=React.useState(0);
  const [dataSent,setDataSent]=React.useState(false)
  //const [loading,setLoading]=React.useState(false)
  //const [outData,setOutData]=React.useState({
    //  fsalary:null,
      //new_status:null
  //})
  const [success, setSuccess] = React.useState(false);
  const [remarkData,setRemarkData]=React.useState({});
  const [rejectData,setRejectData]=React.useState({});
  const [openRejectModal,setOpenRejectModal]=React.useState(false);
  const [open,setOpen]=React.useState(false)
  const [updated,setUpdated]=React.useState(false)
  
    
  

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
          const result = await fetch(`${BaseUrl}/api/o/mcn/get?status=0`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const res = await result.json();
          if (res.err===false) {
            setData0(
              res.data.map((info, index) => {
                let badge=null;  
                if(info.status===-1){
                   badge=<Badge color="danger">Rejected</Badge>
                   }
                   else if(info.status===0 && info.updated===0){
                    badge=<Badge color="info">Remarked</Badge>
                }
                else if(info.status===0 && info.updated===1){
                    badge=<Badge color="warning">Pending</Badge>
                }
                else if(info.status===1){
                    badge=<Badge color="success">Accepted</Badge>
                }
               
                return { sno: index + 1, uid: info.uid, name:info.name,fsalary: info.fsalary, msalary: info.msalary,  categ: info.categ,status:badge,statusCode:info.status,remark:info.remark,upload:info.upload }
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
          const result = await fetch(`${BaseUrl}/api/o/mcn/get?status=1`, {
            headers: { Authorization: `Bearer ${token}` }

          });
          const res = await result.json();
          if (res.err===false) {
            setData1(
              res.data.map((info, index) => {
                let badge=null;  
                if(info.status===-1){
                   badge=<Badge color="danger">Rejected</Badge>
                   }
                   else if(info.status===0 && info.updated===0){
                    badge=<Badge color="info">Remarked</Badge>
                }
                else if(info.status===0 && info.updated===1){
                    badge=<Badge color="warning">Pending</Badge>
                }
                else if(info.status===1){
                    badge=<Badge color="success">Accepted</Badge>
                }
                return { sno: index + 1, uid: info.uid, name:info.name,fsalary: info.fsalary, msalary: info.msalary,  categ: info.categ,status:badge,statusCode:info.status,remark:info.remark,upload:info.upload }
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
      if (status === -1) {
        const fetchData2 = async () => {
          const result = await fetch(`${BaseUrl}/api/o/mcn/get?status=-1`, {
            headers: { Authorization: `Bearer ${token}` }

          });
          const res = await result.json();
          if (res.err===false) {
            setData2(
              res.data.map((info, index) => {
                let badge=null;  
                if(info.status===-1){
                   badge=<Badge color="danger">Rejected</Badge>
                   }
                   else if(info.status===0 && info.updated===0){
                    badge=<Badge color="info">Remarked</Badge>
                }
                else if(info.status===0 && info.updated===1){
                    badge=<Badge color="warning">Pending</Badge>
                }
                else if(info.status===1){
                    badge=<Badge color="success">Accepted</Badge>
                }
               
                return { sno: index + 1, uid: info.uid, name:info.name,fsalary: info.fsalary, msalary: info.msalary,  categ: info.categ,status:badge,statusCode:info.status,remark:info.remark,upload:info.upload }
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





  }catch(err){
      console.log(err);
    }
  
  },[status,token,dataSent,updated]);

  const sendApplyData = async (uid) => {

    const result = await fetch(`${BaseUrl}/api/o/mcn/change`, {
      method: "post",
      headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        uid:uid,
        new_status:0,
        remark:'Re-Applied by the Committee'
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
  

  const sendVerifyData = async (uid) => {

    const result = await fetch(`${BaseUrl}/api/o/mcn/change`, {
      method: "post",
      headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        uid:uid,
        new_status:1,
        remark:'Application Accepted'
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

    const result = await fetch(`${BaseUrl}/api/o/mcn/change`, {
      method: "post",
      headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        uid:uid,
        new_status:-1,
        remark:"Application Rejected"
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
                tabName: "Pending",                                
                tabContent: (
                  <MaterialTable
                  title="PENDING MCN APPLICATIONS"
                  columns={[
                   {title:"S No.",field:"sno"},
                   {title:"Student ID",field:"uid"},
                   {title:"Name",field:"name"},                   
                   {title:"Father's Salary",field:"fsalary"},
                   {title:"Mother's Salary",field:"msalary"},                  
                   {title:"Category",field:"categ"},
                   {title:"Remarks",field:"remark"},
                   {title:"Appln Status",field:"status"}
                  ]}
                  data={data0}
                  actions={[
                    rowData=>({
                    icon: ()=><GetAppIcon />,
                      disabled:rowData.statusCode!==0,
                      tooltip: 'Download Documents',
                      onClick:  (event, rowData) => {
                        window.open(rowData.upload,'_self')
                        }         
                    }),
                    rowData=>({
                        icon: 'edit',
                        disabled:rowData.statusCode!==0,
                        tooltip: 'Give Remarks',
                        onClick: async (event, rowData) => {
                          setRemarkData(rowData);
                          setOpen(true);
                          }         
                      }),
                      rowData=>({
                        icon: 'check',
                        disabled:rowData.statusCode!==0,
                        tooltip: 'Accept',
                        onClick: async (event, rowData) => {
                          sendVerifyData(rowData.uid)
                          }         
            
                      }),
                      rowData=>({
                        icon: 'close',
                        disabled:rowData.statusCode!==0,
                        tooltip: 'Reject',
                        onClick: async (event, rowData) => {
                          setRejectData(rowData);
                          setOpenRejectModal(true);
                          }         
            
                      }),

                  ]}
            
                  options={{
                    search:true,
                    pageSize:10,
                    emptyRowsWhenPaging:false,
                    }}
                  
                           
                />
                )
              },
              
              {
                tabName: "Accepted", 
                               
                tabContent: (
                  <MaterialTable
                  title="ACCEPTED APPLICATIONS"
                  columns={[
                   {title:"S No.",field:"sno"},
                   {title:"Student ID",field:"uid"},
                   {title:"Father's Salary",field:"fsalary"},
                   {title:"Mother's Salary",field:"msalary"},
                   {title:"Category",field:"categ"},
                   {title:"Remarks",field:"remark"},                  
                   {title:"Appln Status",field:"status"}
                  ]}
                  data={data1}
                  actions={[
                    rowData=>({
                    icon: ()=><GetAppIcon />,
                      
                      tooltip: 'Download Documents',
                      onClick:  (event, rowData) => {
                        window.open(rowData.upload,'_self')
                        }         
                    }),
                    {
                      icon: ()=><AssignmentReturnIcon/>,
                      tooltip: 'Re-submit',
                      onClick: async (event, rowData) => {
                          sendApplyData(rowData.uid)  
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
                tabName: "Rejected", 
                               
                tabContent: (
                  <MaterialTable
                  title="REJECTED APPLICATIONS"
                  columns={[
                    {title:"S No.",field:"sno"},
                   {title:"Student ID",field:"uid"},
                   {title:"Name",field:"name"},                   
                   {title:"Father's Salary",field:"fsalary"},
                   {title:"Mother's Salary",field:"msalary"},                  
                   {title:"Category",field:"categ"},
                   {title:"Remarks",field:"remark"},
                   {title:"Appln Status",field:"status"}
                  ]}
                  data={data2}
                  actions={[
                      
                  ]}
                  actions={[
                    rowData=>({
                    icon: ()=><GetAppIcon />,
                     
                      tooltip: 'Download Documents',
                      onClick:  (event, rowData) => {
                        window.open(rowData.upload,'_self')
                        }         
                    }),
                      {
                        icon: ()=><AssignmentReturnIcon/>,
                        tooltip: 'Re-submit',
                        onClick: async (event, rowData) => {
                            sendApplyData(rowData.uid)  
                      }
                    },

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
         <RemarkModal open={open} setOpen={setOpen} setUpdated={setUpdated} data={remarkData}/>
         <RejectModal open={openRejectModal} setOpen={setOpenRejectModal} setUpdated={setUpdated} data={rejectData}/>
  </div>
    );
}
