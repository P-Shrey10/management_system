import React from "react";
import Sidebar from "./components/supporter/Sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
