<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Search, Eye } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";



const CustomerManagement = () => {
  const baseURL = import.meta.env.VITE_BASE_API_URL + "/api/";
  const [customers, setCustomers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  const { error, get, put } = useFetch(baseURL);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await get("taikhoan");
      if (data) setCustomers(data);
    };
    fetchCustomers();
  }, []);

  // Lọc khách hàng theo từng tiêu chí
  const filtered = customers.filter((c) => {
    const nameMatch = c.khachHang?.hoTenKH
      ?.toLowerCase()
      .includes(searchName.toLowerCase());
    const phoneMatch = c.khachHang?.soDienThoai
      ?.toLowerCase()
      .includes(searchPhone.toLowerCase());
    const emailMatch = c.email
      ?.toLowerCase()
      .includes(searchEmail.toLowerCase());
    return nameMatch && phoneMatch && emailMatch;
  });

  const handleDelete = async (maTaiKhoan) => {
    if (window.confirm("Bạn có chắc muốn xóa khách hàng này?")) {
      try {
        const response = await fetch(`${baseURL}taikhoan/${maTaiKhoan}`, {
          method: "DELETE",
        });
        const message = await response.text();
        if (!response.ok) {
          toast.error(message || "Không thể xóa tài khoản!");
          return;
        }
        toast.success(message || "Xóa tài khoản thành công!");
        setCustomers((prev) => prev.filter((c) => c.maTaiKhoan !== maTaiKhoan));
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        toast.error("Lỗi kết nối máy chủ!");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!editing || !editing.khachHang) {
        toast.error("Không có dữ liệu để cập nhật!");
        return;
      }
      const updatedCustomer = {
        maKhachHang: editing.khachHang.maKhachHang,
        hoTenKH: editing.khachHang.hoTenKH,
        soDienThoai: editing.khachHang.soDienThoai,
        diemTichLuy: editing.khachHang.diemTichLuy,
      };

      const response = await put(
        `khachhang/${updatedCustomer.maKhachHang}`,
        updatedCustomer
      );
      if (error || !response) {
        toast.error("Cập nhật thất bại!");
        return;
      }
      setCustomers((prev) =>
        prev.map((c) =>
          c.khachHang?.maKhachHang === updatedCustomer.maKhachHang
            ? { ...c, khachHang: updatedCustomer }
            : c
        )
      );

      toast.success("Lưu thành công!");
      setEditing(null);
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
      toast.error("Lưu thất bại do lỗi hệ thống!");
    }
  };

=======
import React from 'react'

const CustomerManagement = () => {
>>>>>>> Tung
  return (
    <div>CustomerManagement</div>
  )
}

<<<<<<< HEAD
      <h1 className="text-4xl font-bold text-center text-[var(--color-accent)] mb-8">
        Quản Lý Thông Tin Khách Hàng
      </h1>

      {/* 🔍 Thanh tìm kiếm ngang */}
      <div className="flex flex-wrap gap-4 bg-[#2b3a4b] p-4 rounded-xl mb-7 shadow-md justify-between">
        {/* Tìm theo tên */}
        <div className="flex items-center bg-[#1E2A38] p-2 rounded-lg flex-1 min-w-[250px]">
          <Search className="text-[var(--color-muted)] mr-2" />
          <input
            type="text"
            placeholder="Tìm theo tên..."
            className="bg-transparent flex-1 outline-none text-[var(--color-text)]"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        {/* Tìm theo số điện thoại */}
        <div className="flex items-center bg-[#1E2A38] p-2 rounded-lg flex-1 min-w-[250px]">
          <Search className="text-[var(--color-muted)] mr-2" />
          <input
            type="text"
            placeholder="Tìm theo số điện thoại..."
            className="bg-transparent flex-1 outline-none text-[var(--color-text)]"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
        </div>

        {/* Tìm theo email */}
        <div className="flex items-center bg-[#1E2A38] p-2 rounded-lg flex-1 min-w-[250px]">
          <Search className="text-[var(--color-muted)] mr-2" />
          <input
            type="text"
            placeholder="Tìm theo email..."
            className="bg-transparent flex-1 outline-none text-[var(--color-text)]"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
      </div>

      {/* 🧾 Bảng dữ liệu */}
      <div className="rounded-xl shadow-lg bg-[#2b3a4b] overflow-hidden">
        <div className="max-h-[550px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-primary)] scrollbar-track-[#2b3a4b]">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-primary)] text-[var(--color-background)] sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">STT</th>
                <th className="py-3 px-4">Họ và Tên</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4">Điểm tích lũy</th>
                <th className="py-3 px-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((c, i) => (
                  <tr
                    key={c.khachHang?.maKhachHang || c.maTaiKhoan || i}
                    className="border-b border-gray-700 hover:bg-[#32465a] transition"
                  >
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">{c.khachHang?.hoTenKH || "—"}</td>
                    <td className="py-3 px-4">{c.email}</td>
                    <td className="py-3 px-4">
                      {c.khachHang?.soDienThoai || "—"}
                    </td>
                    <td className="py-3 px-4">
                      {c.khachHang?.diemTichLuy ?? 0}
                    </td>
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
                        onClick={() => handleDelete(c.maTaiKhoan)}
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
                    Không tìm thấy khách hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2b3a4b] p-8 rounded-2xl w-[550px] shadow-2xl">
            <h2 className="text-3xl font-semibold text-[var(--color-accent)] mb-6 text-center">
              Cập nhật thông tin khách hàng
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editing.khachHang?.hoTenKH ?? ""}
                onChange={(e) =>
                  setEditing((prev) => ({
                    ...prev,
                    khachHang: { ...prev.khachHang, hoTenKH: e.target.value },
                  }))
                }
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
                placeholder="Họ tên"
              />
              <input
                type="email"
                value={editing.email ?? ""}
                onChange={(e) =>
                  setEditing((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
                placeholder="Email"
                disabled
              />
              <input
                type="text"
                value={editing.khachHang?.soDienThoai ?? ""}
                onChange={(e) =>
                  setEditing((prev) => ({
                    ...prev,
                    khachHang: {
                      ...prev.khachHang,
                      soDienThoai: e.target.value,
                    },
                  }))
                }
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
                placeholder="Số điện thoại"
              />
              <input
                type="number"
                value={editing.khachHang?.diemTichLuy ?? 0}
                onChange={(e) =>
                  setEditing((prev) => ({
                    ...prev,
                    khachHang: {
                      ...prev.khachHang,
                      diemTichLuy: Number(e.target.value) || 0,
                    },
                  }))
                }
                className="w-full p-3 rounded-lg bg-[#1E2A38] text-[var(--color-text)] outline-none"
                placeholder="Điểm tích lũy"
                min={0}
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

      {/* 👁️ Modal Xem chi tiết */}
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
                {viewing.khachHang?.hoTenKH ?? "—"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Email:
                </span>{" "}
                {viewing.email ?? "—"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Số điện thoại:
                </span>{" "}
                {viewing.khachHang?.soDienThoai ?? "—"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Điểm tích lũy:
                </span>{" "}
                {viewing.khachHang?.diemTichLuy ?? 0}
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
=======
export default CustomerManagement
>>>>>>> Tung
