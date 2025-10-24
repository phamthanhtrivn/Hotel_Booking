import React, { useState } from "react";
import { Search, Eye } from "lucide-react";

const BookingManagement = () => {
  const [bookings] = useState([
    {
      id: "BK001",
      name: "Nguyễn Tâm Thành",
      phone: "0909123456",
      email: "a@gmail.com",
      total: "2,500,000₫",
      checkin: "2025-10-10 14:00",
      checkout: "2025-10-12 12:00",
      status: "Đã xác nhận",
      note: "Khách yêu cầu phòng view biển",
    },
    {
      id: "BK002",
      name: "Nguyễn Tâm Thành",
      phone: "0909345678",
      email: "b@gmail.com",
      total: "1,800,000₫",
      checkin: "2025-10-15 13:30",
      checkout: "2025-10-17 12:00",
      status: "Chờ xác nhận",
      note: "Thanh toán khi nhận phòng",
    },
    {
      id: "BK003",
      name: "Nguyễn Tâm Thành",
      phone: "0909567890",
      email: "c@gmail.com",
      total: "3,200,000₫",
      checkin: "2025-10-20 15:00",
      checkout: "2025-10-22 11:00",
      status: "Đã thanh toán",
      note: "",
    },
  ]);

  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState(null);

  const filtered = bookings.filter(
    (b) =>
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.status.toLowerCase().includes(search.toLowerCase())
  );

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
        Quản Lý Đơn Đặt Phòng
      </h1>

      {/* Tìm kiếm */}
      <div className="flex items-center bg-[#2b3a4b] p-3 rounded-xl mb-7 shadow-md">
        <Search className="text-[var(--color-muted)] mr-3" />
        <input
          type="text"
          placeholder="Tìm kiếm đơn đặt phòng..."
          className="bg-transparent flex-1 outline-none text-[var(--color-text)]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Bảng */}
      <div className="rounded-xl shadow-lg bg-[#2b3a4b] overflow-hidden">
        <div className="max-h-[550px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-primary)] scrollbar-track-[#2b3a4b]">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-primary)] text-[var(--color-background)] sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">STT</th>
                <th className="py-3 px-4">Mã đặt phòng</th>
                <th className="py-3 px-4">Họ và tên</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Tổng tiền</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-center">Xem chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((b, i) => (
                  <tr
                    key={b.id}
                    className="border-b border-gray-700 hover:bg-[#32465a] transition"
                  >
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">{b.id}</td>
                    <td className="py-3 px-4">{b.name}</td>
                    <td className="py-3 px-4">{b.phone}</td>
                    <td className="py-3 px-4">{b.email}</td>
                    <td className="py-3 px-4">{b.total}</td>
                    <td className="py-3 px-4">{b.status}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setViewing(b)}
                        className="hover:text-blue-400 transition"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-6 text-[var(--color-muted)]"
                  >
                    Không tìm thấy đơn đặt phòng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* xem chi tiết */}
      {viewing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2b3a4b] p-8 rounded-2xl w-[600px] shadow-2xl text-[var(--color-text)]">
            <h2 className="text-3xl font-semibold text-[var(--color-accent)] mb-6 text-center">
              Chi Tiết Đơn Đặt Phòng
            </h2>
            <div className="space-y-4 text-lg">
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Mã đặt phòng:
                </span>{" "}
                {viewing.id}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Họ tên khách hàng:
                </span>{" "}
                {viewing.name}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Số điện thoại:
                </span>{" "}
                {viewing.phone}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Email:
                </span>{" "}
                {viewing.email}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Tổng tiền:
                </span>{" "}
                {viewing.total}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Check-in:
                </span>{" "}
                {viewing.checkin}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Check-out:
                </span>{" "}
                {viewing.checkout}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Trạng thái:
                </span>{" "}
                {viewing.status}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Ghi chú:
                </span>{" "}
                {viewing.note || "Không có"}
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

export default BookingManagement;
