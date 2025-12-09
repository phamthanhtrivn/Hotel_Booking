/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import BookingItem from "@/components/common/BookingItem";
import BookingDetailModal from "@/components/common/BookingDetailModal";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookingHistory = () => {
  const { user, token } = useContext(AuthContext);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState("TAT_CA");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(filteredHistory.length / rowsPerPage);

  const paginatedData = filteredHistory.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const maKhachHang = user.khachHang.maKhachHang;

  const statusOptions = [
    { value: "TAT_CA", label: "Tất cả" },
    { value: "CHUA_THANH_TOAN", label: "Chưa thanh toán" },
    { value: "DA_THANH_TOAN", label: "Đã thanh toán" },
    { value: "DA_HUY", label: "Đã hủy" },
  ];

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_API_URL
          }/api/member/dondatphong/lichsu/${maKhachHang}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        const sortedData = data.sort(
          (a, b) => new Date(b.ngayTao) - new Date(a.ngayTao)
        );
        setBookingHistory(sortedData);
        setFilteredHistory(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingHistory();
  }, []);

  const reloadHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/api/member/dondatphong/lichsu/${maKhachHang}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      const sortedData = data.sort(
        (a, b) => new Date(b.ngayTao) - new Date(a.ngayTao)
      );
      setBookingHistory(sortedData);
      setFilteredHistory(sortedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filterStatus === "TAT_CA") {
      setFilteredHistory(bookingHistory);
    } else {
      setFilteredHistory(
        bookingHistory
          .filter((b) => b.trangThai === filterStatus)
          .sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao))
      );
    }
  }, [filterStatus, bookingHistory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">
        Đang tải lịch sử đặt phòng...
      </div>
    );

  if (error)
    return <div className="text-center py-20 text-red-500">Lỗi: {error}</div>;

  if (bookingHistory.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">
        Bạn chưa có đơn đặt phòng nào.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header + Filter */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Title */}
        <div>
          <h1 className="text-4xl font-semibold text-gray-800 mb-1">
            Lịch sử đặt phòng
          </h1>
          <p className="text-gray-600 text-base">
            Quản lý và xem lại các đơn đặt phòng trước đây của bạn.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <p htmlFor="booking-status" className="text-gray-700 text-base">
            Lọc theo trạng thái:
          </p>
          <div className="relative w-full sm:w-48">
            <select
              id="booking-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 shadow-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 text-sm font-medium text-gray-700 border-b border-gray-300">
        <div className="col-span-12 md:col-span-5">Phòng</div>
        <div className="hidden md:block md:col-span-3">Thời gian</div>
        <div className="hidden md:block md:col-span-2 text-right">
          Trạng thái
        </div>
        <div className="hidden md:block md:col-span-2 text-right">
          Hành động
        </div>
      </div>

      {/* List items */}
      <div className="divide-y divide-gray-200">
        {paginatedData.map((booking) => {
          const loaiPhong = booking.phong?.loaiPhong;

          return (
            <BookingItem
              key={booking.maDatPhong}
              booking={{
                ...booking,
                tenLoaiPhong: loaiPhong?.tenLoaiPhong || "Phòng chưa xác định",
                loaiGiuong: loaiPhong?.moTa?.split(",")[0] || "N/A",
                soKhach: loaiPhong?.soKhach || 1,
                hinhAnh:
                  Array.isArray(loaiPhong?.hinhAnh) &&
                  loaiPhong.hinhAnh.length > 0
                    ? loaiPhong.hinhAnh.map((img) =>
                        img.startsWith("http")
                          ? img
                          : `http://localhost:8080${img}`
                      )
                    : ["/default-room.jpg"],
              }}
              onViewDetail={() => setSelectedBooking(booking)}
              onPay={() =>
                navigate("/payment", {
                  state: { maDatPhong: booking.maDatPhong },
                })
              }
            />
          );
        })}
      </div>

      <div className="flex justify-center items-center mt-8 gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border text-sm transition ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-gray-700 border-gray-400 hover:bg-gray-100"
          }`}
        >
          &lt;
        </button>

        <div className="text-gray-700 font-medium">
          {currentPage} / {totalPages}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg border text-sm transition ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-gray-700 border-gray-400 hover:bg-gray-100"
          }`}
        >
          &gt;
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BookingDetailModal
              booking={selectedBooking}
              onClose={() => setSelectedBooking(null)}
              onReload={reloadHistory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingHistory;
