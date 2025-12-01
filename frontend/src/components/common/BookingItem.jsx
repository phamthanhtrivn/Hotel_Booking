/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BedDoubleIcon, UsersIcon } from "lucide-react";
import { motion } from "framer-motion";
import ReviewModel from "./ReviewModel";
import { useState } from "react";

const BookingItem = ({ booking, onViewDetail, onPay }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const statusMap = {
    CHUA_THANH_TOAN: { text: "Chưa thanh toán", color: "text-yellow-600" },
    DA_THANH_TOAN: { text: "Đã thanh toán", color: "text-green-600" },
    DA_HUY: { text: "Đã hủy", color: "text-red-600" },
  };

  const currentStatus = statusMap[booking.trangThai] || {
    text: booking.trangThai,
    color: "text-gray-500",
  };

  return (
    <div className="grid grid-cols-12 items-center gap-4 py-6 px-4 hover:bg-foreground/5 transition-colors duration-200">
      {/* Phòng */}
      <div className="col-span-12 md:col-span-5 flex items-start gap-4">
        <img
          src={booking.hinhAnh[0]}
          alt={booking.tenLoaiPhong}
          className="w-32 h-24 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-medium text-foreground">
            {booking.tenLoaiPhong}
          </h3>

          <div className="text-sm text-foreground/60 flex items-center mt-1">
            <BedDoubleIcon className="w-4 h-4 mr-1" /> {booking.loaiGiuong}
          </div>

          <div className="text-sm text-foreground/60 flex items-center mt-1">
            <UsersIcon className="w-4 h-4 mr-1" /> {booking.soKhach} khách
          </div>
        </div>
      </div>

      {/* Thời gian */}
      <div className="col-span-12 md:col-span-3 text-sm text-foreground/70">
        <p>Check-in: {new Date(booking.checkIn).toLocaleString()}</p>
        <p>Check-out: {new Date(booking.checkOut).toLocaleString()}</p>
      </div>

      {/* Trạng thái */}
      <div className="col-span-12 md:col-span-2 text-right">
        <span className={`font-medium ${currentStatus.color}`}>
          {currentStatus.text}
        </span>
      </div>

      {/* Hành động */}
      <div className="col-span-12 md:col-span-2 flex flex-col items-end gap-3">
        {/* Nút Chi tiết */}
        <button
          onClick={onViewDetail}
          className="min-w-[110px] text-center border border-gray-400 px-4 py-1.5 rounded-full text-sm hover:bg-gray-100 transition cursor-pointer"
        >
          Chi tiết
        </button>

        {/* Nút Thanh toán */}
        {booking.trangThai === "CHUA_THANH_TOAN" && (
          <button
            onClick={onPay}
            className="min-w-[110px] text-center border border-gray-400 px-4 py-1.5 rounded-full text-sm text-yellow-700 hover:bg-yellow-100 transition cursor-pointer"
          >
            Thanh toán
          </button>
        )}

        {new Date(booking.checkOut).getTime() < Date.now() &&
          booking.trangThai !== "DA_HUY" &&
          (booking.danhGia && Object.keys(booking.danhGia).length > 0 ? (
            <button
              onClick={() => setIsReviewOpen(true)}
              className="min-w-[110px] text-center border border-gray-400 px-4 py-1.5 rounded-full text-sm text-white bg-[#1E2A38] hover:bg-[#162029] transition cursor-pointer"
            >
              Đã đánh giá
            </button>
          ) : (
            <button
              onClick={() => setIsReviewOpen(true)}
              className="min-w-[110px] text-center border border-gray-400 px-4 py-1.5 rounded-full text-sm text-white bg-[#1E2A38] hover:bg-[#162029]  transition cursor-pointer"
            >
              Đánh giá
            </button>
          ))}
      </div>

      <ReviewModel
        booking={booking}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
      />
    </div>
  );
};

export default BookingItem;
