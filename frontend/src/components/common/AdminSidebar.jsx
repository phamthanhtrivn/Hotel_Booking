import {
  ChartPie,
  BedDouble,
  Users,
  Calendar,
  MessageSquare,
  Bath,
  Bed,
  BookOpen,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import HotelLogo from "@/assets/hotelLogo/HotelLogo.jpg";

const items = [
  { name: "Dashboard", icon: ChartPie, url: "/admin/dashboard" },
  { name: "Room Type", icon: BookOpen, url: "/admin/room-types" },
  { name: "Room", icon: BedDouble, url: "/admin/rooms" },
  { name: "Customer", icon: Users, url: "/admin/customers" },
  { name: "Booking", icon: Calendar, url: "/admin/bookings" },
  { name: "Review", icon: MessageSquare, url: "/admin/reviews" },
  { name: "Amenities", icon: Bath, url: "/admin/amenities" },
  { name: "Bed Type", icon: Bed, url: "/admin/bed-types" },
];

const AdminSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="px-4 py-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <img 
            src={HotelLogo} 
            alt="Hotel Logo" 
            className="h-12 w-12 rounded-lg object-cover shadow-sm" 
          />
          <div>
            <div className="text-xl font-bold text-slate-800">Twan Hotel</div>
            <div className="text-sm text-slate-500 font-medium">{user.email}</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.url);
                
                return (
                  <SidebarMenuItem key={index} className="mb-1">
                    <Link to={item.url} className="block">
                      <SidebarMenuButton
                        isActive={isActive}
                        className={`transition-all duration-200 cursor-pointer ${
                          isActive 
                            ? 'bg-blue-500 text-white border-r-3 border-[#1E2A38] font-bold text-base' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`${isActive ? 'text-[#1E2A38] ' : 'text-slate-500'}`} />
                        <span className="font-medium">{item.name}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200">
        <Button
          onClick={logout}
          className="w-full cursor-pointer bg-slate-800 hover:bg-slate-900 font-semibold text-white py-2.5 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;