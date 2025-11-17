<<<<<<< HEAD
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
import { Mail, Phone, User} from "lucide-react";
import ZaloPayLogo from "@/assets/paymentMethodLogo/ZaloPay_Logo.png";
import MomoLogo from "@/assets/paymentMethodLogo/MoMo_Logo.png";
import HotelLogo from "@/assets/hotelLogo/HotelLogo.jpg";
import { Button } from "@/components/ui/button";
import React from "react";

const Booking = () => {
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
              <InputGroupInput placeholder="Họ và tên khách hàng" name="fullName" />
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup className="py-2">
              <InputGroupInput placeholder="Email" name="email" />
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup>
              <InputGroupInput placeholder="Số điện thoại" name="phone" />
              <InputGroupAddon>
                <Phone />
              </InputGroupAddon>
            </InputGroup>
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
              <Checkbox className="size-5" />
              <Label>Tôi đồng ý với những điều khoản và quy định.</Label>
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
              <p className="text-xl">₫1,665,000</p>
            </div>

            <div className="flex justify-end">
              <Button className="w-[150px]">Book</Button>
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
          <img
            className="w-full h-full object-cover"
            src="https://digital.ihg.com/is/image/ihg/intercontinental-vung-tau-7075898055-4x3?wid=1280&fit=constrain&resmode=bisharp"
            alt=""
          />
        </div>
        <div className="m-2 space-y-2">
          <div className="flex space-x-3 items-center">
            <img src={HotelLogo} alt="hotel logo" className="w-[50px]" />
            <p className="font-medium">Standard Double Sea View</p>
          </div>
          <hr />
          <div className="overflow-hidden w-full">
            <p className="bg-[#f5f5f5] text-[15px] font-medium px-3 py-2">
              1 đêm
            </p>
            <div className="bg-white border-t px-3 py-2 grid grid-cols-3 gap-2">
              <div>
                <p className="text-lg font-semibold">19 Tháng 8</p>
                <p className="text-xs text-gray-500">Chủ nhật</p>
                <p className="text-xs text-gray-600 mt-2">Check in 13:00</p>
              </div>
              <p className="text-center font-normal text-lg">------</p>
              <div className="text-right">
                <p className="text-lg font-semibold">20 Tháng 8</p>
                <p className="text-xs text-gray-500">Thứ hai</p>
                <p className="text-xs text-gray-600 mt-2">Check out 12:30</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex justify-between px-3 py-2">
            <p className="font-medium text-[16px]">Đặt chỗ</p>
            <p className="font-medium text-[14px]">1 Phòng, 1 Khách</p>
          </div>
          <hr />
          <div className="flex justify-between px-3 py-2">
            <p className="font-medium text-[16px]">Loại phòng</p>
            <p className="font-medium text-[14px]">Standard</p>
          </div>
          <hr />
          <div className="px-3 py-2">
            <p>1 night stay</p>
            <div className="flex justify-between ml-2">
              <p className="text-gray-500 text-[14px]">19 Th8 - 20 Th8</p>
              <p className="text-gray-500 text-[14px]">₫1,465,000</p>
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
              <p className="text-gray-500 text-[14px]">₫200,000</p>
            </div>
          </div>
          <hr />
          <div className="flex justify-between ml-2 mt-2">
            <p className="text-xl">Tổng tiền:</p>
            <p className="text-2xl">₫1,665,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
=======
import React from 'react'

const Booking = () => {
  return (
    <div>Booking</div>
  )
}

export default Booking
>>>>>>> Tung
