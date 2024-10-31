import React from "react";
// import { DASHBOARD_ADMIN_SIDEBAR_LINKS } from "../consts/navigationSidebar";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { Button, Divider } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { TbMassage } from "react-icons/tb";

const linkClasses =
  "flex pl-2 items-center gap-1 font-light pr-5 py-2 rounded-lg";

function Sidebar(sidebarLink) {
  const dispatch = useDispatch();
  const logOut = async () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const sidebarLinkChecked = Array.isArray(sidebarLink.sidebarLink)
    ? sidebarLink.sidebarLink
    : sidebarLink.sidebarLink.sidebarLink;

  return (
    <div className="bg-gradient-to-tl from-main-choc to-main-green w-70 min-w-60 p-3 flex flex-col text-white">
      <div className="flex flex-col items-center gap-0 py-5 pt-0 rounded-lg">
        <TbMassage className="h-20 text-white" size={"sm"} />
        <span className="text-white-180 text-5xl font-inter font-bold">
          Urut Aja!
        </span>
      </div>
      <Divider className="bg-white rounded-full w-10 h-1 m-auto" />
      <div className="flex-1 py-8 flex flex-col gap-1">
        {sidebarLinkChecked &&
          sidebarLinkChecked.map((item) => (
            <SidebarLink key={item.key} item={item} />
          ))}
      </div>
      <Button
        className="bg-white font-inter font-bold text-main-green text-medium hover:bg-[#fffcf9] hover:text-[#664f3d]"
        onClick={logOut}
      >
        Logout
      </Button>
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "bg-main-green border-2 rounded-xl  border-solid pl-5 transition duration-1000"
          : "group hover:bg-white",
        linkClasses
      )}
    >
      <span className="text-2xl mr-1 group-hover:text-main-green">
        {item.icon}
      </span>
      <span
        className={classNames(
          pathname === item.path
            ? "text-white font-inter font-bold"
            : "text-white font-inter font-bold group-hover:text-main-green"
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}

export default Sidebar;
