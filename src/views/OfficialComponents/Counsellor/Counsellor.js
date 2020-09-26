import React from "react";
import MaterialTable from "material-table";
import moment from 'moment';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import RefreshIcon from '@material-ui/icons/Refresh';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Badge from "components/Badge/Badge.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import {BaseUrl} from "variables/BaseUrl";
import RescheduledModal from './RescheduleModal';
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
  const [cancelId,setCancelId]=React.useState('');  
  const [status,setStatus]=React.useState(0);
  const [dataSent,setDataSent]=React.useState(false);
  const [sendingData,setSendingData]=React.useState(false);
  const [open,setOpen]=React.useState(false);
  //const [loading,setLoading]=React.useState(false)
  //const [outData,setOutData]=React.useState({
    //  fsalary:null,
      //new_status:null
  //})
  const [success, setSuccess] = React.useState(false);
  const [err,setErr]=React.useState(false);
  const [errMsg,setErrMsg]=React.useState('');

  
    
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErr(false);
    setErrMsg('');
    setSuccess(false);
  };
  

  React.useEffect(()=>{
    try{
      if (status == 0) {
        const fetchData0 = async () => {
          const result = await fetch(`${BaseUrl}/api/o/counsellor/booked`, {
            headers: { Authorization: `Bearer ${token}` }

          });
          const res = await result.json();
          if (res.err===false) {
            setData0(
              res.data.map((info, index) => {
                let hour= moment(info.slot,'H').format('hh:mm a');
                let hour1=moment(info.slot,'H').add(1,'h').format('hh:mm a');
                return {sno:index+1,bdate:info.date,btime:`${hour}-${hour1}`,booking_id:info.booking_id}
                
              })
            )
          }
          else if (res.err === true) {
            setErr(true);
            setErrMsg(res.msg);
          }
         
        }
        fetchData0();
      }
      if (status === 1) {
        const fetchData1 = async () => {
          const result = await fetch(`${BaseUrl}/api/o/counsellor/free`, {
            headers: { Authorization: `Bearer ${token}` }

          });
          const res = await result.json();
          if (res.err===false) {
            setData1(
              res.data.map((info, index) => {
                let hour= moment(info.slot,'H').format('hh:mm a');
                let hour1=moment(info.slot,'H').add(1,'h').format('hh:mm a');
                return {sno:index+1,date:info.date,slotTime:`${hour}-${hour1}`,slot:info.slot}
              })
            )
          }
          else if (res.err === true) {
            setErr(true);
            setErrMsg(res.msg);
          }
        }
        fetchData1();
      } 

  }catch(err){
      console.log(err);
    }
  
  },[status,token,dataSent]);


     
 
  return (
      <div>
        <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>BITS-PILANI,HYDERABAD CAMPUS</strong></h2>
      </div>
      <GridContainer  justify="center" alignItems="center">
        <GridItem xs={12} sm={12} md={12} >
        <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><b>GOODIES DATA</b></h4>
            </CardHeader>
            <MaterialTable
                  title="UPCOMING BOOKED SLOTS"
                  columns={[
                    {title:"S No.",field:"sno"},
                    {title:"Booking ID",field:"booking_id"},
                    {title:"Booking Date",field:"bdate"},
                    {title:"Booking Time",field:"btime"}
                  ]}
                  data={data0}
                  actions={[
                    {
                       icon:()=><RefreshIcon />,                        
                        tooltip: 'Re-Schedule',
                        onClick: async (event, rowData) => {
                          setCancelId(rowData.booking_id);
                          setSendingData(true)
                          setOpen(true)
                          }         
            
                      }
                  ]}
            
                  options={{
                    
                    search:true,
                    pageSize:10,
                    emptyRowsWhenPaging:false
                    }}
                  
                           
                />
          </Card>
         
         
        </GridItem>
        </GridContainer>
         {sendingData?<RescheduledModal open={open} setOpen={setOpen} cancelId={cancelId} setIsUpdated={setDataSent}/>:null}
  </div>
    );
}
