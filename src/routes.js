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
import SchoolIcon from '@material-ui/icons/School';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPlay from '@material-ui/icons/LocalPlay';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import MenuBookIcon from '@material-ui/icons/MenuBook';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
// import Virtual from "views/VirtualCampus/VirtualCampus";
import Connect from "views/Connect/Connect.js";
import Goodies from "views/Goodies/Goodies.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Counsellor from "views/Counsellor/Counsellor";
import Deductions from "views/Deductions/Deductions.js";
import Documents from "views/Documents/Documents.js";
import Medclaim from "views/MedClaim/Medclaim.js";
import Scholarship from "views/Scholarship/Scholarship.js";
import Outstation from "views/Outstation/Outstation";
import Kya from "views/KYA/KYA.js";
import Cab from "views/Cab/Cab";

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
  // {
  //   path: "/virtual",
  //   name: "Virtual Campus",
  //   icon: ImportantDevicesIcon,
  //   component: Virtual,
  //   layout: "/admin"
  // },
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
    icon: SchoolIcon,
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
    path: "/counsellor",
    name: "Counsellor",
    icon: EmojiPeopleIcon,
    component: Counsellor,
    layout: "/admin"
  },
  {
    path: "/outstation",
    name: "Outstation",
    icon:AirplanemodeActiveIcon,
    component: Outstation,
    layout: "/admin"
  },
  {
    path: "/know-your-acad",
    name: "Know Your Acad.",
    icon: MenuBookIcon,
    component: Kya,
    layout: "/admin"
  } 
];

export default dashboardRoutes;
