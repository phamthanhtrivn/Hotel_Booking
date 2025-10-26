import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

<<<<<<< HEAD:src/layouts/UserLayout.jsx
      <main className="flex-1 w-full px-4 mx-auto max-w-8xl">
=======
      <main className="flex-1 w-full mx-auto max-w-8xl">
>>>>>>> 68686a04740a5d2402e7d41b17c17d4649b001e6:frontend/src/layouts/UserLayout.jsx
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

