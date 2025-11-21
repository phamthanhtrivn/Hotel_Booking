import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, User } from "lucide-react";
import ZaloPayLogo from "@/assets/paymentMethodLogo/ZaloPay_Logo.png";
import MomoLogo from "@/assets/paymentMethodLogo/MoMo_Logo.png";
import HotelLogo from "@/assets/hotelLogo/HotelLogo.jpg";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { calculateNights, formatVietnameseDate } from "@/helpers/dateHelpers";
import { formatVND } from "@/helpers/currencyFormatter";
import { AuthContext } from "@/context/AuthContext";
import { donDatPhongService } from "@/services/donDatPhong";
import { toast } from "react-toastify";

const Booking = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
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
  const vat = 8;

  useEffect(() => {
    if (user) {
      setCustomerName(user.khachHang.hoTenKH);
      setEmail(user.email);
      setPhone(user.khachHang.soDienThoai);
    }
    setStayNights(calculateNights(checkIn, checkOut));
    setStayPrice(gia * calculateNights(checkIn, checkOut));
    setTotalPrice(stayPrice * (1 + vat / 100));
    console.log(user);
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

  const bookingValidation = () => {
    const errors = {};

    if (!customerName.trim()) {
      errors.customerName = "Họ và tên không được để trống";
    } else if (customerName.trim().length < 2) {
      errors.customerName = "Họ và tên phải có ít nhất 2 ký tự";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email không được để trống";
    } else if (!emailRegex.test(email)) {
      errors.email = "Email không đúng định dạng";
    }

    const phoneRegex = /^(0|\+84)(\d{9})$/;
    if (!phone.trim()) {
      errors.phone = "Số điện thoại không được để trống";
    } else if (!phoneRegex.test(phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    if (!agreed) {
      errors.agreed = "Bạn phải đồng ý với điều khoản";
    }

    return errors;
  };

  const handleOnBook = async () => {
    const validationErrors = bookingValidation();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const bookingRequest = {
        maKhachHang: user != null ? user.khachHang.maKhachHang : null,
        hoTenKhachHang: customerName,
        soDienThoai: phone,
        maLoaiPhong: maLoaiPhong,
        email: email,
        checkIn: checkIn,
        checkOut: checkOut,
        tongTien: stayPrice,
        vat: vat,
        tongTienThanhToan: totalPrice,
        ghiChu: additionalInformation,
      };
      const result = await donDatPhongService.datPhong(bookingRequest);
      toast.success("Đặt phòng thành công. Mã đơn đặt phòng: " + result.data.maDatPhong);
    } catch (error) {
      console.error("Lỗi khi đặt phòng:", error);
      toast.error("Có lỗi xảy ra khi đặt phòng. Vui lòng thử lại.");
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
            <InputGroup className="py-2">
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
            {errors.customerName && (
              <p className="text-red-500 text-sm">{errors.customerName}</p>
            )}
            <InputGroup className="py-2">
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
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <InputGroup>
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
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
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
        <div className="border-[1px] rounded-md">
          <div className="w-full border-b-[2px]">
            <h2 className="text-3xl m-4">Thanh toán</h2>
          </div>
          <div className="p-4 space-y-5">
            <div className="flex gap-3 items-center">
              <Checkbox
                className="size-5"
                checked={agreed}
                onCheckedChange={onCustomerAgree}
              />
              <Label>Tôi đồng ý với những điều khoản và quy định.</Label>
              {errors.agreed && (
                <p className="text-red-500 text-sm">{errors.agreed}</p>
              )}
            </div>

            <hr className="border-1" />

            <div className="flex justify-between items-center">
              <Label className="text-lg">Pay with</Label>
              <div className="flex space-x-2">
                <img
                  src={ZaloPayLogo}
                  alt="Zalopay logo"
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
                Book
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Phần thông tin đặt phòng */}
      <div
        className="
          w-full md:w-1/4
          bg-background border-[1px] rounded-md pb-3
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
              <p className="text-gray-500 text-[14px]">VAT</p>
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
    </div>
  );
};

export default Booking;
