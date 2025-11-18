import React from "react";

const RoomTypeFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-64 bg-[#1f2b38] p-4 rounded-xl mr-6 h-fit shadow">
      <h2 className="text-xl font-bold mb-4">Bộ lọc nâng cao</h2>

      {/* Tên loại phòng */}
      <div className="mb-4">
        <label>Tên loại phòng</label>
        <input
          name="tenLoaiPhong"
          value={filters.tenLoaiPhong}
          onChange={handleChange}
          className="w-full bg-[#2b3a4b] p-2 rounded mt-1"
          placeholder="VD: Deluxe"
        />
      </div>

      {/* Số khách */}
      <div className="mb-4">
        <label>Số khách</label>
        <input
          type="number"
          name="soKhach"
          value={filters.soKhach}
          onChange={handleChange}
          className="w-full bg-[#2b3a4b] p-2 rounded mt-1"
          placeholder=">= ?"
        />
      </div>

      {/* Khoảng giá */}
      <div className="mb-4">
        <label>Giá (min – max)</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            name="minGia"
            value={filters.minGia}
            onChange={handleChange}
            className="flex-1 bg-[#2b3a4b] p-2 rounded"
            placeholder="Min"
          />
          <input
            type="number"
            name="maxGia"
            value={filters.maxGia}
            onChange={handleChange}
            className="flex-1 bg-[#2b3a4b] p-2 rounded"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Diện tích */}
      <div className="mb-4">
        <label>Diện tích (m²)</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            name="minDienTich"
            value={filters.minDienTich}
            onChange={handleChange}
            className="flex-1 bg-[#2b3a4b] p-2 rounded"
          />
          <input
            type="number"
            name="maxDienTich"
            value={filters.maxDienTich}
            onChange={handleChange}
            className="flex-1 bg-[#2b3a4b] p-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomTypeFilter;
