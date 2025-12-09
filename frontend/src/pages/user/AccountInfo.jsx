import React, { useContext, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { User, Phone, Mail, Award } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
const AccountInfo = () => {
  const { user, token } = useContext(AuthContext);
  const [acc, setAcc] = useState(user);

  const handleFetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/member/taikhoan/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setAcc(res.data.data);
      }
    } catch (err) {
      console.log("REQUEST FAILED:", err);
    }
  };

  const handelSave = () => {
    const updateUser = async () => {
      try {
        const req = await axios.put(
          `${import.meta.env.VITE_BASE_API_URL}/api/member/taikhoan/update`,
          acc,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        if (req) {
          toast.success("Cập nhật thông tin thành công!");
        }
      } catch (err) {
        console.log("REQUEST FAILED:", err);
      }
    };
    updateUser();
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 pt-16 pb-20">
      {/* Form Container */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gray-200 px-10 py-6 border-b">
          <h2 className="text-4xl font-bold text-gray-800">
            Thông tin cá nhân
          </h2>
          <p className="text-gray-500 text-base mt-1">
            Cập nhật và quản lý thông tin tài khoản của bạn
          </p>
        </div>

        {/* Form */}
        <div className="px-10 py-10">
          <div className="space-y-8">
            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <User size={18} />
                Họ và Tên
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Nhập tên đăng nhập của bạn"
                required
                value={acc ? acc.khachHang.hoTenKH : ""}
                onChange={(e) => {
                  setAcc({
                    ...acc,
                    khachHang: { ...acc.khachHang, hoTenKH: e.target.value },
                  });
                }}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <Phone size={18} />
                Số điện thoại
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Nhập số điện thoại của bạn"
                required
                value={acc ? acc.khachHang.soDienThoai : ""}
                onChange={(e) => {
                  setAcc({
                    ...acc,
                    khachHang: {
                      ...acc.khachHang,
                      soDienThoai: e.target.value,
                    },
                  });
                }}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <Mail size={18} />
                Email
              </label>
              <Input
                disabled
                id="email"
                name="email"
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                required
                value={acc ? acc.email : ""}
                onChange={(e) => {
                  setAcc({ ...acc, email: e.target.value });
                }}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="loyaltyPoints"
                className=" text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <Award size={18} />
                Điểm Tích Lũy :
                <span className="text-gray-700 font-semibold">
                  {user ? user.khachHang.diemTichLuy : 0} điểm
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button
                className="w-full bg-blue-600 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={handelSave}
              >
                Lưu thông tin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
