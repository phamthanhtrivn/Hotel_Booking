import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId");

  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      toast.error("Không tìm thấy mã đơn đặt phòng.");
      navigate("/");
      return;
    }

    const fetchBooking = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/api/public/dondatphong/${bookingId}`);
        if (res.data.success && res.data.data.trangThai !== "DA_THANH_TOAN") {
          setBooking(res.data.data);
        } else {
          toast.error("Đơn đặt phòng không tồn tại hoặc đã thanh toán.");
          navigate("/");
        }
      } catch (error) {
        toast.error("Lỗi khi tải thông tin đơn đặt phòng.");
        console.log(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, baseUrl, navigate]);

  if (loading) return <p className="text-center mt-8">Đang tải...</p>;

  return (
    <div className="min-h-screen bg-[#F1F3F6] flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 text-center p-8 shadow-lg rounded-2xl">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Thanh toán thất bại!</h2>
        <p className="text-gray-600">
          Mã đơn của bạn: <span className="font-mono font-semibold text-gray-900">{booking.maDatPhong}</span>
        </p>
        <p className="text-gray-600">
          Khách hàng: <span className="font-semibold">{booking.hoTenKhachHang}</span>
        </p>
        <Button
          onClick={() => navigate("/room-types")}
          className="w-full bg-[#1E2A38] hover:bg-[#2B3B4E] cursor-pointer"
        >
          Quay lại đặt phòng
        </Button>
      </Card>
    </div>
  );
};

export default PaymentFailed;
