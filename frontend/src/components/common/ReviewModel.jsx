import React, { useState } from 'react';
import {useFetch} from '@/hooks/useFetch';
import { Star,X } from 'lucide-react';
import { toast } from "react-toastify";
import {Input} from "@/components/ui/input";

export default function ReviewModel({ booking, isOpen, onClose }) {

    const [danhGia, setDanhGia] = useState({ diemSachSe: 10, diemDichVu: 10, diemCoSoVatChat: 10, binhLuan: '', maLoaiPhong: booking.phong.loaiPhong.maLoaiPhong, maDatPhong: booking.maDatPhong });
    const { post } = useFetch(import.meta.env.VITE_BASE_API_URL + '/api/');



   


    const handleSubmit = () => {
        const submitDanhGia = async () => {
            const response = await post('danhgia/create', danhGia);
            if (response.success) {
                toast.success('Đánh giá thành công!');
                onClose();
            }
            else {
                toast.error(response.message || 'Đánh giá thất bại!');
            }
        }
        submitDanhGia();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Đánh Giá</h2>
                    <button
                        onClick={() => onClose()}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Điểm Sạch Sẽ
                        </label>
                        <Input value={danhGia.diemSachSe} onChange={(e) => setDanhGia({ ...danhGia, diemSachSe: e.target.value })} min={0} max={10} type="number" placeholder="Điểm Sạch Sẽ" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Điểm Dịch Vụ
                        </label>
                        <Input value={danhGia.diemDichVu} onChange={(e) => setDanhGia({ ...danhGia, diemDichVu: e.target.value })} min={0} max={10} type="number" placeholder="Điểm Dịch Vụ" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Điểm Cơ Sở Vật Chất
                        </label>
                        <Input value={danhGia.diemCoSoVatChat} onChange={(e) => setDanhGia({ ...danhGia, diemCoSoVatChat: e.target.value })} min={0} max={10} type="number" placeholder="Điểm Cơ Sở Vật Chất" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bình Luận
                        </label>
                        <textarea
                            value={danhGia.binhLuan}
                            onChange={(e) => setDanhGia({ ...danhGia, binhLuan: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Nhập bình luận của bạn..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Gửi Đánh Giá
                        </button>
                    </div>
                </div>
            </div>
        </div>


    );
}