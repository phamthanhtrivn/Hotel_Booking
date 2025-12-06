import React, { useState } from "react";
import { X, Star, Sparkles, Handshake, Building2 } from "lucide-react";
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        
        {/* HEADER */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" size={26} />
            <h2 className="text-2xl font-bold text-gray-900">Đánh giá phòng</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={26} />
          </button>
        </div>

        <div className="p-6 space-y-7">
          {/* Cleanliness */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Sparkles size={18} className="text-blue-500" />
              Điểm Sạch Sẽ
            </label>
            <Input
              type="number"
              min={0}
              max={10}
              value={danhGia.diemSachSe}
              onChange={(e) =>
                setDanhGia({ ...danhGia, diemSachSe: e.target.value })
              }
              disabled={hasReview}
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Service */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Handshake size={18} className="text-green-600" />
              Điểm Dịch Vụ
            </label>
            <Input
              type="number"
              min={0}
              max={10}
              value={danhGia.diemDichVu}
              onChange={(e) =>
                setDanhGia({ ...danhGia, diemDichVu: e.target.value })
              }
              disabled={hasReview}
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Facilities */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Building2 size={18} className="text-purple-600" />
              Điểm Cơ Sở Vật Chất
            </label>
            <Input
              type="number"
              min={0}
              max={10}
              value={danhGia.diemCoSoVatChat}
              onChange={(e) =>
                setDanhGia({ ...danhGia, diemCoSoVatChat: e.target.value })
              }
              disabled={hasReview}
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Comment */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-800">
              Bình Luận
            </label>
            <textarea
              rows={4}
              value={danhGia.binhLuan}
              onChange={(e) =>
                setDanhGia({ ...danhGia, binhLuan: e.target.value })
              }
              disabled={hasReview}
              className="w-full border border-gray-300 px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
              placeholder="Hãy chia sẻ trải nghiệm của bạn..."
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition cursor-pointer"
            >
              Hủy
            </button>

            {!hasReview && (
              <button
                onClick={handleSubmit}
                className="flex-1 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium transition cursor-pointer"
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
