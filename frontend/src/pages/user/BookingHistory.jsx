import { bookingHistorysDummyData } from "@/assets/assets";
import BookingItem from "@/components/common/BookingItem";
import React from "react";

const BookingHistory = () => {
  const bookingHistory = bookingHistorysDummyData;

  const handlePayment = (bookingId) => {}

  return (
    <div className="bg-background max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-foreground/80 mb-2">
          My Bookings
        </h1>
        <p className="text-foreground/70 text-base">
          Easily manage your past, current, and upcoming hotel reservations in one place.
          Plan your trips seamlessly with just a few clicks.
        </p>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 text-sm font-medium text-foreground/80 border-b border-foreground/40">
        <div className="col-span-12 md:col-span-5">Hotels</div>
        <div className="hidden md:block md:col-span-4">Date & Timings</div>
        <div className="hidden md:block md:col-span-3 text-right">Payment</div>
      </div>

      {/* List items */}
      <div className="divide-y divide-foreground/20">
        {bookingHistory.map((booking, index) => (
          <BookingItem key={index} booking={booking} handlePayment={handlePayment} />
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
