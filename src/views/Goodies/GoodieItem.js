import React from "react";


// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Badge from "components/Badge/Badge.js";

import GoodieModal from "views/Modals/GoodieModal.js";
import CancelModal from "views/Modals/CancelModal.js";
import GoodieInfoModal from "views/Modals/GoodieInfoModal";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


const useStyles = makeStyles(styles);

export default function GoodieItem({
  goodieId,
  goodieHostId,
  goodieType, 
  goodieName,
  goodieImage,
  goodieContactName,
  goodieContactNo,
  goodieSeller,
  goodiePrice,
  minAmount,
  maxAmount,
  size,
  limit,
  deduction,
  setIsUpdated}) {
  const [goodieModal, openGoodieModal] = React.useState(false);
  const [cancelModal, openCancelModal] = React.useState(false);
  const [infoModal,openInfoModal]=React.useState(false);
  const {uid}=JSON.parse(localStorage.getItem("data"));
  const classes = useStyles();
  let match=false;
  let cancelOrder={};
  deduction.forEach((item)=>{
    if(item.g_id===goodieId && item.isCancellable===1){
       cancelOrder=item;
      match=true;
    }
  })
  const orderButton=match?     
  <Button size='lg' round color="info" onClick={()=>{openCancelModal(true)}}>
    Cancel Order
  </Button>
   :
   <Button size='lg' round color="info" onClick={()=>{openGoodieModal(true)}}>
    Buy/View
   </Button>  
   ;
  return (
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="Transparent" >  
               {match?<Badge color="success">Order Placed!</Badge>:null}
              <div style={{width:'100%',display:'flex',justifyContent:"space-between"}}>
              <h3 className={classes.cardTitle}>
                  {goodieName}                
              </h3>
              <h3 className={classes.cardTitle} >
                 {goodieId===2?null:`₹ ${goodiePrice}`}
              </h3>
              </div>
            </CardHeader>
            <CardBody>
                 <GridContainer direction="row" spacing={3} > 
                    <GridItem xs={12} sm={6}>
                       <img className={classes.imgRounded + " " + classes.imgFluid} src={goodieImage} alt="goodie"></img>
                   </GridItem>
                   <GridItem xs={12} sm={6}>
                   <GridContainer  direction="column"  justify="center" alignItems="center">
                        <GridItem >
                            <div className={classes.typo}>
                              <h4>This goodie is sold by {goodieSeller}  </h4>
                               <p>For any queries please contact<br/>{goodieContactName}<br/>Ph No. - {goodieContactNo} </p>
                            </div>
                            </GridItem>
                            <GridItem>
                            {orderButton}
                            </GridItem>
                            
                             
                  </GridContainer>
                  </GridItem>
                 </GridContainer>
            </CardBody>
            <CardFooter stats>
             <GridContainer spacing={5}>
               <GridItem>
                <Button round>
                 View Size Chart
                </Button>
                </GridItem>
                <GridItem>
                  {uid === goodieHostId ? 
                    <Button round color="rose" onClick={()=>{openInfoModal(true)}}>
                      Get Sales Info  
                    </Button>
                       :null}
                </GridItem>
              </GridContainer>
           </CardFooter>
          </Card>
          <GoodieModal 
            open={goodieModal} 
            setOpen={openGoodieModal}
            goodieName={goodieName} 
            goodieImage={goodieImage} 
            goodieSeller={goodieSeller}           
            goodiePrice={goodiePrice}
            minAmount={minAmount}
            maxAmount={maxAmount}
            size={size}
            limit={limit} 
            goodieType={goodieType}
            goodieId={goodieId}
            setIsUpdated={setIsUpdated}
           />
          <CancelModal 
          open={cancelModal} 
          setOpen={openCancelModal}
          cancelOrder={cancelOrder}
          setIsUpdated={setIsUpdated}
           />
           {uid===goodieHostId?
           <GoodieInfoModal 
          open={infoModal} 
          setOpen={openInfoModal}
          goodieType={goodieType}
          goodieId={goodieId}
          
           />:null}
        </GridItem>
        

  );
}
