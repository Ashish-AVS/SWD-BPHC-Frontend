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
            solid="true"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
               
    );
}