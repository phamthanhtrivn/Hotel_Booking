import React, { useState,useEffect } from "react";
import { Search, Eye } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";

const ReviewManagement = () => {
  const { get } = useFetch(`${import.meta.env.VITE_BASE_API_URL}/api/`);
  const [reviews, setReviews] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [filters, setFilters] = useState({
    roomType: '',
    ratingType: '',
    ratingScore: null,
    month: 0,
    year: 0,
  });
  const [years, setYears] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const req = await get('danhgia');
      const reqYears = await get('danhgia/nam');
      const reqRoomTypes = await get('loaiphong/loaiPhong');
      if (reqYears.success) {
        setYears(reqYears.data);
      }
      if (reqRoomTypes.success) {
        setRoomTypes(reqRoomTypes.data);
      }
      if (req.success) {
        setReviews(req.data);
      }
      else {
        console.log(req.message);
      }
    }
    fetchReviews();
  }, []);

  const loaiDanhGia = (a, b, c) => {
    if (a + b + c >= 14) return "GOOD";
    if (a + b + c >= 12) return "QUITE-GOOD";
    if (a + b + c >= 9) return "AVERAGE";
    return "BAD";
  }

  function formatToDDMMYYYY_HHMM(dateInput) {
    const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(d.getTime())) return '';

    const pad = (n) => String(n).padStart(2, '0');

    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  const handelSearch = () => {
    console.log('Searching with filters:', filters);
    const fetchFilteredReviews = async () => {
      const req = await get(
        `danhgia/search?maLoaiPhong=${filters.roomType}` +
        `&loaiMucDo=${filters.ratingType}` +
        `&diemMucDo=${filters.ratingScore || ""}` +
        `&thang=${filters.month || ""}` +
        `&nam=${filters.year || ""}`
      );
      if (req.success) {
        setReviews(req.data);
      }
    }
    fetchFilteredReviews();
  }



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
        Quản Lý Đánh Giá
      </h1>

      <div className="bg-[#2b3a4b] mb-10 rounded-xl shadow-xl p-6 border border-[var(--color-primary)]/30">
        <h2 className="text-xl font-semibold text-[var(--color-accent)] mb-5">
          Bộ Lọc Tìm Kiếm
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="space-y-2">
            <label className="text-[var(--color-accent)] font-medium">Loại phòng</label>
            <select
              value={filters.roomType}
              onChange={(e) =>
                setFilters({ ...filters, roomType: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#1e2a38] text-white border border-[var(--color-primary)]/50 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] transition"
            >
              <option value="">Tất cả</option>
              {
                roomTypes.map((item) => <option value={item.maLoaiPhong}>{item.tenLoaiPhong}</option>)
              }

            </select>
          </div>

          {/* LOẠI ĐÁNH GIÁ */}
          <div className="space-y-2">
            <label className="text-[var(--color-accent)] font-medium">Loại đánh giá</label>
            <select
              value={filters.ratingType}
              onChange={(e) =>
                setFilters({ ...filters, ratingType: e.target.value, ratingScore: e.target.options[e.target.selectedIndex].getAttribute('score') })
              }
              className="w-full px-4 py-2 bg-[#1e2a38] text-white border border-[var(--color-primary)]/50 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] transition"
            >
              <option value="">Tất cả</option>
              <option value="GOOD" score={14}>Xuất Sắc ({">="} 14 sao)</option>
              <option value="QUITE-GOOD" score={12}>Tốt ({">="} 12 sao)</option>
              <option value="AVERAGE" score={9}>Trung Bình ({">="} 9 sao)</option>
              <option value="BAD" score={8}>Kém ({"<"} 9 sao)</option>
            </select>
          </div>

          {/* THÁNG */}
          <div className="space-y-2">
            <label className="text-[var(--color-accent)] font-medium">Tháng</label>
            <select
              value={filters.month}
              onChange={(e) =>
                setFilters({ ...filters, month: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#1e2a38] text-white border border-[var(--color-primary)]/50 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] transition"
            >
              <option value="">Tất cả</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={String(i + 1).padStart(2, "0")}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* NĂM */}
          <div className="space-y-2">
            <label className="text-[var(--color-accent)] font-medium">Năm</label>
            <select
              value={filters.year}
              onChange={(e) =>
                setFilters({ ...filters, year: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#1e2a38] text-white border border-[var(--color-primary)]/50 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] transition"
            >
              <option value="">Tất cả</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={handelSearch} className="flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-background)] px-6 py-2 rounded-lg hover:bg-[var(--color-accent)] transition font-semibold shadow-md">
            <Search size={20} />
            Tìm kiếm
          </button>
        </div>
      </div>



      <div className="rounded-xl shadow-lg bg-[#2b3a4b] overflow-hidden">
        <div className="max-h-[550px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-primary)] scrollbar-track-[#2b3a4b]">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-primary)] text-[var(--color-background)] sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">STT</th>
                <th className="py-3 px-4">Mã Đánh Giá</th>
                <th className="py-3 px-4">Điểm Sạch Sẽ</th>
                <th className="py-3 px-4">Điểm Dịch Vụ</th>
                <th className="py-3 px-4">Điểm CSVC</th>
                <th className="py-3 px-4">Bình Luận</th>
                <th className="py-3 px-4">Loại Phòng</th>
                <th className="py-3 px-4">Thời Gian</th>
                <th className="py-3 px-4 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((r, i) => (
                  <tr
                    key={r.id}
                    className="border-b border-gray-700 hover:bg-[#32465a] transition"
                  >
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">{r.danhGia.maDanhGia}</td>
                    <td className="py-3 px-4">{r.danhGia.diemSachSe}</td>
                    <td className="py-3 px-4">{r.danhGia.diemDichVu}</td>
                    <td className="py-3 px-4">{r.danhGia.diemCoSoVatChat}</td>
                    <td className="py-3 px-4">{r.danhGia.binhLuan}</td>
                    <td className="py-3 px-4">{r.loaiPhong.tenLoaiPhong}</td>
                    <td className="py-3 px-4">{formatToDDMMYYYY_HHMM(r.danhGia.thoiGianDanhGia)}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setViewing(r)}
                        className="hover:text-[var(--color-accent)] transition"
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
                    colSpan={9}
                    className="text-center py-6 text-[var(--color-muted)]"
                  >
                    Không tìm thấy đánh giá nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {viewing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2b3a4b] p-8 rounded-2xl w-[750px] shadow-2xl text-[var(--color-text)] max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-semibold text-[var(--color-accent)] mb-6 text-center">
              Chi Tiết Đánh Giá
            </h2>


            <div>

              <div className="space-y-2 text-lg">
                <p>
                  <span className="font-semibold text-[var(--color-accent)]">Mã đánh giá:</span>{" "}
                  {viewing.danhGia.maDanhGia}
                </p>
                <p>
                  <span className="font-semibold text-[var(--color-accent)]">Điểm sạch sẽ:</span>{" "}
                  {viewing.diemSachSe}
                </p>
                <p>
                  <span className="font-semibold text-[var(--color-accent)]">Điểm dịch vụ:</span>{" "}
                  {viewing.danhGia.diemDichVu}
                </p>
                <p>
                  <span className="font-semibold text-[var(--color-accent)]">Điểm cơ sở vật chất:</span>{" "}
                  {viewing.danhGia.diemCoSoVatChat}
                </p>
                <p>
                  <span className="font-semibold text-[var(--color-accent)]">Bình luận:</span>{" "}
                  {viewing.danhGia.binhLuan}
                </p>
                <p>
                  <span className="font-semibold text-[var(--color-accent)]">Loại phòng:</span>{" "}
                  {viewing.loaiPhong.tenLoaiPhong}
                </p>
                <p>
                  <span className="font-semibold text-[var(--color-accent)]">Thời gian đánh giá:</span>{" "}
                  {formatToDDMMYYYY_HHMM(viewing.danhGia.thoiGianDanhGia)}
                </p>
              </div>
            </div>


            <div>

              <div className="space-y-2 text-lg">
                <p><span className="font-semibold text-[var(--color-accent)]">Mã đặt phòng:</span> {viewing.donDatPhong.maDatPhong}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Họ tên khách hàng:</span> {viewing.donDatPhong.hoTenKhachHang}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Số điện thoại:</span> {viewing.khachHang.soDienThoai}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Phòng:</span> {viewing.phong.maPhong}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Thời gian check-in:</span> {formatToDDMMYYYY_HHMM(viewing.donDatPhong.checkIn)}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Thời gian check-out:</span> {formatToDDMMYYYY_HHMM(viewing.donDatPhong.checkOut)}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Trạng thái:</span> {viewing.donDatPhong.trangThai}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Ghi chú:</span> {viewing.donDatPhong.ghiChu || "Không có"}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Đánh giá:</span> {loaiDanhGia(viewing.danhGia.diemSachSe, viewing.danhGia.diemDichVu, viewing.danhGia.diemCoSoVatChat)}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">VAT:</span> {viewing.donDatPhong.vat}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Lần đầu:</span> {viewing.donDatPhong.lanDau ? "Có" : "Không"}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Giảm giá tích lũy:</span> {viewing.donDatPhong.giamGiaTichLuy}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Tổng tiền:</span> {viewing.donDatPhong.tongTien}</p>
                <p><span className="font-semibold text-[var(--color-accent)]">Tổng tiền thanh toán:</span> {viewing.donDatPhong.tongTienTT}</p>
              </div>
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

export default ReviewManagement;
