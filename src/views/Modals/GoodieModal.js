import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from '@material-ui/core/CircularProgress';

//Core Components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import CustomInput from "components/CustomInput/CustomInput";

import {BaseUrl} from "variables/BaseUrl";

import styles from "assets/jss/material-kit-react/modalStyle";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function GoodieModal({
    open, 
    setOpen,
    goodieType,
    goodieName,
    goodieId, 
    goodieImage,            
    goodiePrice,
    minAmount,
    maxAmount,
    limit,
    setIsUpdated}){
const classes=useStyles();
const reference = React.useRef(null);
const {uid}=JSON.parse(localStorage.getItem("data"));
const token=JSON.parse(localStorage.getItem("tokens"));
const [loading,setLoading]=React.useState(false);
let totalQty=0;
let totalAmt=0;
//const [totalAmt,setTotalAmt]=React.useState(0);
const [sendingData,setSendingData]=React.useState(false);
const [goodieData,setGoodieData]=React.useState({
    xs:"0",
    s:"0",
    m:"0",
    l:"0",
    xl:"0",
    xxl:"0",
    xxxl:"0",
    net_quantity:"0",
    total_amount:"0"
})


React.useEffect(()=>{
  if(sendingData===true){
    try{
    const sendData=async ()=>{
      setLoading(true); 
      const result =await fetch(`${BaseUrl}/api/goodies`,{
          method:"post",
          headers:{'Content-Type':"application/json",
          Authorization:token},
          body:JSON.stringify({
             uid:uid,
             g_id:goodieId,
             xs:goodieData.xs,
             s:goodieData.s,
             m:goodieData.m,
             l:goodieData.l,
             xl:goodieData.xl,
             xxl:goodieData.xxl,
             xxxl:goodieData.xxxl,
             net_quantity:`${totalQty}`,
             total_amount:`${totalAmt}`
          })
         })
        if(result.status===200||result.status===201){ 
          setSendingData(false);
          setIsUpdated(`Place ${goodieId}`);
          setLoading(false);
          
          setGoodieData(prevState=>({
            ...prevState,
            xs:"0",
            s:"0",
            m:"0",
            l:"0",
            xl:"0",
            xxl:"0",
            xxxl:"0",
            net_quantity:"0",
            total_amount:"0"
          })
            
          )
          setOpen(false);
        }
        else if(result.status===401){
          alert('Session Expiration Detected. Try Refreshing the page')
        }
        else if(result.status===422){
           alert('ensure empty fields are set to 0')
           setSendingData(false);
           setLoading(false);
        }
       
      }
    sendData();
    //console.log(totalQty);
    //console.log(goodieData);    
    //setSendingData(false);  
    }
    catch(err){
      console.log(err);
    }
  }
},[sendingData,goodieData,token])

function onChange(e){
    console.log(e.target.value)
    const { name,id} = e.target;
   
    document.getElementById(id).oninput = function () {
        var max = parseInt(this.max);
        var min = parseInt(this.min);
        if (parseInt(this.value) > max) {
            this.value = max;
            setGoodieData(prevState=>({
                ...prevState,
                [name]: this.value
            })
            ); 
        }
        else if (parseInt(this.value) < min) {
            this.value = min;
            setGoodieData(prevState=>({
                ...prevState,
                [name]: this.value
            })
            ); 
        }
        else{
          
        setGoodieData(prevState=>({
            ...prevState,
            [name]: this.value
        })
        );  
      }  
    }
    
    }
  
let goodieContent=<></>

if(goodieType===0){
          totalQty=(parseInt(goodieData.xs)+parseInt(goodieData.s)+parseInt(goodieData.m)+parseInt(goodieData.l)+parseInt(goodieData.xl)+parseInt(goodieData.xxl)+parseInt(goodieData.xxxl));
        const Qty=totalQty?totalQty:0;
         totalAmt=(parseInt(Qty)*parseInt(goodiePrice))?(parseInt(Qty)*parseInt(goodiePrice)):0; 
         goodieContent=
    <GridContainer direction="column" spacing={0} >
        <GridItem>
<p>Select your required Size and Quantity here:<br/><b>(Put 0 for unselected sizes)</b><br/>Max Amount : {maxAmount}</p>
        </GridItem>
        <GridItem>
      <GridContainer spacing={2}>
        <GridItem>
        <CustomInput
        labelText="XS"
        id="xs" 
        ref={reference}                      
        onChange={onChange}
        inputProps={{
        type:"number",
        name:'xs',
        inputProps: { min: 0, max: 10 },
        value:goodieData.xs
          }}  
      />
      </GridItem>
      <GridItem>
      <CustomInput
        labelText="S"
        id="s"
        onChange={onChange}
        inputProps={{
        type:"number",
        name:'s',
        inputProps: { min: 0, max: 10 },
        //defaultValue:goodieData.s,
        value:goodieData.s
          }}
       />
       </GridItem>
       <GridItem>
       <CustomInput
        labelText="M"
        id="m"
        onChange={onChange}
        inputProps={{
        type:"number",
        name:'m',
        inputProps: { min: 0, max: 10 },
        //defaultValue:0,
        value:goodieData.m
          }}
       />
       </GridItem>
       <GridItem>
       <CustomInput
        labelText="L"
        id="l"
        onChange={onChange}
        inputProps={{
        type:"number",
        name:'l',
        inputProps: { min: 0, max: 10 },
        //defaultValue:0
        value:goodieData.l
          }}
       />
       </GridItem>
       <GridItem>
       <CustomInput
        labelText="XL"
        id="xl"
        onChange={onChange}
        inputProps={{
        type:"number",
        name:'xl',
        inputProps: { min: 0, max: 10 },
        //defaultValue:0,
        value:goodieData.xl
          }}
       />
       </GridItem>
       <GridItem>
       <CustomInput
        labelText="XXL"
        id="xxl"
        onChange={onChange}
        inputProps={{
        type:"number",
        name:'xxl',
        inputProps: { min: 0, max: 10 },
        //defaultValue:0,
        value:goodieData.xxl
          }}
       />
       </GridItem>
       <GridItem>
       <CustomInput
        labelText="XXXL"
        id="xxxl"
        onChange={onChange}
        inputProps={{
        type:"number",
        name:'xxxl',
        inputProps: { min: 0, max: 10 },
        //defaultValue:0,
        value:goodieData.xxxl
          }}

       />
       </GridItem>
       </GridContainer>
       </GridItem>
       <GridItem>
          <p>Total Quantity: {`${Qty}`} </p>
          <p>Total Amount: ₹ {`${totalAmt}`}</p>
        </GridItem>
        </GridContainer>}

    else if(goodieType===1){
        totalQty=parseInt(goodieData.net_quantity)?parseInt(goodieData.net_quantity):0;
        totalAmt=(parseInt(goodieData.net_quantity)*parseInt(goodiePrice))?(parseInt(goodieData.net_quantity)*parseInt(goodiePrice)):0;
        goodieContent=
        <GridContainer>
            <GridItem>
             <p>Max Quantity:{limit}</p>
            </GridItem>
        <GridItem xs={12}>
        <CustomInput
         labelText="Enter Quantity"
         id={goodieName}
        
         formControlProps={{
            fullWidth: true
          }}
          onChange={onChange}
         inputProps={{
         type:"number",
         name:'net_quantity',
         inputProps: { min: parseInt(minAmount), max: parseInt(limit) },
         ////defaultValue:0,
         value:goodieData.net_quantity
           }}
 
        />
        </GridItem>
        <GridItem>
          <p>Total Quantity:{`${totalQty}`} </p>
          <p>Total Amount: ₹ {`${totalAmt}`}</p>
        </GridItem>
        </GridContainer>
        
    }
    else if(goodieType===2){
        totalAmt=parseInt(goodieData.total_amount)?parseInt(goodieData.total_amount):0;
        goodieContent=
        <GridContainer>
            <GridItem>
             <p>Max Amount:{maxAmount}</p>
            </GridItem>
        <GridItem xs={12}>
        <CustomInput
         labelText="Enter Amount Here"
         id="Amount"
         formControlProps={{
            fullWidth: true
          }}
          onChange={onChange}
         inputProps={{
         
         type:"number",
         name:'total_amount',
         inputProps: { min: 0, max: parseInt(maxAmount) },
         ////defaultValue:0,
         value:goodieData.total_amount
           }}
 
        />
        </GridItem>
        <GridItem>
         <h6>Total Amount:{`${totalAmt}`}</h6>
        </GridItem>
        </GridContainer>
    }
    

    return(
        <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  maxWidth="md"
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
                    <h3 className={classes.modalTitle}><strong>Goodie Order</strong></h3>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                <GridContainer direction="row" justify="center" alignItems="center">
                    <GridItem xs={12} sm={6}>
                       <img className={classes.imgRounded + " " + classes.imgFluid} src={goodieImage} alt="goodie"></img>
                   </GridItem>
                   <GridItem xs={12} sm={4}>
                   <GridContainer  direction="column"  justify="center" alignItems="center">
                        <GridItem >
                            <div>
                              <h4><strong>{goodieName}</strong>- ₹ {goodiePrice}</h4>    
                              </div>
                                  {goodieContent}
                            </GridItem>
                            <GridItem>
                            
                            {loading?<CircularProgress size={24} color="primary"/>:null}
                            <Button size='lg' round color="info"  onClick={()=>{setSendingData(true)}} disabled={loading||(totalAmt>maxAmount)} >

                                Place Order
                            </Button>
                             
                             </GridItem>
                  </GridContainer>
                  </GridItem>
                 </GridContainer>
                  
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Button
                      onClick={() => {
                        setOpen(false);
                      setGoodieData(prevState=>({
                        ...prevState,
                        xs:"0",
                        s:"0",
                        m:"0",
                        l:"0",
                        xl:"0",
                        xxl:"0",
                        xxxl:"0",
                        net_quantity:"",
                        total_amount:""

                      }))
                    }}
                      color="danger"
                      solid
                      round
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
    );
}