/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link,Redire } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Slide from "@material-ui/core/Slide";
//import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import { Apps} from "@material-ui/icons";
import LinkIcon from '@material-ui/icons/Link';
import BookIcon from '@material-ui/icons/Book';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ComplaintsModal from "views/Modals/ComplaintsModal";
import BusModal from "views/Modals/BusModal.js";
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
  const [busModal, setBusModal] = React.useState(false);
  const [complaintsModal, setComplaintsModal] = React.useState(false);
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
            <Link to="#" onClick={() => setBusModal(true)} className={classes.dropdownLink}>
             <DirectionsBusIcon className={classes.icons} /> 212 Timings
            </Link>,
            <Link
              to="#"
              onClick={() => setComplaintsModal(true)}
              className={classes.dropdownLink}
            >
              <AssignmentIcon className={classes.icons} />Complaints
            </Link>,
             <Link to="/know-your-dept" className={classes.dropdownLink}>
             <ImportContactsIcon className={classes.icons} /> Know Your Dept.
            </Link>
          ]}
        />

      </ListItem>
      <BusModal Modal={busModal} openModal={setBusModal}/>
      <ComplaintsModal Modal={complaintsModal} openModal={setComplaintsModal}/>
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
        
      <CustomDropdown
          noLiPadding
          buttonText="External Links"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={LinkIcon}
          dropdownList={[
            <a href="https://erp.bits-pilani.ac.in/"  className={classes.dropdownLink} >
              ERP PORTAL
            </a>,
            <a
              href="https://td.bits-hyderabad.ac.in/"
              className={classes.dropdownLink}
            >
              Time-Table Division
            </a>,
             <a href="http://libraryopac.bits-hyderabad.ac.in/" className={classes.dropdownLink}>
             Library OPAC
            </a>
          ]}
        />
        
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
