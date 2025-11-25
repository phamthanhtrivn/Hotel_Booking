import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { phongService } from "@/services/phongService";
import AdminTable from "@/components/common/AdminTable";
import AdminPagination from "@/components/common/AdminPagination";
import ActionButtons from "@/components/common/ActionButtons";
import EditCreateDialog from "@/components/common/EditCreateDialog";
import { loaiPhongService } from "@/services/loaiPhongService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminSelect from "@/components/admin/AdminSelect";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowEditModal, setShowEditModal] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  const [formData, setFormData] = useState({
    maPhong: "",
    maLoaiPhong: "",
    viTri: "",
    trangThai: "",
    tinhTrang: true,
  });

  const [filters, setFilters] = useState({
    maLoaiPhong: "ALL",
    viTri: "ALL",
    trangThai: "ALL",
    tinhTrang: "ALL",
  });

  const resetFormData = () => {
    setFormData({
      maPhong: "",
      maLoaiPhong: "",
      viTri: "",
      trangThai: "",
      tinhTrang: true,
    });
  };

  // Fetch phòng
  const fetchRooms = async () => {
    try {
      const payload = {
        ...filters,
        tinhTrang: filters.tinhTrang === "ALL" ? null : filters.tinhTrang,
        viTri: filters.viTri === "ALL" ? null : filters.viTri,
        maLoaiPhong: filters.maLoaiPhong === "ALL" ? null : filters.maLoaiPhong,
        trangThai: filters.trangThai === "ALL" ? null : filters.trangThai,
      };
      const result = await phongService.search(currentPage, 10, payload);
      setRooms(result.data.content);
      setTotalPages(result.data.totalPages);
    } catch (e) {
      console.log("Lỗi fetch phòng!", e);
    }
  };

  // Fetch loại phòng
  const fetchRoomType = async () => {
    try {
      const result = await loaiPhongService.getForDropdown();
      setRoomTypes([
        { maLoaiPhong: "ALL", tenLoaiPhong: "Tất cả" }, // 👈 thêm dòng này
        ...result.data,
      ]);
    } catch (e) {
      console.log("Lỗi fetch loại phòng!", e);
    }
  };

  // Khi click edit
  const onEdit = (room) => {
    setShowEditModal(true);
    setFormData({
      maPhong: room.maPhong,
      maLoaiPhong: room.maLoaiPhong,
      viTri: room.viTri || "",
      trangThai: room.trangThai,
      tinhTrang: room.tinhTrang,
    });
  };

  const onAdd = () => {
    setIsAdd(true);
    setShowEditModal(true);
  }

  // Submit update
  const handleUpdate = async () => {
    try {
      await phongService.update(formData);
      fetchRooms();
      resetFormData();
      setShowEditModal(false);
    } catch (error) {
      console.log("Lỗi cập nhật phòng!", error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangeFilters = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onClose = () => {
    setShowEditModal(false);
    resetFormData();
  }

  useEffect(() => {
    fetchRooms();
    fetchRoomType();
  }, [currentPage]);

  // Dữ liệu filters
  const floors = [
    { label: "Tất cả", value: "ALL" },
    { label: "Tầng 1", value: "Tầng 1" },
    { label: "Tầng 2", value: "Tầng 2" },
    { label: "Tầng 3", value: "Tầng 3" },
    { label: "Tầng 4", value: "Tầng 4" },
    { label: "Tầng 5", value: "Tầng 5" },
    { label: "Tầng 6", value: "Tầng 6" },
    { label: "Tầng 7", value: "Tầng 7" },
    { label: "Tầng 8", value: "Tầng 8" },
  ];

  const status = [
    { label: "Tất cả", value: "ALL" },
    { label: "Trống", value: "TRONG" },
    { label: "Phục vụ", value: "PHUC_VU" },
    { label: "Bảo trì", value: "BAO_TRI" },
  ];

  const activeStatus = [
    { label: "Tất cả", value: "ALL" },
    { label: "Hoạt động", value: "true" },
    { label: "Dừng hoạt động", value: "false" },
  ];

  const columns = [
    { key: "maPhong", label: "ID" },
    { key: "tenLoaiPhong", label: "Tên loại phòng" },
    { key: "viTri", label: "Vị trí" },
    { key: "trangThai", label: "Trạng thái" },
    {
      key: "tinhTrang",
      label: "Tình trạng",
      render: (i) => (
        <span
          className={
            i.tinhTrang ? "text-green-600 italic" : "text-red-600 italic"
          }
        >
          {i.tinhTrang ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex justify-between">
            <p>Quản lý phòng</p>
            <Button className="rounded-2xl bg-blue-600" onClick={onAdd}>Thêm phòng</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* FILTERS */}
          <div className="mb-4 flex justify-between">
            <div className="flex gap-3">
              {/* Loại phòng */}
              <AdminSelect
                value={filters.maLoaiPhong}
                onChange={(v) => handleChangeFilters("maLoaiPhong", v)}
                label="Loại phòng"
                options={roomTypes}
                labelKey="tenLoaiPhong"
                valueKey="maLoaiPhong"
                className="w-48"
              />

              {/* Vị trí */}
              <AdminSelect
                label="Vị trí"
                value={filters.viTri}
                onChange={(v) => handleChangeFilters("viTri", v)}
                options={floors}
                className="w-40"
              />

              {/* Trạng thái */}
              <AdminSelect
                label="Trạng thái"
                value={filters.trangThai}
                onChange={(v) => handleChangeFilters("trangThai", v)}
                options={status}
                className="w-48"
              />

              {/* Tình trạng hoạt động */}
              <AdminSelect
                label="Active"
                value={filters.tinhTrang}
                onChange={(v) => handleChangeFilters("tinhTrang", v)}
                options={activeStatus}
                className="w-48"
              />
              <Button className="rounded-2xl bg-blue-600" onClick={fetchRooms}>
                Tìm kiếm
              </Button>
            </div>
          </div>

          {/* TABLE */}
          <AdminTable
            columns={columns}
            data={rooms}
            renderActions={(item) => (
              <ActionButtons onEdit={() => onEdit(item)} />
            )}
          />
        </CardContent>

        <AdminPagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onChange={(p) => setCurrentPage(p - 1)}
        />
      </Card>

      {/* Modal Edit */}
      <EditCreateDialog
        open={isShowEditModal}
        title={isAdd ? "Thêm phòng" : "Cập nhật thông tin phòng"}
        onClose={onClose}
        onSubmit={handleUpdate}
      >
        <div className="space-y-4">
          {/* ID */}
          <div>
            <label className="block text-sm font-medium mb-2">Mã phòng</label>
            <Input disabled value={formData.maPhong} />
          </div>

          {/* Loại phòng */}
          <div>
            <label className="block text-sm font-medium mb-2">Loại phòng</label>
            <AdminSelect
              value={formData.maLoaiPhong}
              onChange={(v) => handleChange("maLoaiPhong", v)}
              placeholder="Chọn loại phòng"
              options={roomTypes}
              labelKey="tenLoaiPhong"
              valueKey="maLoaiPhong"
            />
          </div>

          {/* Vị trí */}
          <div>
            <label className="block text-sm font-medium mb-2">Vị trí</label>
            <input
              type="text"
              value={formData.viTri}
              onChange={(e) => handleChange("viTri", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nhập vị trí phòng"
            />
          </div>

          {/* Trạng thái hoạt động */}
          <div>
            <label className="block text-sm font-medium mb-2">Tình trạng</label>
            <AdminSelect
              value={formData.tinhTrang}
              onChange={(v) => handleChange("tinhTrang", v)}
              placeholder="Chọn tình trạng"
              options={activeStatus}
            />
          </div>
        </div>
      </EditCreateDialog>
    </div>
  );
};

export default RoomManagement;
