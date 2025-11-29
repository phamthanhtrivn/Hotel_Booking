/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";

const BookingDetailModal = ({ booking, onClose }) => {
  const [note, setNote] = useState(booking.ghiChu || "");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const statusLabels = {
    CHUA_THANH_TOAN: "Chưa thanh toán",
    DA_THANH_TOAN: "Đã thanh toán",
    DA_HUY: "Đã hủy",
  };

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

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      onClose();
      window.location.reload();
    }, 1500);
  };

  const handleUpdateNote = async () => {
    if (!canModify) return;
    if (!window.confirm("Bạn có chắc chắn muốn cập nhật ghi chú không?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/dondatphong/capnhat-ghichu/${booking.maDatPhong}`,
        {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: note,
        }
      );
      if (!response.ok) {
        const errorMsg = await response.text();
        alert("Cập nhật ghi chú thất bại: " + errorMsg);
        return;
      }
      handleSuccess("Ghi chú đã được cập nhật thành công!");
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi cập nhật ghi chú!");
    }
  };

  const handleCancelBooking = async () => {
    if (!canModify) return;
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn đặt phòng không?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/dondatphong/huy/${booking.maDatPhong}`,
        { method: "POST" }
      );
      if (!response.ok) {
        const errorMsg = await response.text();
        alert("Hủy đơn thất bại: " + errorMsg);
        return;
      }
      handleSuccess("Đơn đặt phòng đã được hủy thành công!");
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi hủy đơn!");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-[90%] md:w-[700px] bg-white text-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 overflow-y-auto max-h-[90vh]"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-[#1E2A38]">
            Chi tiết đơn #{booking.maDatPhong}
          </h2>

          <div className="space-y-2 text-base">
            <p>
              <strong className="text-[#1E2A38]">Khách hàng:</strong>{" "}
              {booking.hoTenKhachHang}
            </p>
            <p>
              <strong className="text-[#1E2A38]">Email:</strong> {booking.email}
            </p>
            <p>
              <strong className="text-[#1E2A38]">Số điện thoại:</strong>{" "}
              {booking.soDienThoai}
            </p>
            <p>
              <strong className="text-[#1E2A38]">Check-in:</strong>{" "}
              {new Date(booking.checkIn).toLocaleString()}
            </p>
            <p>
              <strong className="text-[#1E2A38]">Check-out:</strong>{" "}
              {new Date(booking.checkOut).toLocaleString()}
            </p>
            <p>
              <strong className="text-[#1E2A38]">Trạng thái:</strong>{" "}
              {statusLabels[booking.trangThai] || booking.trangThai}
            </p>

            <hr className="my-2 border-gray-300" />

            <p>
              <strong className="text-[#1E2A38]">Phòng:</strong>{" "}
              {booking.phong?.loaiPhong?.tenLoaiPhong || "Chưa xác định"}
            </p>
            <p>
              <strong className="text-[#1E2A38]">Số khách:</strong>{" "}
              {booking.phong?.loaiPhong?.soKhach || 1}
            </p>
            <p>
              <strong className="text-[#1E2A38]">Tổng tiền:</strong>{" "}
              {booking.tongTien?.toLocaleString()} VND
            </p>
            <p>
              <strong className="text-[#1E2A38]">Tổng thanh toán:</strong>{" "}
              {booking.tongTienTT?.toLocaleString()} VND
            </p>
            <p>
              <strong className="text-[#1E2A38]">VAT:</strong>{" "}
              {booking.VAT || 0}%
            </p>
            <p>
              <strong className="text-[#1E2A38]">Giảm điểm tích lũy:</strong>{" "}
              {booking.giamGiaDiemTichLuy?.toLocaleString() || 0} VND
            </p>
            <p>
              <strong className="text-[#1E2A38]">Đánh giá:</strong>{" "}
              {booking.danhGia?.noiDung || "Chưa đánh giá"}
            </p>

            <label className="block mt-4 text-lg font-medium text-[#1E2A38]">
              Ghi chú:
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={!canModify}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#CBA75E] outline-none text-gray-800"
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

          <div className="flex flex-wrap justify-end gap-4 mt-6">
            <button
              onClick={handleUpdateNote}
              disabled={!canModify}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                canModify
                  ? "bg-[#1E2A38] text-[#CBA75E] hover:bg-[#16212A]"
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
                  ? "bg-[#1E2A38] text-[#CBA75E] hover:bg-[#16212A]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Hủy đặt phòng
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold transition-colors cursor-pointer"
            >
              Thoát
            </button>
          </div>
        </motion.div>
      </div>

      {/* Success modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <p className="text-gray-800 font-medium">{successMessage}</p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BookingDetailModal;
