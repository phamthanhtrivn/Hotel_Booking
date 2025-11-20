import React, { useEffect, useState } from "react";
import { Search, Eye } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

let debounceTimer;

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState({
    hoTenKhachHang: "",
    soDienThoai: "",
    email: "",
    maKhachHang: "",
    maPhong: "",
    trangThai: "",
    checkInFrom: "",
    checkInTo: "",
    checkOutFrom: "",
    checkOutTo: "",
    minTongTien: "",
    maxTongTien: "",
  });

  const fetchAllBookings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/dondatphong`
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const searchAdvanced = async () => {
    try {
      const payload = {
        ...filters,
        minTongTien: filters.minTongTien ? Number(filters.minTongTien) : null,
        maxTongTien: filters.maxTongTien ? Number(filters.maxTongTien) : null,
        trangThai: filters.trangThai || null,
        checkInFrom: filters.checkInFrom || null,
        checkInTo: filters.checkInTo || null,
        checkOutFrom: filters.checkOutFrom || null,
        checkOutTo: filters.checkOutTo || null,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/dondatphong/search`,
        payload
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (Object.values(filters).some((v) => v !== "")) {
        searchAdvanced();
      } else {
        fetchAllBookings();
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [filters]);

  const handleDateChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    const { checkInFrom, checkInTo, checkOutFrom, checkOutTo } = {
      ...filters,
      [field]: value,
    };
    if (
      checkInFrom &&
      checkInTo &&
      new Date(checkInTo) < new Date(checkInFrom)
    ) {
      toast.error("Ngày kết thúc check-in phải sau ngày bắt đầu!");
    }
    if (
      checkOutFrom &&
      checkOutTo &&
      new Date(checkOutTo) < new Date(checkOutFrom)
    ) {
      toast.error("Ngày kết thúc check-out phải sau ngày bắt đầu!");
    }
  };

  // --- filter search keyword ---
  const filtered = bookings.filter((b) => {
    const k = keyword.toLowerCase();
    return (
      (b.maDatPhong && b.maDatPhong.toLowerCase().includes(k)) ||
      (b.hoTenKhachHang && b.hoTenKhachHang.toLowerCase().includes(k)) ||
      (b.soDienThoai && b.soDienThoai.includes(k)) ||
      (b.email && b.email.toLowerCase().includes(k)) ||
      (b.trangThai && b.trangThai.toLowerCase().includes(k))
    );
  });

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
        .input-filter {
          background: #1E2A38;
          padding: 10px 12px;
          border-radius: 10px;
          color: white;
          outline: none;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        .filter-label {
          margin-bottom: 4px;
          font-weight: 500;
          color: var(--color-accent);
        }
      `}</style>

      <Toaster position="top-right" reverseOrder={false} />

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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="bg-[#2b3a4b] p-5 rounded-xl mb-6 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="filter-group">
          <label className="filter-label">Tên khách hàng</label>
          <input
            type="text"
            value={filters.hoTenKhachHang}
            onChange={(e) =>
              setFilters({ ...filters, hoTenKhachHang: e.target.value })
            }
            className="input-filter"
          />
        </div>
        <div className="filter-group">
          <label className="filter-label">Số điện thoại</label>
          <input
            type="text"
            value={filters.soDienThoai}
            onChange={(e) =>
              setFilters({ ...filters, soDienThoai: e.target.value })
            }
            className="input-filter"
          />
        </div>
        <div className="filter-group">
          <label className="filter-label">Email</label>
          <input
            type="email"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            className="input-filter"
          />
        </div>
        <div className="filter-group">
          <label className="filter-label">Trạng thái</label>
          <select
            value={filters.trangThai}
            onChange={(e) =>
              setFilters({ ...filters, trangThai: e.target.value })
            }
            className="input-filter"
          >
            <option value="">-- Chọn trạng thái --</option>
            <option value="CHUA_THANH_TOAN">Chưa thanh toán</option>
            <option value="DA_THANH_TOAN">Đã thanh toán</option>
            <option value="DA_HUY">Đã hủy</option>
          </select>
        </div>

        {/* Check-in/out và Min/Max tiền */}
        <div className="filter-group">
          <label className="filter-label">Check-in từ</label>
          <input
            type="datetime-local"
            value={filters.checkInFrom}
            onChange={(e) => handleDateChange("checkInFrom", e.target.value)}
            className="input-filter"
          />
        </div>
        <div className="filter-group">
          <label className="filter-label">Check-in đến</label>
          <input
            type="datetime-local"
            value={filters.checkInTo}
            onChange={(e) => handleDateChange("checkInTo", e.target.value)}
            className="input-filter"
          />
        </div>
        <div className="filter-group">
          <label className="filter-label">Min tiền</label>
          <input
            type="number"
            value={filters.minTongTien}
            onChange={(e) =>
              setFilters({ ...filters, minTongTien: e.target.value })
            }
            className="input-filter"
          />
        </div>
        <div className="filter-group">
          <label className="filter-label">Max tiền</label>
          <input
            type="number"
            value={filters.maxTongTien}
            onChange={(e) =>
              setFilters({ ...filters, maxTongTien: e.target.value })
            }
            className="input-filter"
          />
        </div>
      </div>

      {/* Table */}
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
                    key={b.maDatPhong}
                    className="border-b border-gray-700 hover:bg-[#32465a] transition"
                  >
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">{b.maDatPhong}</td>
                    <td className="py-3 px-4">{b.hoTenKhachHang}</td>
                    <td className="py-3 px-4">{b.soDienThoai}</td>
                    <td className="py-3 px-4">{b.email}</td>
                    <td className="py-3 px-4">{b.tongTienTT}</td>
                    <td className="py-3 px-4">{b.trangThai}</td>
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

      {/* Chi tiết modal */}
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
                {viewing.maDatPhong}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Họ tên khách hàng:
                </span>{" "}
                {viewing.hoTenKhachHang}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Số điện thoại:
                </span>{" "}
                {viewing.soDienThoai}
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
                {viewing.tongTienTT}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Check-in:
                </span>{" "}
                {viewing.checkIn}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Check-out:
                </span>{" "}
                {viewing.checkOut}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Trạng thái:
                </span>{" "}
                {viewing.trangThai}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">
                  Ghi chú:
                </span>{" "}
                {viewing.ghiChu || "Không có"}
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
