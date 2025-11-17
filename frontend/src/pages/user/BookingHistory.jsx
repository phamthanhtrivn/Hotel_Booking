/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import BookingItem from "@/components/common/BookingItem";
import BookingDetailModal from "@/components/common/BookingDetailModal";
import { motion, AnimatePresence } from "framer-motion";

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState("TAT_CA");

  const maKhachHang = "KH1"; // Giả sử mã khách hàng

  const statusOptions = [
    { value: "TAT_CA", label: "Tất cả" },
    { value: "CHUA_THANH_TOAN", label: "Chưa thanh toán" },
    { value: "DA_THANH_TOAN", label: "Đã thanh toán" },
    { value: "DA_HUY", label: "Đã hủy" },
  ];

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/dondatphong/lichsu/${maKhachHang}`
        );
        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu đặt phòng");
        }
        const data = await response.json();
        setBookingHistory(data);
        setFilteredHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingHistory();
  }, []);

  useEffect(() => {
    if (filterStatus === "TAT_CA") {
      setFilteredHistory(bookingHistory);
    } else {
      setFilteredHistory(
        bookingHistory.filter((b) => b.trangThai === filterStatus)
      );
    }
  }, [filterStatus, bookingHistory]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">
        Đang tải lịch sử đặt phòng...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500">Lỗi: {error}</div>
    );

  if (bookingHistory.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">
        Bạn chưa có đơn đặt phòng nào.
      </div>
    );

  return (
    <div className="bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <p
            htmlFor="booking-status"
            className="text-gray-700 text-base"
          >
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
        <div className="hidden md:block md:col-span-2 text-right">Trạng thái</div>
        <div className="hidden md:block md:col-span-2 text-right">Hành động</div>
      </div>

      {/* List items */}
      <div className="divide-y divide-gray-200">
        {filteredHistory.map((booking) => {
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
                  Array.isArray(loaiPhong?.hinhAnh) && loaiPhong.hinhAnh.length > 0
                    ? loaiPhong.hinhAnh.map((img) =>
                        img.startsWith("http") ? img : `http://localhost:8080${img}`
                      )
                    : ["/default-room.jpg"],
              }}
              onViewDetail={() => setSelectedBooking(booking)}
            />
          );
        })}
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingHistory;