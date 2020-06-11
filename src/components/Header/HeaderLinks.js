/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
//import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import { Apps, CloudDownload} from "@material-ui/icons";
import BookIcon from '@material-ui/icons/Book';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import AssignmentIcon from '@material-ui/icons/Assignment';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";


import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function HeaderLinks(props) {
  const [classicModal, setClassicModal] = React.useState(false);
  const [classicModal1, setClassicModal1] = React.useState(false);
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Site Services"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="#" onClick={() => setClassicModal(true)} className={classes.dropdownLink}>
             <DirectionsBusIcon className={classes.icons} /> 212 Timings
            </Link>,
            <Link
              to="#"
              onClick={() => setClassicModal1(true)}
              className={classes.dropdownLink}
            >
              <AssignmentIcon className={classes.icons} />Complaints
            </Link>
          ]}
        />

      </ListItem>
      <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={classicModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setClassicModal(false)}
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
                      onClick={() => setClassicModal(false)}
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
                      onClick={() => setClassicModal(false)}
                      color="danger"
                      simple
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={classicModal1}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setClassicModal1(false)}
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
                      onClick={() => setClassicModal1(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h3 className={classes.modalTitle}><strong>Procees to send Commplaints</strong></h3>
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
                      onClick={() => setClassicModal1(false)}
                      color="danger"
                      simple
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
      <ListItem className={classes.listItem}>
        <Button
          href="#"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <BookIcon className={classes.icons} /> BITS CHRONICLES
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        
          <Button
            href='#'
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            {"External Links"}
          </Button>
        
      </ListItem>
      <ListItem className={classes.listItem}>
        
          <Button
            color="transparent"
            href="/official"
            
            className={classes.navLink}
          >
            {"For Officials"}
          </Button>
        
      </ListItem>
      <ListItem className={classes.listItem}>
        
          <Button
            color="transparent"
            href="#"
            target="_blank"
            className={classes.navLink}
          >
            {"About Us"}
          </Button>
        
      </ListItem>
      <ListItem className={classes.listItem}>

          <Button
            color="info"
            round
            href="/login-page"
            
            className={classes.navLink}
          >
           <VpnKeyIcon className={classes.icons} /> {"Login"}
          </Button>
      
      </ListItem>
    </List>
  );
}
