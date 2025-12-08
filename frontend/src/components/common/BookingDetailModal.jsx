/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthContext";

const BookingDetailModal = ({ booking, onClose }) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const [note, setNote] = useState(booking.ghiChu || "");
  const statusLabels = {
    CHUA_THANH_TOAN: "Chưa thanh toán",
    DA_THANH_TOAN: "Đã thanh toán",
    DA_HUY: "Đã hủy",
  };
  const { token } = useContext(AuthContext)

  const checkInTime = new Date(booking.checkIn);
  const now = new Date();
  const diffHours = (checkInTime - now) / (1000 * 60 * 60);

  const isCanceled =
    booking.trangThai?.toUpperCase() === "DA_HUY" ||
    booking.trangThai?.toUpperCase() === "ĐÃ HỦY";

  const canModify = diffHours > 24 && !isCanceled;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const fetchCapNhatGhiChu = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/api/member/dondatphong/capnhat-ghichu/${booking.maDatPhong}`,
        {
          method: "POST",
          headers: { "Content-Type": "text/plain", "Authorization": `Bearer ${token}` },
          body: note,
        }
      );
      if (!response.ok) {
        const errorMsg = await response.text();
        alert("Cập nhật ghi chú thất bại: " + errorMsg);
        return;
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi cập nhật ghi chú!");
    }
  };

  const fetchHuyDatPhong = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/api/member/dondatphong/huy/${booking.maDatPhong}`,
        { method: "POST", headers: { "Authorization": `Bearer ${token}` } }
      );
      if (!response.ok) {
        const errorMsg = await response.text();
        alert("Hủy đơn thất bại: " + errorMsg);
        return;
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi hủy đơn!");
    }
  };

  const handleUpdateNote = async () => {
    if (!canModify) return;
    Swal.fire({
      title: "Bạn có muốn cập nhật ghi chú không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchCapNhatGhiChu();
        Swal.fire({
          title: "Cập nhật ghi chú thành công!",
          icon: "success",
        });
      }
    });
  };

  const handleCancelBooking = async () => {
    if (!canModify) return;
    if (!canModify) return;
    Swal.fire({
      title: "Bạn có muốn hủy đơn đặt phòng không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hủy đơn",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchHuyDatPhong();
        Swal.fire({
          title: "Hủy đơn đặt phòng thành công!",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-[90%] md:w-[750px] bg-white text-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-[#1E2A38]">
            Chi tiết đơn #{booking.maDatPhong}
          </h2>

          {/* TRẠNG THÁI */}
          <div className="mb-4 text-center">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold
              ${
                isCanceled
                  ? "bg-red-100 text-red-600"
                  : booking.trangThai === "DA_THANH_TOAN"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {statusLabels[booking.trangThai] || booking.trangThai}
            </span>
          </div>

          {/* --- THÔNG TIN KHÁCH HÀNG --- */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#1E2A38] mb-2">
              👤 Thông tin khách hàng
            </h3>
            <div className="space-y-1.5">
              <p>
                <strong>Khách hàng:</strong> {booking.hoTenKhachHang}
              </p>
              <p>
                <strong>Email:</strong> {booking.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {booking.soDienThoai}
              </p>
            </div>
          </div>

          {/* --- THÔNG TIN PHÒNG --- */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#1E2A38] mb-2">
              🛏️ Thông tin phòng
            </h3>

            <div className="space-y-1.5">
              <p>
                <strong>Phòng:</strong> {booking.phong?.loaiPhong?.tenLoaiPhong}
              </p>
              <p>
                <strong>Số khách:</strong> {booking.phong?.loaiPhong?.soKhach}
              </p>
              <p>
                <strong>Check-in:</strong>{" "}
                {new Date(booking.checkIn).toLocaleString()}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {new Date(booking.checkOut).toLocaleString()}
              </p>
            </div>
          </div>

          {/* --- THANH TOÁN --- */}
          <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-[#1E2A38] mb-3">
              💵 Thanh toán
            </h3>

            <div className="space-y-1.5 text-base">
              <p>
                <strong>Giá gốc:</strong> {booking.tongTien?.toLocaleString()}{" "}
                VNĐ
              </p>

              <p className="text-green-700">
                <strong>Giảm giá lần đầu (10%):</strong> -
                {booking.giamGiaLanDau?.toLocaleString() || 0} VNĐ
              </p>

              <p className="text-green-700">
                <strong>Giảm giá điểm tích lũy:</strong> -
                {booking.giamGiaDiemTichLuy?.toLocaleString() || 0} VNĐ
              </p>

              <p>
                <strong>VAT (8%):</strong> +{booking.vat?.toLocaleString() || 0}{" "}
                VNĐ
              </p>

              <hr className="my-2" />

              <p className="text-xl font-bold text-[#CBA75E]">
                Tổng thanh toán: {booking.tongTienTT?.toLocaleString()} VNĐ
              </p>
            </div>
          </div>

          {/* --- GHI CHÚ --- */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#1E2A38] mb-2">
              📝 Ghi chú
            </h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={!canModify}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#CBA75E]"
              rows={3}
            />
            {!canModify && !isCanceled && (
              <p className="text-sm text-red-500 mt-1">
                *Không thể thay đổi vì còn ít hơn 24h trước giờ check-in.
              </p>
            )}
            {isCanceled && (
              <p className="text-sm text-red-500 mt-1">
                *Đơn đã hủy — không thể chỉnh sửa.
              </p>
            )}
          </div>

          {/* --- BUTTONS --- */}
          <div className="flex flex-wrap justify-end gap-4 mt-6">
            <button
              onClick={handleUpdateNote}
              disabled={!canModify}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                canModify
                  ? "bg-[#1E2A38] text-white hover:bg-[#16212A]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Cập nhật ghi chú
            </button>

            <button
              onClick={handleCancelBooking}
              disabled={!canModify}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                canModify
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Hủy đặt phòng
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold cursor-pointer"
            >
              Thoát
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default BookingDetailModal;
