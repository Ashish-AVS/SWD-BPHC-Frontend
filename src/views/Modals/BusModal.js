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


export default function BusModal({Modal,openModal}){
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
          <h3 className={classes.modalTitle}><strong>212 Bus Timings</strong></h3>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <h5>From Secunderabad Railway Station (Gurudwara Point) to BITS Main gate:</h5>
          <p>07:50, 08:20, 08:50, 09:50, 11:00, 12:00, 13:00, 14:10, 15:05, 16:05, 17:20, 18:15, 19:15, 20:15, 21:15. </p>
          <h5>From BITS Main Gate to Secunderabad Railway Station:</h5>
          <p>06:55 , 07:55 , 08:50, 09:20, 09:50, 11:00, 12:00, 13:00, 14:00, 15:05, 16:05, 17:20, 18:15, 19:15, 20:15.</p>
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
    );
}