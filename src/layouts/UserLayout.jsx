import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full px-4 mx-auto max-w-8xl">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

