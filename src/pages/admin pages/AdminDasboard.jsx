import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function AdminDasboard({ sidebarLink }) {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar sidebarLink={sidebarLink} />
      <div className="w-full">{<Outlet />}</div>
    </div>
  );
}

export default AdminDasboard;
