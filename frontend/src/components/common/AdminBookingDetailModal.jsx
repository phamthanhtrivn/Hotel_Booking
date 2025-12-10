/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const AdminBookingDetailModal = ({ booking, onClose }) => {
  const statusLabels = {
    CHUA_THANH_TOAN: "Chưa thanh toán",
    DA_THANH_TOAN: "Đã thanh toán",
    DA_HUY: "Đã hủy",
  };

  const isCanceled =
    booking.trangThai?.toUpperCase() === "DA_HUY" ||
    booking.trangThai?.toUpperCase() === "ĐÃ HỦY";

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
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

        {/* THÔNG TIN KHÁCH HÀNG */}
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

        {/* THÔNG TIN PHÒNG */}
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
              <strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleString()}
            </p>
            <p>
              <strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleString()}
            </p>
          </div>
        </div>

        {/* THANH TOÁN */}
        <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-[#1E2A38] mb-3">💵 Thanh toán</h3>
          <div className="space-y-1.5 text-base">
            <p>
              <strong>Giá gốc:</strong> {booking.tongTien?.toLocaleString()} VNĐ
            </p>
            <p className="text-green-700">
              <strong>Giảm giá lần đầu (10%):</strong> -{booking.giamGiaLanDau?.toLocaleString() || 0} VNĐ
            </p>
            <p className="text-green-700">
              <strong>Giảm giá điểm tích lũy:</strong> -{booking.giamGiaDiemTichLuy?.toLocaleString() || 0} VNĐ
            </p>
            <p>
              <strong>VAT (8%):</strong> +{booking.vat?.toLocaleString() || 0} VNĐ
            </p>
            <hr className="my-2" />
            <p className="text-xl font-bold text-red-600">
              Tổng thanh toán: {booking.tongTienTT?.toLocaleString()} VNĐ
            </p>
          </div>
        </div>

        {/* GHI CHÚ */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#1E2A38] mb-2">📝 Ghi chú</h3>
          <p className="bg-gray-50 border border-gray-300 rounded-lg p-3">
            {booking.ghiChu || "—"}
          </p>
        </div>

        {/* NÚT ĐÓNG */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminBookingDetailModal;
