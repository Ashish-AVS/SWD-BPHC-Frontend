/*

=========================================================
* Official Routes
=========================================================

*/
// @material-ui/icons

import LocalPlay from '@material-ui/icons/LocalPlay';

// core components/views for Admin layout

import Search from "views/OfficialComponents/Search/Search";


const dashboardRoutes = [
  
  {
    path: "/search",
    name: "Search",
    icon: LocalPlay,
    component: Search,
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
