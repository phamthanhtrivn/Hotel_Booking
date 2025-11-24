import {
  ChartPie,
  BedDouble,
  Users,
  Calendar,
  MessageSquare,
  Bath,
  Bed,
  BookOpen,
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
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <img src={HotelLogo} className="h-15" />
          <div>
            <div className="text-lg font-semibold">Twan Hotel</div>
            <div className="text-xs text-muted-foreground">Management</div>
          </div>
        </div>
      </SidebarHeader>
      <div className="pr-3">
        <SidebarSeparator />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={index}>
                    <Link
                      to={item.url ? item.url : "#"}
                      className="flex items-center space-x-3"
                    >
                      <SidebarMenuButton
                        isActive={location.pathname.startsWith(item.url)}
                      >
                        <Icon className="h-4" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={logout}
          className="w-full cursor-pointer bg-[#1E2A38] hover:bg-[#10171f] font-bold"
        >
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
