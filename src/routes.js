/*

=========================================================
* Dashboard Routes
=========================================================

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import DirectionsIcon from '@material-ui/icons/Directions';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import DescriptionIcon from '@material-ui/icons/Description';
import GradeIcon from '@material-ui/icons/Grade';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPlay from '@material-ui/icons/LocalPlay';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Connect from "views/Connect/Connect.js";
import Goodies from "views/Goodies/Goodies.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Awards from "views/Awards/Awards.js";
import Deductions from "views/Deductions/Deductions.js";
import Documents from "views/Documents/Documents.js";
import Medclaim from "views/MedClaim/Medclaim.js";
import Scholarship from "views/Scholarship/Scholarship.js";
import Outstation from "views/Outstation/Outstation";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Student Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/connect",
    name: "Connect",
    icon: DirectionsIcon,
    component: Connect,
    layout: "/admin"
  },
  {
    path: "/goodies",
    name: "Funds and Goodies",
    icon: CardGiftcardIcon,
    component: Goodies,
    layout: "/admin"
  },
  {
    path: "/deductions",
    name: "Deductions",
    icon: "content_paste",
    component: Deductions,
    layout: "/admin"
  },
  {
    path: "/documents",
    name: "Documents",
    icon: DescriptionIcon,
    component: Documents,
    layout: "/admin"
  },
  {
    path: "/scholarship",
    name: "Scholarship",
    icon: GradeIcon,
    component: Scholarship,
    layout: "/admin"
  },
  {
    path: "/medical",
    name: "Medical Insurance",
    icon: LocalHospitalIcon,
    component: Medclaim,
    layout: "/admin"
  },
  {
    path: "/award",
    name: "Achievements",
    icon: LocalPlay,
    component: Awards,
    layout: "/admin"
  },
  {
    path: "/outstation",
    name: "Outstation",
    icon:AirplanemodeActiveIcon,
    component: Outstation,
    layout: "/admin"
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
