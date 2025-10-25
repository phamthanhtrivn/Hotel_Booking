import React, { useState } from "react";
import { Edit2, Trash2, Search, Eye, Plus } from "lucide-react";

const RoomManagement = () => {
  const [roomTypes] = useState([
    {
      maLoaiPhong: "LP01",
      tenLoaiPhong: "Deluxe",
      moTa: "Phòng sang trọng với view hồ bơi.",
      soKhachToiDa: 3,
      dienTich: "35m²",
      tienNghi: "Wi-Fi, TV, Mini Bar, Bồn tắm",
      giaCoBan: "1,200,000 VNĐ/đêm",
      cauHinhGiuong: "1 Giường King",
      hinhAnh: "https://postimg.cc/67jHrSCg",
    },
    {
      maLoaiPhong: "LP02",
      tenLoaiPhong: "Suite",
      moTa: "Phòng cao cấp có phòng khách riêng.",
      soKhachToiDa: 4,
      dienTich: "50m²",
      tienNghi: "Wi-Fi, TV 55inch, Bếp mini, View thành phố",
      giaCoBan: "2,000,000 VNĐ/đêm",
      cauHinhGiuong: "2 Giường Queen",
      hinhAnh: "https://postimg.cc/67jHrSCg",
    },
    {
      maLoaiPhong: "LP03",
      tenLoaiPhong: "Standard",
      moTa: "Phòng tiêu chuẩn đầy đủ tiện nghi cơ bản.",
      soKhachToiDa: 2,
      dienTich: "25m²",
      tienNghi: "Wi-Fi, TV, Máy lạnh",
      giaCoBan: "800,000 VNĐ/đêm",
      cauHinhGiuong: "1 Giường Queen",
      hinhAnh: "https://postimg.cc/67jHrSCg",
    },
  ]);

  const [rooms, setRooms] = useState([
    {
      id: 1,
      maPhong: "P101",
      maLoaiPhong: "LP01",
      loaiPhong: { tenLoaiPhong: "Deluxe" },
      trangThai: "Trống",
      viTri: "Tầng 1",
    },
    {
      id: 2,
      maPhong: "P202",
      maLoaiPhong: "LP02",
      loaiPhong: { tenLoaiPhong: "Suite" },
      trangThai: "Đang phục vụ",
      viTri: "Tầng 2",
    },
    {
      id: 3,
      maPhong: "P303",
      maLoaiPhong: "LP03",
      loaiPhong: { tenLoaiPhong: "Standard" },
      trangThai: "Đang bảo trì",
      viTri: "Tầng 3",
    },
  ]);

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [adding, setAdding] = useState(false);

  const filtered = rooms.filter(
    (r) =>
      r.maPhong.toLowerCase().includes(search.toLowerCase()) ||
      r.loaiPhong.tenLoaiPhong.toLowerCase().includes(search.toLowerCase()) ||
      r.trangThai.toLowerCase().includes(search.toLowerCase()) ||
      r.viTri.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng này?")) {
      setRooms((prev) => prev.filter((r) => Number(r.id) !== Number(id)));
      setViewing(null);
      setEditing(null);
    }
  };

  const handleSave = () => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === editing.id
          ? {
              ...editing,
              loaiPhong: {
                tenLoaiPhong: roomTypes.find(
                  (lp) => lp.maLoaiPhong === editing.maLoaiPhong
                )?.tenLoaiPhong,
              },
            }
          : r
      )
    );
    setEditing(null);
  };

  const handleAdd = () => {
    const loaiPhongChon = roomTypes.find(
      (lp) => lp.maLoaiPhong === adding.maLoaiPhong
    );
    const newRoom = {
      id: Date.now(),
      maPhong: adding.maPhong,
      maLoaiPhong: adding.maLoaiPhong,
      loaiPhong: { tenLoaiPhong: loaiPhongChon?.tenLoaiPhong || "" },
      trangThai: adding.trangThai,
      viTri: adding.viTri,
    };
    setRooms((prev) => [...prev, newRoom]);
    setAdding(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] p-8">
      <style>{`
        :root {
          --color-primary: #CBA75E;
          --color-background: #1E2A38;
          --color-text: #FFFFFF;
          --color-muted: #B5B5B5;
          --color-accent: #E5C97B;
        }
        ::placeholder { color: var(--color-muted); }
      `}</style>

      <h1 className="text-4xl font-bold text-center text-[var(--color-accent)] mb-8">
        Quản Lý Phòng
      </h1>

      
      <div className="flex items-center justify-between bg-[#2b3a4b] p-3 rounded-xl mb-7 shadow-md">
        <div className="flex items-center flex-1 mr-4">
          <Search className="text-[var(--color-muted)] mr-3" />
          <input
            type="text"
            placeholder="Tìm kiếm phòng..."
            className="bg-transparent flex-1 outline-none text-[var(--color-text)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() =>
            setAdding({
              maPhong: "",
              maLoaiPhong: "",
              trangThai: "",
              viTri: "",
            })
          }
          className="flex items-center bg-[var(--color-primary)] text-[var(--color-background)] px-4 py-2 rounded-lg hover:bg-[var(--color-accent)] transition"
        >
          <Plus size={18} className="mr-2" /> Thêm Phòng
        </button>
      </div>

  
      <div className="rounded-xl shadow-lg bg-[#2b3a4b] overflow-hidden">
        <div className="max-h-[550px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-primary)] scrollbar-track-[#2b3a4b]">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-primary)] text-[var(--color-background)] sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">STT</th>
                <th className="py-3 px-4">Mã Phòng</th>
                <th className="py-3 px-4">Loại Phòng</th>
                <th className="py-3 px-4">Trạng Thái</th>
                <th className="py-3 px-4">Vị Trí</th>
                <th className="py-3 px-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((r, i) => (
                  <tr
                    key={r.id}
                    className="border-b border-gray-700 hover:bg-[#32465a] transition"
                  >
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">{r.maPhong}</td>
                    <td className="py-3 px-4">{r.loaiPhong.tenLoaiPhong}</td>
                    <td className="py-3 px-4">{r.trangThai}</td>
                    <td className="py-3 px-4">{r.viTri}</td>
                    <td className="py-3 px-4 text-center space-x-4">
                      <button
                        onClick={() => setViewing(r)}
                        className="hover:text-blue-400 transition"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() =>
                          setEditing({
                            ...r,
                            loaiPhong: r.loaiPhong.tenLoaiPhong,
                          })
                        }
                        className="hover:text-[var(--color-accent)] transition"
                        title="Chỉnh sửa"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
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

      
      {adding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2b3a4b] p-8 rounded-2xl w-[550px] shadow-2xl">
            <h2 className="text-3xl font-semibold text-[var(--color-accent)] mb-6 text-center">
              Thêm Phòng Mới
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Mã phòng"
                value={adding.maPhong}
                onChange={(e) => setAdding({ ...adding, maPhong: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
              />

              <select
                value={adding.maLoaiPhong}
                onChange={(e) => setAdding({ ...adding, maLoaiPhong: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
              >
                <option value="">-- Chọn loại phòng --</option>
                {roomTypes.map((lp) => (
                  <option key={lp.maLoaiPhong} value={lp.maLoaiPhong}>
                    {lp.tenLoaiPhong}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Trạng thái (Trống / Đang phục vụ / Đang bảo trì)"
                value={adding.trangThai}
                onChange={(e) => setAdding({ ...adding, trangThai: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
              />
              <input
                type="text"
                placeholder="Vị trí"
                value={adding.viTri}
                onChange={(e) => setAdding({ ...adding, viTri: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setAdding(false)}
                className="px-5 py-2 bg-gray-500 rounded hover:bg-gray-600 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleAdd}
                className="px-5 py-2 bg-[var(--color-primary)] text-[var(--color-background)] rounded hover:bg-[var(--color-accent)] transition"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      
      {viewing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2b3a4b] p-8 rounded-2xl w-[650px] shadow-2xl text-[var(--color-text)]">
            <h2 className="text-3xl font-semibold text-[var(--color-accent)] mb-6 text-center">
              Thông Tin Chi Tiết Phòng
            </h2>
            {(() => {
              const lp = roomTypes.find(
                (type) => type.maLoaiPhong === viewing.maLoaiPhong
              );
              return (
                <div className="space-y-3 text-lg">
                  <p>
                    <span className="font-semibold text-[var(--color-accent)]">
                      Mã phòng:
                    </span>{" "}
                    {viewing.maPhong}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--color-accent)]">
                      Loại phòng:
                    </span>{" "}
                    {lp?.tenLoaiPhong}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--color-accent)]">
                      Mô tả:
                    </span>{" "}
                    {lp?.moTa}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--color-accent)]">
                      Số khách tối đa:
                    </span>{" "}
                    {lp?.soKhachToiDa}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--color-accent)]">
                      Diện tích:
                    </span>{" "}
                    {lp?.dienTich}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--color-accent)]">
                      Tiện nghi:
                    </span>{" "}
                    {lp?.tienNghi}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--color-accent)]">
                      Cấu hình giường:
                    </span>{" "}
                    {lp?.cauHinhGiuong}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--color-accent)]">
                      Giá cơ bản:
                    </span>{" "}
                    {lp?.giaCoBan}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--color-accent)]">
                      Trạng thái:
                    </span>{" "}
                    {viewing.trangThai}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--color-accent)]">
                      Vị trí:
                    </span>{" "}
                    {viewing.viTri}
                  </p>
                  {lp?.hinhAnh && (
                    <img
                      src={lp.hinhAnh}
                      alt={lp.tenLoaiPhong}
                      className="w-full h-52 object-cover rounded-lg mt-3"
                    />
                  )}
                </div>
              );
            })()}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setViewing(null)}
                className="px-5 py-2 bg-[var(--color-primary)] text-[var(--color-background)] rounded hover:bg-[var(--color-accent)] transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

     
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2b3a4b] p-8 rounded-2xl w-[550px] shadow-2xl">
            <h2 className="text-3xl font-semibold text-[var(--color-accent)] mb-6 text-center">
              Cập nhật thông tin phòng
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editing.maPhong}
                onChange={(e) => setEditing({ ...editing, maPhong: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
              />
              <select
                value={editing.maLoaiPhong}
                onChange={(e) => setEditing({ ...editing, maLoaiPhong: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
              >
                <option value="">-- Chọn loại phòng --</option>
                {roomTypes.map((lp) => (
                  <option key={lp.maLoaiPhong} value={lp.maLoaiPhong}>
                    {lp.tenLoaiPhong}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={editing.trangThai}
                onChange={(e) => setEditing({ ...editing, trangThai: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
              />
              <input
                type="text"
                value={editing.viTri}
                onChange={(e) => setEditing({ ...editing, viTri: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2 bg-gray-500 rounded hover:bg-gray-600 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[var(--color-primary)] text-[var(--color-background)] rounded hover:bg-[var(--color-accent)] transition"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
