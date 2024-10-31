// import { BsFillPersonLinesFill } from "react-icons/bs";
// import { GoChecklist } from "react-icons/go";
// import { PiPackageBold } from "react-icons/pi";

import { FaBook } from "react-icons/fa";
import { MdAssignmentAdd, MdSwitchAccount } from "react-icons/md";
import { RiAccountCircleFill, RiArticleFill } from "react-icons/ri";

export const DASHBOARD_ADMIN_SIDEBAR_LINKS = [
  {
    key: "Account Page",
    label: "Account Page",
    path: "/admin-dashboard",
    icon: <MdSwitchAccount />,
  },
  {
    key: "Recruitment Page",
    label: "Recruitment Page",
    path: "/admin-dashboard/recruitments-page",
    icon: <MdAssignmentAdd />,
  },
  {
    key: "Transactions",
    label: "Transactions",
    path: "/admin-dashboard/transactions-page",
    icon: <FaBook />,
  },
];

export const DASHBOARD_EMPLOYE_SIDEBAR_LINKS = [
  {
    key: "Availability Page",
    label: "Availability Page",
    path: "/employe-dashboard",
    icon: <RiAccountCircleFill />,
  },
  {
    key: "Employe Transactions Page",
    label: "Transactions",
    path: "/employe-dashboard/employe-transactions-page",
    icon: <RiArticleFill />,
  },
];
