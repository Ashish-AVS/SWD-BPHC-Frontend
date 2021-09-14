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


//Core Components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/modalStyle";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = "Transition";


export default function ComplaintsModal({Modal,openModal}){
const classes=useStyles();

    return(
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
          <h3 className={classes.modalTitle}><strong>Anti Ragging</strong></h3>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
         <h4>
         The Institute has formulated strict anti-ragging guidelines, and all students are required to sign an undertaking to abide by these guidelines. If found violating these guidelines, students are liable to disciplinary action, including expulsion from the Institute and possible legal action as per the directive from the Honourable Supreme Court of India.
The Institute has formed a committee and anti-ragging squads at the hostel and institute level to combat raging. The students can also communicate directly with the Associate Dean, Students Welfare, through the Institute website.
         
          </h4>
          <div>
             <ol>
             <Link to="/anti-ragging/1_2021-22_Anti-ragging_Committee_14-9-2021.pdf" target="_blank" > <li>Institute Anti-ragging Committee</li></Link>
             <Link to="/anti-ragging/2_Institute_Level_Squad.pdf" target="_blank" > <li>Institute Level Squad</li></Link>
             <Link to="/anti-ragging/3_Institute_Level_Cell.pdf" target="_blank" >  <li>Institute Level Cell</li></Link>
             <Link to="/anti-ragging/4_Online_Registration_of_Anti-Ragging_Declaration_Form.pdf" target="_blank" >  <li>Online Registration Anti Ragging Declaration</li></Link>
             <Link to="/anti-ragging/Hyd_Campus_SWD_Anti_Ragging_Poster" target="_blank" > <li>Campus Anti-Ragging Poster</li></Link>
             <Link to="/anti-ragging/RaghvanReport.pdf" target="_blank" >  <li>Raghvan Report</li></Link>
             <Link to="/anti-ragging/SupremeCourtOrder.pdf" target="_blank" >  <li>Supreme Court Order</li></Link>
             <Link to="/anti-ragging/UGCRegulation.pdf" target="_blank" >  <li>UGC Regulation</li></Link>
             </ol> 
             {/* The respective help-desk incharge and user will receive email notification after a request is submitted.<br />
             <div align="center">
               The link to access the portal is given below<br />
             </div> */}
          </div>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
         
          <Button
            round
            onClick={() => openModal(false)}
            color="danger"
            solid="true"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
               
    );
}