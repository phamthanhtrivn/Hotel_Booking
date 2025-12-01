import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function ReviewModel({ booking, isOpen, onClose }) {
  const hasReview = booking.danhGia && Object.keys(booking.danhGia).length > 0;

  const [danhGia, setDanhGia] = useState({
    diemSachSe: hasReview ? booking.danhGia.diemSachSe : 10,
    diemDichVu: hasReview ? booking.danhGia.diemDichVu : 10,
    diemCoSoVatChat: hasReview ? booking.danhGia.diemCoSoVatChat : 10,
    binhLuan: hasReview ? booking.danhGia.binhLuan : "",
    maLoaiPhong: booking.phong.loaiPhong.maLoaiPhong,
    maDatPhong: booking.maDatPhong,
  });

  const baseUrl = import.meta.env.VITE_BASE_API_URL;

  const handleSubmit = async () => {
    if (hasReview) return;

    try {
      const response = await axios.post(
        `${baseUrl}/api/danhgia/create`,
        danhGia
      );
      if (response.data.success) {
        toast.success("Đánh giá thành công!");
        onClose();
      } else {
        toast.error(response.data.message || "Đánh giá thất bại!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Lỗi gửi đánh giá!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Đánh giá phòng</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cleanliness */}
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Điểm Sạch Sẽ
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Độ sạch sẽ, vệ sinh, gọn gàng của phòng.
            </p>
            <Input
              type="number"
              min={0}
              max={10}
              value={danhGia.diemSachSe}
              onChange={(e) =>
                setDanhGia({ ...danhGia, diemSachSe: e.target.value })
              }
              disabled={hasReview}
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Điểm Dịch Vụ
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Thái độ nhân viên, tốc độ phục vụ, hỗ trợ khách hàng.
            </p>
            <Input
              type="number"
              min={0}
              max={10}
              value={danhGia.diemDichVu}
              onChange={(e) =>
                setDanhGia({ ...danhGia, diemDichVu: e.target.value })
              }
              disabled={hasReview}
            />
          </div>

          {/* Facilities */}
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Điểm Cơ Sở Vật Chất
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Trang thiết bị, nội thất, giường, điều hòa, wifi,...
            </p>
            <Input
              type="number"
              min={0}
              max={10}
              value={danhGia.diemCoSoVatChat}
              onChange={(e) =>
                setDanhGia({ ...danhGia, diemCoSoVatChat: e.target.value })
              }
              disabled={hasReview}
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Bình Luận
            </label>
            <textarea
              rows={4}
              value={danhGia.binhLuan}
              onChange={(e) =>
                setDanhGia({ ...danhGia, binhLuan: e.target.value })
              }
              disabled={hasReview}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#1E2A38] focus:outline-none resize-none mt-2"
              placeholder="Viết cảm nhận của bạn..."
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium cursor-pointer"
            >
              Hủy
            </button>

            {!hasReview && (
              <button
                onClick={handleSubmit}
                className="flex-1 py-2 bg-[#1E2A38] text-white rounded-lg hover:bg-[#162029] font-medium cursor-pointer"
              >
                Gửi đánh giá
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
