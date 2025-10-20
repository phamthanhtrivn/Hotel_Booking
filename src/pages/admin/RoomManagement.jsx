import React, { useState } from "react";
import { roomsDummyData } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PlusCircle } from "lucide-react";


const initialRooms = [
  { id: "R101", roomNumber: "101", roomTypeId: "LP001", status: "Available" },
  { id: "R102", roomNumber: "102", roomTypeId: "LP001", status: "Occupied" },
  { id: "R103", roomNumber: "103", roomTypeId: "LP002", status: "Cleaning" },
  { id: "R201", roomNumber: "201", roomTypeId: "LP003", status: "Available" },
  { id: "R202", roomNumber: "202", roomTypeId: "LP004", status: "Out of Order" },
];


const roomTypeMap = roomsDummyData.reduce((acc, rt) => {
  acc[rt.maLoaiPhong] = rt.tenLoaiPhong;
  return acc;
}, {});

const roomStatuses = ["Available", "Occupied", "Cleaning", "Out of Order"];


const RoomForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
      initialData || {
        id: `R${Date.now()}`,
        roomNumber: "",
        roomTypeId: roomsDummyData[0]?.maLoaiPhong || "", // Mặc định
        status: "Available",
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
      <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-gray-900">
          <h2 className="text-2xl font-semibold mb-6">
            {initialData ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số phòng
              </label>
              <input
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loại phòng
              </label>
              <select
                  name="roomTypeId"
                  value={formData.roomTypeId}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              >
                {roomsDummyData.map((rt) => (
                    <option key={rt.maLoaiPhong} value={rt.maLoaiPhong}>
                      {rt.tenLoaiPhong}
                    </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Trạng thái
              </label>
              <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              >
                {roomStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-4 pt-4">
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

// Component chính
const RoomManagement = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleAddNew = () => {
    setCurrentRoom(null);
    setIsModalOpen(true);
  };

  const handleEdit = (room) => {
    setCurrentRoom(room);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá phòng này?")) {
      setRooms(rooms.filter((r) => r.id !== id));
    }
  };

  const handleSave = (formData) => {
    if (currentRoom) {
      // Chế độ Edit
      setRooms(rooms.map((r) => (r.id === currentRoom.id ? formData : r)));
    } else {
      // Chế độ Add New
      setRooms([formData, ...rooms]);
    }
    setIsModalOpen(false);
  };

  // Helper để lấy màu trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Occupied":
        return "bg-yellow-100 text-yellow-800";
      case "Cleaning":
        return "bg-blue-100 text-blue-800";
      case "Out of Order":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
      <div className="p-8 bg-gray-100 min-h-screen text-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý phòng</h1>
          <Button
              onClick={handleAddNew}
              className="flex items-center gap-2"
          >
            <PlusCircle size={20} />
            Thêm phòng
          </Button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Phòng {room.roomNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {roomTypeMap[room.roomTypeId] || "Không rõ"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          room.status
                      )}`}
                  >
                    {room.status}
                  </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(room)}
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(room.id)}
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
            <RoomForm
                initialData={currentRoom}
                onSave={handleSave}
                onCancel={() => setIsModalOpen(false)}
            />
        )}
      </div>
  );
};

export default RoomManagement;