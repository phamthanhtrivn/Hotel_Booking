import React, { useState } from "react";
import { Search, Eye } from "lucide-react";

const ReviewManagement = () => {
  const [reviews] = useState([
    {
      id: 1,
      maDanhGia: "DG001",
      diemSachSe: 9,
      diemDichVu: 8,
      diemCoSoVatChat: 9,
      binhLuan: "Phòng sạch sẽ, nhân viên nhiệt tình.",
      loaiPhong: "Deluxe",
      thoiGianDanhGia: "2025-10-20 14:00",
      datPhong: {
        maDatPhong: "DP001",
        hoTenKhachHang: "Nguyễn Văn A",
        soDienThoai: "0909123456",
        email: "vana@example.com",
        phong: "P101",
        thoiGianCheckin: "2025-10-18 12:00",
        thoiGianCheckout: "2025-10-20 10:00",
        trangThai: "Hoàn thành",
        ghiChu: "Thanh toán đủ.",
        danhGia: "Rất tốt",
        vat: "10%",
        lanDau: true,
        giamGiaTichLuy: "50,000 VNĐ",
        tongTien: "1,500,000 VNĐ",
        tongTienThanhToan: "1,350,000 VNĐ",
      },
    },
    {
      id: 2,
      maDanhGia: "DG002",
      diemSachSe: 8,
      diemDichVu: 7,
      diemCoSoVatChat: 8,
      binhLuan: "Phòng ổn, hơi ồn do gần đường.",
      loaiPhong: "Standard",
      thoiGianDanhGia: "2025-10-22 10:30",
      datPhong: {
        maDatPhong: "DP002",
        hoTenKhachHang: "Trần Thị B",
        soDienThoai: "0909988776",
        email: "tranb@example.com",
        phong: "P303",
        thoiGianCheckin: "2025-10-20 13:00",
        thoiGianCheckout: "2025-10-22 09:00",
        trangThai: "Hoàn thành",
        ghiChu: "",
        danhGia: "Tốt",
        vat: "10%",
        lanDau: false,
        giamGiaTichLuy: "0 VNĐ",
        tongTien: "1,000,000 VNĐ",
        tongTienThanhToan: "1,100,000 VNĐ",
      },
    },
  ]);

  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState(null);

  const filtered = reviews.filter(
    (r) =>
      r.maDanhGia.toLowerCase().includes(search.toLowerCase()) ||
      r.loaiPhong.toLowerCase().includes(search.toLowerCase()) ||
      r.binhLuan.toLowerCase().includes(search.toLowerCase())
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
        Quản Lý Đánh Giá
      </h1>

      <div className="flex items-center bg-[#2b3a4b] p-3 rounded-xl mb-7 shadow-md">
        <div className="flex items-center flex-1">
          <Search className="text-[var(--color-muted)] mr-3" />
          <input
            type="text"
            placeholder="Tìm kiếm đánh giá..."
            className="bg-transparent flex-1 outline-none text-[var(--color-text)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
              {filtered.length > 0 ? (
                filtered.map((r, i) => (
                  <tr
                    key={r.id}
                    className="border-b border-gray-700 hover:bg-[#32465a] transition"
                  >
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">{r.maDanhGia}</td>
                    <td className="py-3 px-4">{r.diemSachSe}</td>
                    <td className="py-3 px-4">{r.diemDichVu}</td>
                    <td className="py-3 px-4">{r.diemCoSoVatChat}</td>
                    <td className="py-3 px-4">{r.binhLuan}</td>
                    <td className="py-3 px-4">{r.loaiPhong}</td>
                    <td className="py-3 px-4">{r.thoiGianDanhGia}</td>
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
                {viewing.maDanhGia}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">Điểm sạch sẽ:</span>{" "}
                {viewing.diemSachSe}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">Điểm dịch vụ:</span>{" "}
                {viewing.diemDichVu}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">Điểm cơ sở vật chất:</span>{" "}
                {viewing.diemCoSoVatChat}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">Bình luận:</span>{" "}
                {viewing.binhLuan}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">Loại phòng:</span>{" "}
                {viewing.loaiPhong}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-accent)]">Thời gian đánh giá:</span>{" "}
                {viewing.thoiGianDanhGia}
              </p>
            </div>
          </div>

       
          <div>
      
            <div className="space-y-2 text-lg">
              <p><span className="font-semibold text-[var(--color-accent)]">Mã đặt phòng:</span> {viewing.datPhong.maDatPhong}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Họ tên khách hàng:</span> {viewing.datPhong.hoTenKhachHang}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Số điện thoại:</span> {viewing.datPhong.soDienThoai}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Email:</span> {viewing.datPhong.email}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Phòng:</span> {viewing.datPhong.phong}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Thời gian check-in:</span> {viewing.datPhong.thoiGianCheckin}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Thời gian check-out:</span> {viewing.datPhong.thoiGianCheckout}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Trạng thái:</span> {viewing.datPhong.trangThai}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Ghi chú:</span> {viewing.datPhong.ghiChu || "Không có"}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Đánh giá:</span> {viewing.datPhong.danhGia}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">VAT:</span> {viewing.datPhong.vat}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Lần đầu:</span> {viewing.datPhong.lanDau ? "Có" : "Không"}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Giảm giá tích lũy:</span> {viewing.datPhong.giamGiaTichLuy}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Tổng tiền:</span> {viewing.datPhong.tongTien}</p>
              <p><span className="font-semibold text-[var(--color-accent)]">Tổng tiền thanh toán:</span> {viewing.datPhong.tongTienThanhToan}</p>
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
