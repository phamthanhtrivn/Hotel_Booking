import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ChatWidget from "@/components/common/ChatWidget";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ChatWidget />
      <Header />

      <main className="flex-1 w-full mx-auto max-w-8xl">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
