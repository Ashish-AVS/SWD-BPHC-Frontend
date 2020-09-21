/*

=========================================================
* Official Routes
=========================================================

*/
// @material-ui/icons

import SearchIcon from '@material-ui/icons/Search';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';


// core components/views for Admin layout

import Search from "views/OfficialComponents/Search/Search";
import Entry from "views/OfficialComponents/Maingate/MaingateEntry";
import Mess from "views/OfficialComponents/Mess/MessMenu";
import Exit from "views/OfficialComponents/Maingate/MaingateExit";
import Outstation from "views/OfficialComponents/Outstation/Outstation"

const dashboardRoutes = [
  
  {
    path: "/search",
    id:"search",
    name: "Search",
    icon: SearchIcon,
    component: Search,
    layout: "/official"
  },
  {
    path: "/mess",
    id:"messmenu",
    name: "Mess",
    icon: FastfoodIcon,
    component: Mess,
    layout: "/official"
  },
  {
    path: "/maingate/entry",
    id:"maingate",
    name: "Gate Entry",
    icon: FastForwardIcon,
    component: Entry ,
    layout: "/official"
  },
  {
    path: "/maingate/exit",
    id:"maingate",
    name: "Gate Exit",
    icon: FastRewindIcon,
    component: Exit ,
    layout: "/official"
  },
  {
    path: "/outstation",
    id:"outstation",
    name: "Outstation Request",
    icon: AirplanemodeActiveIcon,
    component: Outstation ,
    layout: "/official"
  }

  /*
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  }
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  }
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  }*/
 
];

export default dashboardRoutes;
