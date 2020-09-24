import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import OfficialRoutes from "OfficialRoutes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/SidebarBITS-2.jpg";
import logo from "assets/img/bitslogo.png";

let ps;



const useStyles = makeStyles(styles);

export default function Official({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const token=JSON.parse(localStorage.getItem('officialtokens'));
  const data = jwt_decode(token);
  const color="blue";
 
  const allowedRoutes=OfficialRoutes.filter(element=>data.resources.includes(element.id));
  const switchRoutes = (
    <Switch>
      {OfficialRoutes.map((prop, key) => {
        if (prop.layout === "/official") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
      <Redirect from="/official" to={`/official${allowedRoutes[0].path}`} />
    </Switch>
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        layout='official'
        routes={allowedRoutes}
        logoText={data.id}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          layout='official'
          routes={allowedRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />         
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        <Footer />        
      </div>
    </div>
  );
}
