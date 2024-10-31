import React from "react";
import Sidebar from "../../Components/Sidebar";
import { Outlet } from "react-router-dom";

function EmployeDashboard(sidebarLink) {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden relative">
      <Sidebar sidebarLink={sidebarLink} className="absolute" />
      {/* <h1>Employe Dasboard</h1> */}
      <div className="w-full">{<Outlet />}</div>
    </div>
  );
}

export default EmployeDashboard;
