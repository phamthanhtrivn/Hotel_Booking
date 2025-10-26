import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const navigation = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { to: "/", label: "TRANG CHỦ" },
    { to: "/about", label: "GIỚI THIỆU" },
    { to: "/room-types", label: "ĐẶT PHÒNG" },
    { to: "/facilities", label: "CƠ SỞ VẬT CHẤT" },
    { to: "/contact", label: "LIÊN HỆ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold font-serif tracking-tight text-[#1E2A38] hover:text-[#2a4b70]">
              TWAN HOTEL
            </span>
          </div>
        </Link>

        <div className="items-center hidden space-x-8 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground group"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center">
          <Button
            onClick={() => navigation("/login")}
            className="hidden text-white bg-[#1E2A38] lg:inline-flex hover:bg-[#2a4b70] font-medium cursor-pointer transition-all duration-300"
          >
            Đăng Nhập
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button className="cursor-pointer bg-[#1E2A38] hover:bg-[#2a4b70]">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] sm:w-[320px] p-6 flex flex-col justify-between rounded-l-2xl shadow-2xl border-l border-[#CBA75E]/30 animate-slide-in"
            >
              <SheetTitle className="sr-only">Menu của TWAN HOTEL</SheetTitle>
              <SheetDescription className="sr-only">
                Đây là menu điều hướng chính của website TWAN HOTEL.
              </SheetDescription>
              <div className="mb-8 text-center">
                <span className="text-lg font-bold tracking-wide text-[#1E2A38] font-serif">
                  TWAN HOTEL
                </span>
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col space-y-6 text-center">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="relative text-lg font-medium tracking-wide text-[#1E2A38] transition-all group"
                  >
                    {item.label}
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#1E2A38] transition-all duration-500 ease-out group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>

              {/* Button Login */}
              <div className="mt-12">
                <Button
                  onClick={() => {
                    navigation("/login");
                    setMobileOpen(false);
                  }}
                  className="w-full py-5 text-[#FFF] bg-[#1E2A38] hover:bg-[#2a4b70] font-medium tracking-wide transition-all duration-300 cursor-pointer"
                >
                  Đăng Nhập
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
