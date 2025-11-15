import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export default function RoomTypeList({loaiPhongs, onEdit}) {
  return (
    <div className="rounded-xl shadow-lg bg-[#2b3a4b] overflow-hidden">
      <div className="max-h-[550px] overflow-y-auto  scrollbar-thumb-[var(--color-primary)] hide-scrollbar">
        <table className="w-full text-left">
          <thead className="bg-[var(--color-primary)] text-[var(--color-background)] sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4">Ảnh phòng</th>
              <th className="py-3 px-4">Mã Loại Phòng</th>
              <th className="py-3 px-4">Tên Loại Phòng</th>
              <th className="py-3 px-4">Diện tích</th>
              <th className="py-3 px-4">Số khách</th>
              <th className="py-3 px-4">Giá</th>
              <th className="py-3 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loaiPhongs.length > 0 ? (
              loaiPhongs.map((r) => (
                <tr
                  key={r.maLoaiPhong}
                  className="border-b border-gray-700 hover:bg-[#32465a] transition"
                >
                  <td className="py-3 px-4"><img src={r.hinhAnh[0]} alt="room image" className="w-[80px]"/></td>
                  <td className="py-3 px-4">{r.maLoaiPhong}</td>
                  <td className="py-3 px-4">{r.tenLoaiPhong}</td>
                  <td className="py-3 px-4">{r.dienTich}</td>
                  <td className="py-3 px-4">{r.soKhach}</td>
                  <td className="py-3 px-4">{r.gia}</td>
                  <td className="py-3 px-4 text-center space-x-4">
                    <button
                      className="hover:text-[var(--color-accent)] transition"
                      title="Chỉnh sửa"
                      onClick={()=> onEdit(r)}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="hover:text-red-400 transition"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-[var(--color-muted)]"
                >
                  Không tìm thấy phòng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
    </div>
  );
}
