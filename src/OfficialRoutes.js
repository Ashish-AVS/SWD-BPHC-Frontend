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
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BookIcon from '@material-ui/icons/Book';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import EventNoteIcon from '@material-ui/icons/EventNote';
import BlockIcon from '@material-ui/icons/Block';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DescriptionIcon from '@material-ui/icons/Description';

// core components/views for Official layout

import Search from "views/OfficialComponents/Search/Search";
import Entry from "views/OfficialComponents/Maingate/MaingateEntry";
import MessMenu from "views/OfficialComponents/Mess/MessMenu";
import MessGrace from "views/OfficialComponents/Mess/MessGrace";
import Exit from "views/OfficialComponents/Maingate/MaingateExit";
import Outstation from "views/OfficialComponents/Outstation/Outstation";
import Mcn from 'views/OfficialComponents/Mcn/Mcn';
import GoodieExport from "views/OfficialComponents/GoodiesExport/GoodiesExport";
import Counsellor from "views/OfficialComponents/Counsellor/Counsellor";
import Blacklist from "views/OfficialComponents/Blacklist/Blacklist";
import Blocklist from "views/OfficialComponents/Blocklist/Blocklist";
import DocGen from "views/OfficialComponents/DocGen/DocGen"
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
    path: "/mess/menu",
    id:"messmenu",
    name: "Mess Menu",
    icon: FastfoodIcon,
    component: MessMenu,
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
  },
  {
    path: "/mcn",
    id:"mcn",
    name: "MCN Portal",
    icon: AccountBalanceWalletIcon,
    component: Mcn ,
    layout: "/official"
  },
  {
    path: "/mess/grace",
    id:"messgrace",
    name: "Mess Graces",
    icon: BookIcon,
    component: MessGrace,
    layout: "/official"
  },
  {
    path: "/goodies",
    id:"goodies",
    name: "Goodies Data",
    icon: CardTravelIcon,
    component: GoodieExport,
    layout: "/official"
  },
  {
    path: "/counsellor",
    id:"counselor",
    name: "Counsellor",
    icon: EventNoteIcon,
    component: Counsellor,
    layout: "/official"
  },
  {
    path: "/blacklist",
    id:"blacklist",
    name: "Blacklist Action ",
    icon: ErrorOutlineIcon,
    component: Blacklist,
    layout: "/official"
  },
  {
    path: "/blocklist",
    id:"blocklist",
    name: "Blocklist Action ",
    icon: BlockIcon,
    component: Blocklist,
    layout: "/official"
  },
  {
    path: "/docgen",
    id:"doc",
    name: "Document Generation ",
    icon: DescriptionIcon,
    component: DocGen,
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
