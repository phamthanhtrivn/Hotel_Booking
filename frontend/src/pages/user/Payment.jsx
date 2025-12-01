/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CreditCard,
  Shield,
  CheckCircle2,
  Calendar,
  Users,
  Bed,
  Ruler,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatVND } from "@/helpers/currencyFormatter";
import { calculateNights, formatVietnameseDate } from "@/helpers/dateHelpers";

import VNPayLogo from "@/assets/paymentMethodLogo/VNPay_Logo.svg";
import MomoLogo from "@/assets/paymentMethodLogo/MoMo_Logo.png";
import HotelLogo from "@/assets/hotelLogo/HotelLogo.jpg";

const Payment = () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const { maDatPhong } = location.state || {};

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("vnpay");

  useEffect(() => {
    if (!maDatPhong) {
      toast.error("Không tìm thấy mã đặt phòng.");
      navigate("/");
      return;
    }

    const fetchBooking = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/api/dondatphong/${maDatPhong}`);
        if (res.data.success) {
          setBooking(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Lỗi khi tải thông tin đơn đặt phòng.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [maDatPhong, navigate]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán.");
      return;
    }

    setProcessing(true);

    try {
      if (paymentMethod === "vnpay") {
        const res = await axios.post(`${baseUrl}/api/payments/vn-pay`, {
          amount: booking.tongTienTT,
          bankCode: "NCB",
          bookingId: booking.maDatPhong,
        });

        if (res.data.success) {
          window.location.href = res.data.data;
        } else {
          toast.error(res.data.message);
        }
      } else if (paymentMethod === "momo") {
        const res = await axios.post(`${baseUrl}/api/payments/momo`, {
          amount: booking.tongTienTT,
          bookingId: booking.maDatPhong,
        });

        if (res.data.resultCode == 0) {
          window.location.href = res.data.payUrl;
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error("Lỗi khi tạo giao dịch.");
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  const PaymentMethodCard = ({ id, name, logo, description, recommended }) => (
    <div
      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
        paymentMethod === id
          ? "border-[#1E2A38] bg-[#F1F3F6] shadow-md"
          : "border-gray-200 hover:border-[#1E2A38] hover:bg-gray-50"
      }`}
      onClick={() => setPaymentMethod(id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === id
                ? "border-[#1E2A38] bg-[#1E2A38]"
                : "border-gray-400"
            }`}
          >
            {paymentMethod === id && (
              <CheckCircle2 className="w-3 h-3 text-white" />
            )}
          </div>
          <img src={logo} alt={name} className="h-8 w-8 object-contain" />
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        {recommended && (
          <Badge variant="secondary" className="bg-[#E1F5E7] text-[#1D7A46]">
            Đề xuất
          </Badge>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F3F6] py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-64 mx-auto mb-2" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-80 rounded-xl" />
              <Skeleton className="h-60 rounded-xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-96 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F1F3F6] flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Đơn hàng không tồn tại
          </h2>
          <p className="text-gray-600 mb-6">
            Không thể tìm thấy thông tin đơn đặt phòng.
          </p>
          <Button
            onClick={() => navigate("/room-types")}
            className="w-full bg-[#1E2A38] hover:bg-[#2B3B4E]"
          >
            Quay lại đặt phòng
          </Button>
        </Card>
      </div>
    );
  }

  const nights = calculateNights(booking.checkIn, booking.checkOut);
  const room = booking.phong?.loaiPhong;
  const roomImage = room?.hinhAnh?.[0] || HotelLogo;
  const checkInFormated = formatVietnameseDate(booking.checkIn);
  const checkOutFormated = formatVietnameseDate(booking.checkOut);

  return (
    <div className="min-h-screen bg-[#F1F3F6] py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1E2A38] mb-2">
            Thanh Toán Đơn Đặt Phòng
          </h1>
          <p className="text-lg text-gray-600">
            Mã đơn:{" "}
            <span className="font-mono font-semibold text-[#1E2A38]">
              #{booking.maDatPhong}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg rounded-2xl py-0">
              <CardHeader className="bg-gradient-to-r from-[#1E2A38] to-[#2B3B4E] text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 mt-2">
                  <Calendar className="w-6 h-6" />
                  Chi Tiết Đơn Hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                {/* Room Image */}
                <div className="mb-6">
                  <img
                    src={roomImage}
                    alt={room?.tenLoaiPhong}
                    className="w-full h-48 object-cover rounded-xl shadow-md"
                  />
                </div>

                {/* Room Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">
                        {room?.tenLoaiPhong}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{room?.moTa}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Stay Duration */}
                  <div className="bg-[#F1F3F6] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-900">
                        {nights} đêm
                      </span>
                      <Badge className="bg-[#2B3B4E] text-white">
                        {room?.soKhach} khách
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="font-bold text-lg text-gray-900">
                          {checkInFormated.day} {checkInFormated.month}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {checkInFormated.dayName}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Check-in: 13:00
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="font-bold text-lg text-gray-900">
                          {checkOutFormated.day} {checkOutFormated.month}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {checkOutFormated.dayName}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Check-out: 12:30
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Giá phòng ({nights} đêm)
                      </span>
                      <span className="font-semibold">
                        {formatVND(booking.tongTien)}
                      </span>
                    </div>
                    {booking.giamGiaLanDau > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Giảm giá lần đầu (10%)
                        </span>
                        <span className="font-semibold">
                          - {formatVND(booking.giamGiaLanDau)}
                        </span>
                      </div>
                    )}
                    {booking.giamGiaDiemTichLuy > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Giảm giá điểm tích lũy
                        </span>
                        <span className="font-semibold">
                          - {formatVND(booking.giamGiaDiemTichLuy)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">VAT (8%)</span>
                      <span className="font-semibold">
                        {formatVND(booking.vat)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-red-500">Tổng cộng</span>
                      <span className="font-bold text-red-500">
                        {formatVND(booking.tongTienTT)}
                      </span>
                    </div>
                  </div>

                  {/* Guest Note */}
                  {booking.ghiChu && (
                    <>
                      <Separator />
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm font-semibold text-yellow-800 mb-1">
                          Ghi chú đặc biệt
                        </p>
                        <p className="text-sm text-yellow-700">
                          {booking.ghiChu}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="border-0 shadow-lg rounded-2xl py-0">
              <CardHeader className="bg-gradient-to-r from-[#1E2A38] to-[#2B3B4E] text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 mt-2">
                  <Users className="w-6 h-6" />
                  Thông Tin Khách Hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Họ tên
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {booking.hoTenKhachHang}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {booking.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Số điện thoại
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {booking.soDienThoai}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Mã đơn
                    </label>
                    <p className="text-lg font-semibold text-[#1E2A38]">
                      #{booking.maDatPhong}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="border-0 shadow-lg rounded-2xl py-0">
              <CardHeader className="bg-gradient-to-r from-[#1E2A38] to-[#2B3B4E] text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 mt-2">
                  <CreditCard className="w-6 h-6" />
                  Phương Thức Thanh Toán
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  <PaymentMethodCard
                    id="vnpay"
                    name="VNPay"
                    logo={VNPayLogo}
                    description="Thanh toán qua VNPay - An toàn & Bảo mật"
                    recommended={true}
                  />
                  <PaymentMethodCard
                    id="momo"
                    name="MoMo"
                    logo={MomoLogo}
                    description="Ví điện tử MoMo - Tiện lợi & Nhanh chóng"
                  />
                </div>
                {/* Pay Button */}
                <Button
                  className="w-full mt-6 bg-[#1E2A38] hover:bg-[#2B3B4E] text-white py-6 text-lg font-semibold rounded-xl shadow-lg transition-all cursor-pointer"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang xử lý...
                    </div>
                  ) : (
                    `Thanh Toán ${formatVND(booking.tongTienTT)}`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
