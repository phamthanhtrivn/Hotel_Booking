import { useState } from "react";
import AdminHeader from "../components/common/AdminHeader";
import AdminSidebar from "../components/common/AdminSidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
      <SidebarProvider className="flex h-screen">
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader setIsSidebarOpen={setIsSidebarOpen} />

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
  );
}
