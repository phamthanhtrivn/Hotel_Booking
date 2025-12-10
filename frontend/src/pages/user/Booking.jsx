/* eslint-disable react-hooks/exhaustive-deps */
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
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  calculateNights,
  formatVietnameseDate,
  toLocalDate,
} from "@/helpers/dateHelpers";
import { formatVND } from "@/helpers/currencyFormatter";
import { AuthContext } from "@/context/AuthContext";
import { donDatPhongService } from "@/services/donDatPhongService";
import { toast } from "react-toastify";
import InformationDialog from "@/components/common/InformationDialog";
import { quyDinhDieuKhoan } from "@/assets/assets";
import axios from "axios";
import { loaiPhongService } from "@/services/loaiPhongService";
import { useSelector } from "react-redux";

const Booking = () => {
  const { user, token } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("room_type");
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const filters = useSelector((state) => state.roomSearch);
  const { checkIn, checkOut, guests, children } = filters;
  const checkInFormated = formatVietnameseDate(checkIn);
  const checkOutFormated = formatVietnameseDate(checkOut);
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
  const discount = 10;
  const [totalBookingNumber, setTotalBookingNumber] = useState(0);
  const [vatMoney, setVatMoney] = useState(0);
  const [discountFirstTime, setDiscountFirstTime] = useState(0);
  const [discountPointsMoney, setDiscountPointsMoney] = useState(0);
  const [phuThuTreEm, setPhuThuTreEm] = useState(0);
  const fetchTotalBookingNumber = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/member/dondatphong/count/${user.khachHang.maKhachHang}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        setTotalBookingNumber(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Không thể tính số lần đặt phòng.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchTotalBookingNumber();
      setCustomerName(user.khachHang.hoTenKH);
      setEmail(user.email);
      setPhone(user.khachHang.soDienThoai);
    }
  }, [user]);

  useEffect(() => {
    const fetchRoomData = async () => {
      setLoading(true);
      try {
        const roomRes = await loaiPhongService.findById(id);
        setRoom(roomRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải dữ liệu phòng!");
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, [id]);

  useEffect(() => {
    const nights = calculateNights(checkIn, checkOut);
    let chargedNights = nights;

    if (!user) {
      setPhuThuTreEm(calculateChildFee(children) * nights);
      const basePrice = room.gia * nights + phuThuTreEm;

      const vatM = basePrice * (vat / 100);
      const total = basePrice + vatM;

      setStayNights(nights);
      setStayPrice(basePrice);
      setVatMoney(vatM);
      setTotalPrice(total);
      setDiscountFirstTime(0);
      setDiscountPointsMoney(0);
      return;
    }

    setCustomerName(user.khachHang.hoTenKH);
    setEmail(user.email);
    setPhone(user.khachHang.soDienThoai);

    if (user.khachHang.diemTichLuy >= 10) {
      chargedNights = nights - 1;
    }

    const stayP = room.gia * nights;

    setPhuThuTreEm(calculateChildFee(children) * chargedNights);

    const basePrice = room.gia * chargedNights + phuThuTreEm;

    const pointsDiscountMoney =
      room.gia * (nights - chargedNights) +
      calculateChildFee(children) *
        (nights - chargedNights) *
        (nights - chargedNights);

    let firstDiscount = 0;
    if (totalBookingNumber === 0) {
      firstDiscount = basePrice * (discount / 100);
    }

    const vatValue = (basePrice - firstDiscount) * (vat / 100);

    const total = basePrice - firstDiscount + vatValue;

    setStayNights(nights);
    setStayPrice(stayP);
    setDiscountPointsMoney(pointsDiscountMoney);
    setDiscountFirstTime(firstDiscount);
    setVatMoney(vatValue);
    setTotalPrice(total);
  }, [checkIn, checkOut, room.gia, vat, totalBookingNumber, user]);

  const calculateChildFee = (childrenAges = []) => {
    let feePerNight = 0;
    childrenAges.forEach((age) => {
      if (age >= 7 && age <= 11) {
        // 100k mỗi đêm
        feePerNight += 100000;
        return;
      }
    });

    return feePerNight;
  };

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
      const checkInDate =
        typeof checkIn === "string" ? new Date(checkIn) : checkIn;
      const checkOutDate =
        typeof checkOut === "string" ? new Date(checkOut) : checkOut;
      const bookingRequest = {
        maKhachHang: user != null ? user.khachHang.maKhachHang : "",
        hoTenKhachHang: customerName,
        soDienThoai: phone,
        maLoaiPhong: room.maLoaiPhong,
        email: email,
        checkIn: toLocalDate(checkInDate),
        checkOut: toLocalDate(checkOutDate),
        tongTien: stayPrice,
        vat: vatMoney,
        tongTienThanhToan: totalPrice,
        ghiChu: additionalInformation,
        agreed: agreed,
        phuThuTreEm: phuThuTreEm,
        giamGiaLanDau: discountFirstTime,
        giamGiaDiemTichLuy: discountPointsMoney,
        trangThaiDon: totalPrice > 0 ? "CHUA_THANH_TOAN" : "DA_THANH_TOAN",
      };
      const result = await donDatPhongService.datPhong(bookingRequest);
      setLoading(false);
      toast.success(
        "Đặt phòng thành công. Mã đơn đặt phòng: " + result.data.maDatPhong
      );
      if (totalPrice > 0) {
        navigate("/payment", { state: { maDatPhong: result.data.maDatPhong } });
      } else {
        navigate("/account/booking-history");
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data?.data || {});
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
              <Button
                type="button"
                className="w-[150px] cursor-pointer bg-[#1E2A38] hover:bg-[#16202b]"
                onClick={handleOnBook}
              >
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
          {room && (
            <img
              className="w-full h-full object-cover"
              src={room.hinhAnh?.[0]}
              alt=""
            />
          )}
        </div>
        <div className="m-2 space-y-2">
          <div className="flex space-x-3 items-center">
            <img src={HotelLogo} alt="hotel logo" className="w-[50px]" />
            <p className="font-medium">{room.tenLoaiPhong}</p>
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
            <div>
              <p className="font-medium text-[14px]">{guests} người lớn</p>
              {children.length > 0 && (
                <p className="font-medium text-[14px]">
                  {" "}
                  {children.length} trẻ
                  {children.length > 0 && ` (${children.join(" tuổi, ")} tuổi)`}
                </p>
              )}
            </div>
          </div>
          <hr />
          <div className="flex justify-between px-3 py-2">
            <p className="font-medium text-[16px]">Loại phòng</p>
            <p className="font-medium text-[14px]">
              {room.tenLoaiPhong && room.tenLoaiPhong.split(" ")[0]}
            </p>
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
          {totalBookingNumber === 0 && (
            <>
              {discountFirstTime > 0 && (
                <>
                  <hr />
                  <div className="px-3 py-2">
                    <p>Giảm giá</p>
                    <div className="flex justify-between ml-2">
                      <p className="text-gray-500 text-[14px]">
                        Giảm 10% cho đơn đặt phòng đầu tiên
                      </p>
                      <p className="text-gray-500 text-[14px]">
                        - {formatVND(discountFirstTime)}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {phuThuTreEm > 0 && (
            <>
              <hr />
              <div className="px-3 py-2 flex justify-between">
                <p>Phụ thu trẻ em</p>
                <p className="text-gray-500 text-[14px]">
                  {formatVND(phuThuTreEm)}
                </p>
              </div>
            </>
          )}
          {user?.khachHang.diemTichLuy >= 10 && (
            <>
              <hr />
              <div className="px-3 py-2">
                <p>Ưu đãi tích lũy</p>
                <div className="flex justify-between ml-2">
                  <p className="text-gray-500 text-[14px] w-[70%]">
                    Miễn phí 1 đêm vì bạn có điểm tích lũy &gt;= 10 <br /> (trừ
                    đi 10 điểm sau khi áp dụng)
                  </p>
                  <p className="text-gray-500 text-[14px]">
                    - {formatVND(discountPointsMoney)}
                  </p>
                </div>
              </div>
            </>
          )}

          <hr />
          <div className="px-3 py-2">
            <p>Taxes</p>
            <div className="flex justify-between ml-2">
              <p className="text-gray-500 text-[14px]">VAT 8%</p>
              <p className="text-gray-500 text-[14px]">{formatVND(vatMoney)}</p>
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
        className="min-w-[40vw]  max-h-[95vh]"
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
