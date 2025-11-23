import PanigationComponent from "@/components/admin/PanigationComponent";
import RoomTypeList from "@/components/admin/room-type/RoomTypeList";
import { loaiPhongService } from "@/services/loaiPhongService";
import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import TypeRoomAddModal from "@/components/admin/room-type/TypeRoomAddModal";

let debounceTimer;

const RoomTypeManagement = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loaiPhongs, setLoaiPhongs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [edit, setEdit] = useState(null);

  const [filters, setFilters] = useState({
    tenLoaiPhong: "",
    soKhach: "",
    minGia: "",
    maxGia: "",
    minDienTich: "",
    maxDienTich: "",
  });

  const searchAdvanced = async () => {
    const result = await loaiPhongService.search(filters);
    const mapped = result.map(item => item.loaiPhong || item);
    setLoaiPhongs(mapped);
    setTotalPages(0);
  };

  useEffect(() => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (Object.values(filters).some((v) => v !== "")) {
        searchAdvanced();
      } else {
        fetchLoaiPhong();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters]);

  const fetchLoaiPhong = async () => {
    try {
      const result = await loaiPhongService.findAllPaged(currentPage, 8);
      setLoaiPhongs(result.content);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLoaiPhong();
  }, [currentPage]);

  const handleOnEdit = (roomType) => {
    setEdit(roomType);
    setShowAddModal(true);
  };

  const handleOnShowAddModal = () => {
    setEdit(null);
    setShowAddModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      var result;
      if (edit) {
        result = await loaiPhongService.update(formData);
      } else {
        result = await loaiPhongService.add(formData);
      }

      setShowAddModal(false);
      setEdit(null);
      setLoaiPhongs((prev) =>
        prev.map((item) =>
          item.maLoaiPhong === result.data.maLoaiPhong ? result.data : item
        )
      );
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text)] p-8">
      <div className="hide-scrollbar">
        <h1 className="text-4xl font-bold text-center text-[var(--color-accent)] mb-8">
          Quản Lý Loại Phòng
        </h1>

        <div className="bg-[#2b3a4b] p-5 rounded-xl mb-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-accent)]">
            Bộ lọc & Tìm kiếm
          </h2>

          {/* GRID FILTER */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Tên loại phòng */}
            <div>
              <label className="text-sm text-gray-300">Tên loại phòng</label>
              <input
                type="text"
                value={filters.tenLoaiPhong}
                onChange={(e) =>
                  setFilters({ ...filters, tenLoaiPhong: e.target.value })
                }
                className="mt-1 w-full bg-[#1f2b38] p-2 rounded-lg outline-none text-white"
                placeholder="VD: Deluxe"
              />
            </div>

            {/* Số khách */}
            <div>
              <label className="text-sm text-gray-300">Số khách</label>
              <input
                type="number"
                value={filters.soKhach}
                onChange={(e) =>
                  setFilters({ ...filters, soKhach: e.target.value })
                }
                className="mt-1 w-full bg-[#1f2b38] p-2 rounded-lg outline-none text-white"
                placeholder="Số khách"
              />
            </div>

            {/* Giá Min */}
            <div>
              <label className="text-sm text-gray-300">Giá từ</label>
              <input
                type="number"
                value={filters.minGia}
                onChange={(e) =>
                  setFilters({ ...filters, minGia: e.target.value })
                }
                className="mt-1 w-full bg-[#1f2b38] p-2 rounded-lg outline-none text-white"
                placeholder="Min"
              />
            </div>

            {/* Giá Max */}
            <div>
              <label className="text-sm text-gray-300">Đến giá</label>
              <input
                type="number"
                value={filters.maxGia}
                onChange={(e) =>
                  setFilters({ ...filters, maxGia: e.target.value })
                }
                className="mt-1 w-full bg-[#1f2b38] p-2 rounded-lg outline-none text-white"
                placeholder="Max"
              />
            </div>

            {/* Diện tích Min */}
            <div>
              <label className="text-sm text-gray-300">Diện tích từ (m²)</label>
              <input
                type="number"
                value={filters.minDienTich}
                onChange={(e) =>
                  setFilters({ ...filters, minDienTich: e.target.value })
                }
                className="mt-1 w-full bg-[#1f2b38] p-2 rounded-lg outline-none text-white"
              />
            </div>

            {/* Diện tích Max */}
            <div>
              <label className="text-sm text-gray-300">
                Đến diện tích (m²)
              </label>
              <input
                type="number"
                value={filters.maxDienTich}
                onChange={(e) =>
                  setFilters({ ...filters, maxDienTich: e.target.value })
                }
                className="mt-1 w-full bg-[#1f2b38] p-2 rounded-lg outline-none text-white"
              />
            </div>
          </div>

          {/* BUTTON ACTIONS */}
          <div className="flex justify-end mt-5">
            <button
              onClick={handleOnShowAddModal}
              className="flex items-center bg-[var(--color-primary)] text-[var(--color-background)] px-4 py-2 rounded-lg hover:bg-[var(--color-accent)] transition"
            >
              <Plus size={18} className="mr-2" /> Thêm loại phòng
            </button>
          </div>
        </div>

        <RoomTypeList
          loaiPhongs={loaiPhongs}
          currentPage={currentPage}
          onEdit={handleOnEdit} // <-- SỬA LỖI QUAN TRỌNG
        />
      </div>

      <div className="mt-6">
        <PanigationComponent
          page={currentPage}
          setPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {showAddModal && (
        <TypeRoomAddModal
          onClose={() => {
            setShowAddModal(false);
            setEdit(null);
          }}
          onSubmit={handleSubmit}
          initialData={edit}
        />
      )}
    </div>
  );
};

export default RoomTypeManagement;
