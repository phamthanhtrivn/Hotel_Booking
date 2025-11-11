import {
  ChartPie,
  BedDouble,
  Users,
  Calendar,
  MessageSquare,
  History,
  BookOpen,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HotelLogo from "@/assets/hotelLogo/HotelLogo.jpg";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { name: "Dashboard", icon: ChartPie, url: "/admin/dashboard" },
  { name: "Room Type", icon: BookOpen, url: "/admin/room-types" },
  { name: "Room", icon: BedDouble, url: "/admin/rooms" },
  { name: "Customer", icon: Users, url: "/admin/customers" },
  { name: "Booking", icon: Calendar, url: "/admin/bookings" },
  { name: "Review", icon: MessageSquare, url: "/admin/reviews" },
];

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
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
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem>
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
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center w-full gap-3 p-2 rounded-md hover:bg-accent">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium leading-none">tuan222</div>
                <div className="text-xs text-muted-foreground">
                  m@example.com
                </div>
              </div>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="w-4 h-4 mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
