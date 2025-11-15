import PanigationComponent from "@/components/admin/PanigationComponent";
import RoomTypeList from "@/components/admin/room-type/RoomTypeList";
import { loaiPhongService } from "@/services/loaiPhong";
import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import TypeRoomAddModal from "@/components/admin/room-type/TypeRoomAddModal";

const RoomTypeManagement = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loaiPhongs, setLoaiPhongs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [edit, setEdit] = useState(null); 

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

        <div className="flex items-center justify-between bg-[#2b3a4b] p-3 rounded-xl mb-7 shadow-md">
          <div className="flex items-center flex-1 mr-4">
            <Search className="text-[var(--color-muted)] mr-3" />
            <input
              type="text"
              placeholder="Tìm kiếm phòng..."
              className="bg-transparent flex-1 outline-none text-[var(--color-text)]"
            />
          </div>

          <button
            onClick={handleOnShowAddModal}
            className="flex items-center bg-[var(--color-primary)] text-[var(--color-background)] px-4 py-2 rounded-lg hover:bg-[var(--color-accent)] transition"
          >
            <Plus size={18} className="mr-2" /> Thêm loại phòng
          </button>
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
