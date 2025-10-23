import React, { useState } from "react";
import { roomsDummyData } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PlusCircle } from "lucide-react";


const RoomTypeForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
      initialData || {
        maLoaiPhong: `LP${Date.now()}`,
        tenLoaiPhong: "",
        gia: "",
        loaiGiuong: "",
        soKhach: 2,
        dienTich: "",
        moTa: "",
        hinhAnh: [],
      }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
      // Đây là Modal/Dialog "kiểu cũ"
      <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-gray-900">
          <h2 className="text-2xl font-semibold mb-6">
            {initialData ? "Chỉnh sửa loại phòng" : "Thêm loại phòng mới"}
          </h2>

          {/* Form sử dụng thẻ HTML cơ bản */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên loại phòng
              </label>
              <input
                  type="text"
                  name="tenLoaiPhong"
                  value={formData.tenLoaiPhong}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Giá (VNĐ)
                </label>
                <input
                    type="text"
                    name="gia"
                    value={formData.gia}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số khách
                </label>
                <input
                    type="number"
                    name="soKhach"
                    value={formData.soKhach}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Loại giường
                </label>
                <input
                    type="text"
                    name="loaiGiuong"
                    value={formData.loaiGiuong}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Diện tích (m²)
                </label>
                <input
                    type="text"
                    name="dienTich"
                    value={formData.dienTich}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mô tả
              </label>
              <textarea
                  name="moTa"
                  rows="3"
                  value={formData.moTa}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              ></textarea>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              {/* Vẫn dùng component Button của bạn */}
              <Button type="button" variant="outline" onClick={onCancel}>
                Huỷ
              </Button>
              <Button type="submit">Lưu</Button>
            </div>
          </form>
        </div>
      </div>
  );
};


const RoomTypeManagement = () => {
  const [roomTypes, setRoomTypes] = useState(roomsDummyData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoomType, setCurrentRoomType] = useState(null); // Dùng để chỉnh sửa

  const handleAddNew = () => {
    setCurrentRoomType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (roomType) => {
    setCurrentRoomType(roomType);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá loại phòng này?")) {
      setRoomTypes(roomTypes.filter((rt) => rt.maLoaiPhong !== id));
    }
  };

  const handleSave = (formData) => {
    if (currentRoomType) {
      // Chế độ Edit
      setRoomTypes(
          roomTypes.map((rt) =>
              rt.maLoaiPhong === currentRoomType.maLoaiPhong ? formData : rt
          )
      );
    } else {
      // Chế độ Add New
      setRoomTypes([formData, ...roomTypes]);
    }
    setIsModalOpen(false);
  };

  return (
      // Sử dụng màu nền và class Tailwind cơ bản
      <div className="p-8 bg-gray-100 min-h-screen text-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Quản lý loại phòng
          </h1>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <PlusCircle size={20} />
            Thêm loại phòng
          </Button>
        </div>

        {/* Bảng HTML cơ bản */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên loại phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá (VNĐ)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số khách
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại giường
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {roomTypes.map((roomType) => (
                <tr key={roomType.maLoaiPhong}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {roomType.tenLoaiPhong}
                    </div>
                    <div className="text-sm text-gray-500">
                      {roomType.maLoaiPhong}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{roomType.gia}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {roomType.soKhach}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {roomType.loaiGiuong}
                  </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(roomType)}
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(roomType.maLoaiPhong)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
            <RoomTypeForm
                initialData={currentRoomType}
                onSave={handleSave}
                onCancel={() => setIsModalOpen(false)}
            />
        )}
      </div>
  );
};

export default RoomTypeManagement;