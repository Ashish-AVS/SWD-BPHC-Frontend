import React from "react";
import MaterialTable from "material-table";
import {Redirect} from 'react-router-dom';
// import {saveAs} from 'file-saver';
import axios from "axios"


//Auth Components
import { useAuth } from "context/auth";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from '@material-ui/icons/Visibility';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';

import AlertComponent from "components/Alert/Alert"
// import VisibilityIcon from '@mui/icons-material/ArrowCircleLeft';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Badge from "components/Badge/Badge.js";

import InvViewModal from "./InventoryViewModal"
import AddItemModal from "./InventoryAddModal"
import DeleteItemModal from "./InventoryDeleteModal"
import InventotyCheckinModal from "./InventoryCheckinModal"
import InventotyCheckoutModal from "./InventoryCheckoutModal"


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


const condtion = {
  1 : "Good", 
  2 : "Decent", 
  3 : "Needs Repair", 
  4 : "Non-functional"
}


const useStyles = makeStyles(styles);

export default function Outstation() {
  const classes = useStyles();
  const token=JSON.parse(localStorage.getItem("officialtokens"));
  const [ invData, setInvData] = React.useState([]);
  const [err,setErr]=React.useState(false);
  const [msg,setMsg]=React.useState(false);
  const [success,setSuccess]=React.useState(false);
  const [rowData, setRowData] = React.useState()
  const [ openViewModal, setOpenViewModal ] = React.useState(false)
  const [ openAddModal, setOpenAddModal ] = React.useState(false)
  const [ openDeleteModal, setOpenDeleteModal ] = React.useState(false)
  const [ openCheckoutModal, setOpenCheckoutModal ] = React.useState(false)
  const [ openCheckinModal, setOpenCheckinModal ] = React.useState(false)

  const [ updated, setUpdated ] = React.useState(true)
  const {onOfficialLogin}=useAuth();  
  

  

  React.useEffect(() => {
    if (updated === true) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${BaseUrl}/api/o/inventory/get-all`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (res.status == 401) {
            logout();
          }
          if (res.data.err) {
            setMsg(res.data.msg)
            setErr(true)
          }
          else {
            setInvData(
              res.data.data.map((item, index) => {
                let inv_badge;
                if (item.inv_status === 1) {
                  inv_badge = <Badge color="success">Available</Badge>
                }
                else {
                  inv_badge = <Badge color="danger">Checked Out</Badge>
                }
                return { ...item, inv_badge: inv_badge, item_condition_t : condtion[item.item_condition] }
              }))
          }

        } catch (err) {
          console.log(err)
        }
      }
      fetchData()
      setUpdated(false)


    }
  }, [updated])
  
  
  
  const logout=()=>{
    localStorage.removeItem("officialtokens");
    onOfficialLogin(false);  
    return (<Redirect exact to='/' />);
  }

  
  return (
      <div>
        <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>BITS-PILANI,HYDERABAD CAMPUS</strong></h2>
      </div>
      <GridContainer  justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={12}>
          
                  <MaterialTable

                  title="SU INVENTORY CATALOGUE"
                  columns={[
                   {title : "Inventory Code", field : "item_code"},
                   {title : "Inventory Name", field : "item_name"},                   
                   {title : "Equipment Type", field : "item_type"},
                   {title : "Condition", field : "item_condition_t"},
                   {title : "Status", field : "inv_badge"}
                  ]}

                  data = {invData}
                              
                  options={{
                    search:true,
                    pageSize:10,
                    emptyRowsWhenPaging:false,
                    }}

                  actions={[
                      {
                        icon: 'add',
                        tooltip: 'Add Item',
                        isFreeAction: true,
                        onClick: (event) => setOpenAddModal(true)
                      },
                      rdata => ({
                        icon: () => <VisibilityIcon/>,
                        tooltip: 'View',
                        onClick: async (event, rdata) => {
                          setRowData(rdata);
                          setOpenViewModal(true);
                          }         
                      }),
                      rdata =>({
                        icon: () => rdata.inv_status ? <SubdirectoryArrowLeftIcon/> : <SubdirectoryArrowRightIcon/>,
                        tooltip: rdata.inv_status ? 'Lend' : 'Recieve',
                        onClick: async (event, rdata) => {
                          setRowData(rdata);
                          if(rdata.inv_status){
                            setOpenCheckoutModal(true);
                          }
                          else{
                            setOpenCheckinModal(true);
                          }
                        }         
                        
                      }),
                      rdata => ({
                        icon: () => <DeleteIcon/>,
                        tooltip: 'Delete',
                        onClick: async (event, rdata) => {
                          setRowData(rdata);
                          setOpenDeleteModal(true);
                          }         
            
                      }),
                    ]}                           
                />
              
        </GridItem>
        </GridContainer>
         <AddItemModal open={openAddModal} setOpen={setOpenAddModal} setUpdated={setUpdated} />
         
         <InvViewModal open={openViewModal} setOpen={setOpenViewModal} setUpdated={setUpdated}  data={rowData}/>
         <DeleteItemModal open={openDeleteModal} setOpen={setOpenDeleteModal} setUpdated={setUpdated} setErr={setErr} setMsg={setMsg} setSuccess={setSuccess} data={rowData}/>
         <InventotyCheckoutModal open={openCheckoutModal} setOpen={setOpenCheckoutModal} setUpdated={setUpdated} data={rowData}/>
         <InventotyCheckinModal open={openCheckinModal} setOpen={setOpenCheckinModal} setUpdated={setUpdated} data={rowData}/>

         <AlertComponent isOpen={err} handleClose={() => setErr(false)} type="error" msg="Unable to load the data" />
         <AlertComponent isOpen={success} handleClose={() => setSuccess(false)} type="success" msg={msg} />
  </div>
    );
  }
