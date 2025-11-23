import React from "react";

export default function SearchBar({
  filters,
  handleChange,
  handleSearch,
  roomTypeOptions,
}) {
  return (
    <div className="w-full bg-background border-[1px] border-[var(--border)] rounded-xl p-3 flex flex-col md:flex-row gap-4 items-center">
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium text-muted-foreground">
          Check-in
        </label>
        <input
          type="date"
          name="checkIn"
          value={filters.checkIn}
          onChange={handleChange}
          className="mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chart-2"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium text-muted-foreground">
          Check-out
        </label>
        <input
          type="date"
          name="checkOut"
          value={filters.checkOut}
          onChange={handleChange}
          className="mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chart-2"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium text-muted-foreground">
          Số khách
        </label>
        <input
          type="number"
          min="1"
          value={filters.guests}
          name="guests"
          onChange={handleChange}
          className="mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chart-2"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium text-muted-foreground">
          Loại phòng / giường
        </label>
        <select
          name="roomType"
          value={filters.roomType}
          onChange={handleChange}
          className="mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-chart-2"
        >
          <option value="">Chọn loại phòng</option>
          {roomTypeOptions.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full">
        <div className="h-4"></div>
        <button
          onClick={() => handleSearch(filters)}
          className="w-full h-[48px] p-5 flex items-center justify-center bg-chart-2 text-background text-sm rounded-2xl hover:bg-chart-2/90 transition"
        >
          Tìm phòng
        </button>
      </div>
    </div>
  );
}
