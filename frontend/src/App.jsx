import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/Login";
import UserLayout from "./layouts/UserLayout";
import Register from "./pages/user/Register";
import ForgotPassword from "./pages/user/ForgotPassword";
import RoomTypes from "./pages/user/RoomTypes";
import RoomTypeDetail from "./pages/user/RoomTypeDetail";
import Booking from "./pages/user/Booking";
import AboutUs from "./pages/user/AboutUs";
import BookingHistory from "./pages/user/BookingHistory";
import AccountInfo from "./pages/user/AccountInfo";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Payment from "./pages/user/Payment";
import Facilities from "./pages/user/Facilities";
import AdminLayout from "./layouts/AdminLayout";
import DashBoard from "./pages/admin/DashBoard";
import RoomManagement from "./pages/admin/RoomManagement";
import RoomTypeManagement from "./pages/admin/RoomTypeManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import ReviewManagement from "./pages/admin/ReviewManagement";
import NotFound from "./pages/NotFound";
import Contact from "./pages/user/Contact";
import ResetPassword from "./pages/user/ResetPassword";
import OAuth2Success from "./pages/user/OAuth2Success";
import OAuth2Error from "./pages/user/OAuth2Error";

function App() {
  return (
    <Routes>
      {/* GUEST */}
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <UserLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="room-types" element={<RoomTypes />} />
        <Route path="room-types/:id" element={<RoomTypeDetail />} />
        <Route path="booking" element={<Booking />} />
        <Route path="payment" element={<Payment />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/oauth2/success" element={<OAuth2Success />} />
        <Route path="/oauth2/error" element={<OAuth2Error />} />
      </Route>

      {/* MEMBER */}
      <Route
        path="/account"
        element={
          <ProtectedRoutes allowedRoles={["MEMBER"]}>
            <UserLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<AccountInfo />} />
        <Route path="booking-history" element={<BookingHistory />} />
      </Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoutes allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoutes>
        }
      >
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="rooms" element={<RoomManagement />} />
        <Route path="room-types" element={<RoomTypeManagement />} />
        <Route path="customers" element={<CustomerManagement />} />
        <Route path="bookings" element={<BookingManagement />} />
        <Route path="reviews" element={<ReviewManagement />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
