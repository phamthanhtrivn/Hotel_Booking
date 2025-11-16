import React from "react";
import { BedDoubleIcon, UsersIcon } from "lucide-react";

const BookingItem = ({ booking, onViewDetail }) => {

  const statusMap = {
    CHUA_THANH_TOAN: { text: "Chưa thanh toán", color: "text-yellow-600" },
    DA_THANH_TOAN: { text: "Đã thanh toán", color: "text-green-600" },
    DA_HUY: { text: "Đã hủy", color: "text-red-600" },
  };

  const currentStatus =
    statusMap[booking.trangThai] || { text: booking.trangThai, color: "text-gray-500" };

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
          <h3 className="text-lg font-medium text-foreground">{booking.tenLoaiPhong}</h3>

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
      <div className="col-span-12 md:col-span-2 text-right">
        <button
          onClick={onViewDetail}
          className="border border-foreground/50 px-3 py-1.5 rounded-full text-sm hover:bg-foreground/10 transition"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default BookingItem;

