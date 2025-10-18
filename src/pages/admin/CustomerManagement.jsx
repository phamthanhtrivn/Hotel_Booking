import React, { useState } from "react";
import { Edit2, Trash2, Search, Eye } from "lucide-react";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Nguyễn Tâm Thành", email: "a@gmail.com", phone: "0909123456" },
    { id: 2, name: "Nguyễn Tâm Thành", email: "b@gmail.com", phone: "0909345678" },
    { id: 3, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 4, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 5, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 6, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 7, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 8, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 9, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 10, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 11, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 12, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 13, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 14, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 15, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 16, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
    { id: 17, name: "Nguyễn Tâm Thành", email: "c@gmail.com", phone: "0909567890" },
  ]);

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const handleDelete = (id) => {
  if (window.confirm("Bạn có chắc muốn xóa khách hàng này?")) {
    setCustomers((prev) => prev.filter((c) => Number(c.id) !== Number(id)));
    setViewing(null);
    setEditing(null);
    }
  };


  const handleSave = () => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === editing.id ? editing : c))
    );
    setEditing(null);
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
        Quản Lý Thông Tin Khách Hàng
      </h1>

      {/* tìm kiếm */}
      <div className="flex items-center bg-[#2b3a4b] p-3 rounded-xl mb-7 shadow-md">
        <Search className="text-[var(--color-muted)] mr-3" />
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng..."
          className="bg-transparent flex-1 outline-none text-[var(--color-text)]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* bảng */}
      <div className="rounded-xl shadow-lg bg-[#2b3a4b] overflow-hidden">
        <div className="max-h-[550px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-primary)] scrollbar-track-[#2b3a4b]">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-primary)] text-[var(--color-background)] sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">STT</th>
                <th className="py-3 px-4">Họ và Tên</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-700 hover:bg-[#32465a] transition"
                  >
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">{c.name}</td>
                    <td className="py-3 px-4">{c.email}</td>
                    <td className="py-3 px-4">{c.phone}</td>
                    <td className="py-3 px-4 text-center space-x-4">
                      <button
                        onClick={() => setViewing(c)}
                        className="hover:text-blue-400 transition"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => setEditing(c)}
                        className="hover:text-[var(--color-accent)] transition"
                        title="Chỉnh sửa"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
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
                    colSpan={5}
                    className="text-center py-6 text-[var(--color-muted)]"
                  >
                    Không tìm thấy khách hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* cập nhật */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2b3a4b] p-8 rounded-2xl w-[550px] shadow-2xl">
            <h2 className="text-3xl font-semibold text-[var(--color-accent)] mb-6 text-center">
              Cập nhật thông tin khách hàng
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
                placeholder="Họ tên"
              />
              <input
                type="email"
                value={editing.email}
                onChange={(e) =>
                  setEditing({ ...editing, email: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
                placeholder="Email"
              />
              <input
                type="text"
                value={editing.phone}
                onChange={(e) =>
                  setEditing({ ...editing, phone: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
                placeholder="Số điện thoại"
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

      {/* xem chi tiết */}
      {viewing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2b3a4b] p-8 rounded-2xl w-[550px] shadow-2xl text-[var(--color-text)]">
            <h2 className="text-3xl font-semibold text-[var(--color-accent)] mb-6 text-center">
              Thông Tin Chi Tiết Khách Hàng
            </h2>
            <div className="space-y-4 text-lg">
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Họ tên:
                </span>{" "}
                {viewing.name}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Email:
                </span>{" "}
                {viewing.email}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Số điện thoại:
                </span>{" "}
                {viewing.phone}
              </p>
            </div>
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
    </div>
  );
};

export default CustomerManagement;
