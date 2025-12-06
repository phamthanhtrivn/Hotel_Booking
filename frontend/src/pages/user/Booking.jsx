import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Phone, User } from "lucide-react";
import VNPayLogo from "@/assets/paymentMethodLogo/VNPAy_Logo.svg";
import MomoLogo from "@/assets/paymentMethodLogo/MoMo_Logo.png";
import HotelLogo from "@/assets/hotelLogo/HotelLogo.jpg";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateNights, formatVietnameseDate, toLocalDate } from "@/helpers/dateHelpers";
import { formatVND } from "@/helpers/currencyFormatter";
import { AuthContext } from "@/context/AuthContext";
import { donDatPhongService } from "@/services/donDatPhongService";
import { toast } from "react-toastify";
import InformationDialog from "@/components/common/InformationDialog";
import { quyDinhDieuKhoan } from "@/assets/assets";

const Booking = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {};
  const {
    maLoaiPhong,
    tenLoaiPhong,
    checkIn,
    checkOut,
    soKhach,
    gia,
    hinhAnh,
  } = bookingData;
  const checkInFormated = formatVietnameseDate(checkIn);
  const checkOutFormated = formatVietnameseDate(checkOut);
  const roomType = tenLoaiPhong.split(" ")[0];
  const [stayPrice, setStayPrice] = useState(0);
  const [stayNights, setStayNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [openQuyDinh, setOpenQuyDinh] = useState(false);
  const vat = 8;

  useEffect(() => {
    if (user) {
      setCustomerName(user.khachHang.hoTenKH);
      setEmail(user.email);
      setPhone(user.khachHang.soDienThoai);
      console.log(user);
    }
    setStayNights(calculateNights(checkIn, checkOut));
    setStayPrice(gia * calculateNights(checkIn, checkOut));
    setTotalPrice(stayPrice * (1 + vat / 100));
  }, [checkIn, checkOut, gia, stayPrice, user]);

  const onCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const onAdditionalInformation = (e) => {
    setAdditionalInformation(e.target.value);
  };

  const onCustomerAgree = (checked) => {
    setAgreed(checked);
  };

  const handleOnBook = async () => {
    setLoading(true);
    try {
      const bookingRequest = {
        maKhachHang: user != null ? user.khachHang.maKhachHang : "",
        hoTenKhachHang: customerName,
        soDienThoai: phone,
        maLoaiPhong: maLoaiPhong,
        email: email,
        checkIn: toLocalDate(checkIn), 
        checkOut: toLocalDate(checkOut),
        tongTien: stayPrice,
        vat: vat,
        tongTienThanhToan: totalPrice,
        ghiChu: additionalInformation,
        agreed: agreed,
      };
      console.log(bookingRequest);
      const result = await donDatPhongService.datPhong(bookingRequest);
      console.log(result.data);
      setLoading(false);
      toast.success(
        "Đặt phòng thành công. Mã đơn đặt phòng: " + result.data.maDatPhong
      );
      navigate("/payment", { state: { maDatPhong: result.data.maDatPhong } });
    } catch (error) {
      console.log(error.response.data.data);
      setErrors(error.response.data.data);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row bg-background gap-10 justify-center min-h-fit py-8 px-4">
      {/* Phần nhập thông tin khách hàng, yêu cầu, thanh toán */}
      <div className="w-full md:w-1/2 grid grid-cols-1 gap-10">
        {/* Customer */}
        <div className="rounded-md overflow-hidden border">
          <div className="w-full border-b">
            <h2 className="text-3xl p-4">Thông tin khách hàng</h2>
          </div>
          <form className="grid gap-4 p-4">
            <div>
              <InputGroup
                className={`py-2 ${
                  errors.hoTenKhachHang && "border-destructive"
                }`}
              >
                <InputGroupInput
                  value={customerName}
                  onChange={onCustomerNameChange}
                  placeholder="Họ và tên khách hàng"
                  name="fullName"
                />
                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
              </InputGroup>
              {errors.hoTenKhachHang && (
                <p className="text-red-500 text-[13px] pt-1">
                  {errors.hoTenKhachHang}
                </p>
              )}
            </div>

            <div>
              <InputGroup
                className={`py-2 ${errors.email && "border-destructive"}`}
              >
                <InputGroupInput
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onEmailChange}
                />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
              {errors.email && (
                <p className="text-red-500 text-[13px] pt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <InputGroup
                className={`py-2 ${errors.soDienThoai && "border-destructive"}`}
              >
                <InputGroupInput
                  placeholder="Số điện thoại"
                  name="phone"
                  value={phone}
                  onChange={onPhoneChange}
                />
                <InputGroupAddon>
                  <Phone />
                </InputGroupAddon>
              </InputGroup>
              {errors.soDienThoai && (
                <p className="text-red-500 text-[13px] pt-1">
                  {errors.soDienThoai}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="border rounded-md">
          <div className="w-full border-b">
            <h2 className="text-3xl m-4">Thông tin bổ sung</h2>
          </div>
          <div className="p-4">
            <Textarea
              className="w-full h-30"
              placeholder="Nếu bạn có bất kì yêu cầu đặc biệt nào, hãy tự do chia sẻ với chúng tôi. Chúng tôi sẽ sẵng lòng giúp bạn!"
              value={additionalInformation}
              onChange={onAdditionalInformation}
            />
          </div>
        </div>

        {/* Payment */}
        <div className="border rounded-md">
          <div className="w-full border-b-2">
            <h2 className="text-3xl m-4">Thanh toán</h2>
          </div>
          <div className="p-4 space-y-5">
            <div className="flex gap-3 items-center">
              <Checkbox
                className="size-5"
                checked={agreed}
                onCheckedChange={onCustomerAgree}
              />
              <Label>
                Tôi đồng ý với những{" "}
                <a
                  onClick={() => setOpenQuyDinh(true)}
                  className="text-blue-700 hover:cursor-pointer"
                >
                  điều khoản và quy định
                </a>
                .
              </Label>
            </div>
            {errors.agreed && (
              <p className="text-red-500 text-sm">{errors.agreed}</p>
            )}

            <hr className="border" />

            <div className="flex justify-between items-center">
              <Label className="text-lg">Pay with</Label>
              <div className="flex space-x-2">
                <img
                  src={VNPayLogo}
                  alt="VNPay logo"
                  className="h-10 w-10 object-contain"
                />
                <img
                  src={MomoLogo}
                  alt="Momo logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <p className="text-sm">Tổng tiền đã thanh toán đầy đủ</p>
              <p className="text-xl">{formatVND(totalPrice)}</p>
            </div>

            <div className="flex justify-end">
              <Button className="w-[150px]" onClick={handleOnBook}>
                {isLoading ? (
                  <div className="flex gap-3 items-center justify-center">
                    <Loader2 className="animate-spin" />
                    <p>Đang xử lý</p>
                  </div>
                ) : (
                  "Đặt phòng"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Phần thông tin đặt phòng */}
      <div
        className="
          w-full md:w-1/4
          bg-background border rounded-md pb-3
          md:sticky md:top-8
          h-fit
        "
      >
        <div className="border-b">
          <h2 className="text-3xl p-4">Thông tin đặt phòng</h2>
        </div>
        <div className="w-full h-40 overflow-hidden">
          <img className="w-full h-full object-cover" src={hinhAnh} alt="" />
        </div>
        <div className="m-2 space-y-2">
          <div className="flex space-x-3 items-center">
            <img src={HotelLogo} alt="hotel logo" className="w-[50px]" />
            <p className="font-medium">{tenLoaiPhong}</p>
          </div>
          <hr />
          <div className="overflow-hidden w-full">
            <p className="bg-[#f5f5f5] text-[15px] font-medium px-3 py-2">
              {stayNights} đêm
            </p>
            <div className="bg-white border-t px-3 py-2 grid grid-cols-3 gap-2">
              <div>
                <p className="text-lg font-semibold">
                  {checkInFormated.day} {checkInFormated.month}
                </p>
                <p className="text-xs text-gray-500">
                  {checkInFormated.dayName}
                </p>
                <p className="text-xs text-gray-600 mt-2">Check in 13:00</p>
              </div>
              <p className="text-center font-normal text-lg">------</p>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {checkOutFormated.day} {checkOutFormated.month}
                </p>
                <p className="text-xs text-gray-500">
                  {checkOutFormated.dayName}
                </p>
                <p className="text-xs text-gray-600 mt-2">Check out 12:30</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex justify-between px-3 py-2">
            <p className="font-medium text-[16px]">Đặt chỗ</p>
            <p className="font-medium text-[14px]">1 Phòng, {soKhach} Khách</p>
          </div>
          <hr />
          <div className="flex justify-between px-3 py-2">
            <p className="font-medium text-[16px]">Loại phòng</p>
            <p className="font-medium text-[14px]">{roomType}</p>
          </div>
          <hr />
          <div className="px-3 py-2">
            <p>{stayNights} đêm lưu trú</p>
            <div className="flex justify-between ml-2">
              <p className="text-gray-500 text-[14px]">
                {checkInFormated.day} {checkInFormated.month} -{" "}
                {checkOutFormated.day} {checkOutFormated.month}
              </p>
              <p className="text-gray-500 text-[14px]">
                {formatVND(stayPrice)}
              </p>
            </div>
          </div>
          <hr />
          <div className="px-3 py-2">
            <p>Dịch vụ</p>
            <div className="flex justify-between ml-2">
              <p className="text-gray-500 text-[14px]">Bữa sáng</p>
              <p className="text-gray-500 text-[14px]">Include</p>
            </div>
          </div>
          <hr />
          <div className="px-3 py-2">
            <p>Taxes</p>
            <div className="flex justify-between ml-2">
              <p className="text-gray-500 text-[14px]">VAT 8%</p>
              <p className="text-gray-500 text-[14px]">
                {formatVND(stayPrice * (vat / 100))}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex justify-between ml-2 mt-2">
            <p className="text-xl">Tổng tiền:</p>
            <p className="text-2xl">{formatVND(totalPrice)}</p>
          </div>
        </div>
      </div>
      <InformationDialog
        onClose={() => setOpenQuyDinh(false)}
        className="min-w-xl"
        open={openQuyDinh}
        title="Điều khoản và quy định của chúng tôi"
        children={
          <div className="space-y-1">
            {quyDinhDieuKhoan.map((item) => (
              <div>
                <p className="font-semibold my-3">{item.title}</p>
                <div className="space-y-1">
                  {item.content.map((item) => (
                    <p className="text-[14px]">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};

export default Booking;
