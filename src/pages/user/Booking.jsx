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
import { Mail, Phone } from "lucide-react";
import ZaloPayLogo from "@/assets/paymentMethodLogo/ZaloPay_Logo.png";
import MomoLogo from "@/assets/paymentMethodLogo/MoMo_Logo.png";
import HotelLogo from "@/assets/hotelLogo/HotelLogo.jpg";

import React from "react";
import { Button } from "@/components/ui/button";

const Booking = () => {
  return (
    <div className="flex bg-background gap-10 justify-center min-h-fit py-8">
      <div className="w-full md:w-1/2 grid grid-cols-1 gap-10">
        {/* Phần này là phần nhập thông tin khách hàng */}
        <div className="shadow-lg rounded-md overflow-hidden">
          <div className="w-full border-b">
            <h2 className="text-3xl p-4">Customer</h2>
          </div>
          <form className="grid gap-4 p-4">
            <div className="grid grid-cols-2 gap-4">
              <InputGroup className="py-2">
                <InputGroupInput placeholder="First Name" name="firstName" />
              </InputGroup>
              <InputGroup className="py-2">
                <InputGroupInput placeholder="Last Name" name="lastName" />
              </InputGroup>
            </div>

            <InputGroup className="py-2">
              <InputGroupInput placeholder="Email" name="email" />
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup>
              <InputGroupInput placeholder="Phone" name="phone" />
              <InputGroupAddon>
                <Phone />
              </InputGroupAddon>
            </InputGroup>
            <div className="flex items-center gap-3">
              <Label>Country: </Label>
              <Select defaultValue="vn">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vn">Vietnam</SelectItem>
                  <SelectItem value="th">Thailand</SelectItem>
                  <SelectItem value="kr">Korea</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        {/* Đây là phần nhập yêu cầu bổ sung */}
        <div className="shadow-2xl rounded-md">
          <div className="w-full border-b-[2px]">
            <h2 className="text-3xl m-4">Additional Information</h2>
          </div>
          <div className="p-4">
            <Textarea
              className="w-full h-30"
              placeholder="If you have any special needs, please feel free to share them with us. We’ll do our best to help you"
            />
          </div>
        </div>
        {/* Thanh toán */}
        <div className="shadow-2xl rounded-md">
          <div className="w-full border-b-[2px]">
            <h2 className="text-3xl m-4">Payment</h2>
          </div>
          <div className="p-4">
            <div className="flex gap-3 items-center">
              <Checkbox className="size-5" />
              <Label>Tôi đồng ý với những điều khoản và quy định.</Label>
            </div>
            <hr className="mt-3 mb-3 border-1" />
            <div className="space-y-5">
              <div className="flex justify-between">
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
      </div>
      {/* Thông tin đặt phòng */}
      <div className="hidden md:block md:w-1/4 bg-background shadow-2xl h-fit sticky top-8 rounded-md pb-3">
        <div className="border-b">
          <h2 className="text-3xl p-4">My booking</h2>
        </div>
        {/* Hình đại diện của phòng */}
        <div className="w-full h-30 md:h-40 overflow-hidden">
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
              1 night
            </p>
            <div className="bg-white border-t px-3 py-2 grid grid-cols-3 gap-2">
              <div>
                <p className="text-lg font-semibold">19 October</p>
                <p className="text-xs text-gray-500">Sunday</p>
                <p className="text-xs text-gray-600 mt-2">Check in 13:00</p>
              </div>
              <p className="text-center font-normal text-lg">------</p>
              <div className="text-right">
                <p className="text-lg font-semibold">20 October</p>
                <p className="text-xs text-gray-500">Monday</p>
                <p className="text-xs text-gray-600 mt-2">Check out 12:30</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex justify-between px-3 py-2">
            <p className="font-medium text-[16px]">Reservation</p>
            <p className="font-medium text-[14px]">1 Room, 1 Guest</p>
          </div>
          <hr />
          <div className="flex justify-between px-3 py-2">
            <p className="font-medium text-[16px]">Rome type</p>
            <p className="font-medium text-[14px]">Standard</p>
          </div>
          <div className="border-[1px] border-b-gray-900"></div>
          <div className="px-3 py-2">
            <p>1 night stay</p>
            <div className="flex justify-between ml-2">
              <p className="text-gray-500 text-[14px]">19 Oct - 20 Oct</p>
              <p className="text-gray-500 text-[14px]">₫1,465,000</p>
            </div>
          </div>
          <hr />
          <div className="px-3 py-2">
            <p>Services</p>
            <div className="flex justify-between ml-2">
              <p className="text-gray-500 text-[14px]">Breakfase</p>
              <p className="text-gray-500 text-[14px]">Include</p>
            </div>
          </div>
          <hr />
          <div className="px-3 py-2 ">
            <p>Taxes</p>
            <div className="flex justify-between ml-2">
              <p className="text-gray-500 text-[14px]">VAT</p>
              <p className="text-gray-500 text-[14px]">₫200,000</p>
            </div>
          </div>
          <div className="border-[1px] border-b-gray-900"></div>
          
          <div className="flex justify-between ml-2">
              <p className="text-xl">Total price:</p>
              <p className="text-2xl">₫1,665,000</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
