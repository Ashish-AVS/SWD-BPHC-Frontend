/*

=========================================================
* Official Routes
=========================================================

*/
// @material-ui/icons

import SearchIcon from '@material-ui/icons/Search';

// core components/views for Admin layout

import Search from "views/OfficialComponents/Search/Search";

import Mess from "views/OfficialComponents/Mess/MessMenu";


const dashboardRoutes = [
  
  {
    path: "/search",
    name: "Search",
    icon: SearchIcon,
    component: Search,
    layout: "/official"
  },
  {
    path: "/mess",
    name: "Mess",
    icon: SearchIcon,
    component: Mess,
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
