import { BedDoubleIcon, MapPinIcon, UsersIcon } from "lucide-react";
import React from "react";

const BookingItem = ({ booking, handlePayment }) => {
  const isPaid = booking.status === "Paid";

  return (
    <div className="grid grid-cols-12 items-center gap-4 py-6 px-4 hover:bg-foreground/5 transition-colors duration-200">
      <div className="col-span-12 md:col-span-5 flex items-start gap-4">
        <img
          src={booking.hinhAnh[0]}
          alt={booking.tenLoaiPhong}
          className="w-32 h-24 object-cover rounded-md"
        />
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-medium text-foreground">
            {booking.tenLoaiPhong}{" "}
          </h3>
          <div className="flex items-center text-sm text-foreground/60 mt-1">
            <BedDoubleIcon className="w-4 h-4 mr-1" />
            <span>{booking.loaiGiuong}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/60 mt-1">
            <UsersIcon className="w-4 h-4 mr-1" />
            <span>Guests: {booking.soKhach}</span>
          </div>
          <p className="text-sm font-medium text-foreground mt-2">
            Total: <span className="font-semibold">${booking.tongTien}</span>
          </p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 grid grid-cols-2 text-sm text-foreground/70 mt-4 md:mt-0">
        <div>
          <p className="font-medium text-foreground/80">Check-In:</p>
          <p className="text-foreground">{booking.checkIn}</p>
        </div>
        <div>
          <p className="font-medium text-foreground/80">Check-Out:</p>
          <p className="text-foreground">{booking.checkOut}</p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 mt-4 md:mt-0 flex flex-col items-start md:items-end">
        <div className="flex items-center mb-2">
          <span
            className={`w-2.5 h-2.5 rounded-full mr-2 ${
              isPaid ? "bg-chart-2/60" : "bg-chart-1/60"
            }`}
          ></span>
          <span
            className={`font-medium ${
              isPaid ? "text-chart-2" : "text-chart-1"
            }`}
          >
            {booking.status}
          </span>
        </div>
        {!isPaid && (
          <button
            onClick={() => handlePayment(booking.maDatPhong)}
            className="border border-foreground/50 px-4 py-1.5 rounded-full text-sm hover:bg-foreground/10 transition-colors"
          >
            Pay now
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingItem;
