import React, { useEffect } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { User, Phone, Mail, Award } from 'lucide-react'
import { useState } from 'react'
import { useFetch } from "../../hooks/useFetch";
import {toast} from "react-toastify";
const AccountInfo = () => {
  const { get, put, error } = useFetch(`${import.meta.env.VITE_BASE_API_URL}/api`);
  const [user, setUser] = useState(null);
  const userId = "TK2";

  useEffect(() => {
    const fetchUser = async () => {
      const req = await get(`/taikhoan/${userId}`);
      if (req) {
        setUser(req.data);
      }
      else {
        toast.error('Failed to fetch user data: ' + error);
      }
    }

    fetchUser();
  }, []);

  const handelSave = () => {
    const updateUser = async () => {
      const req = await put(`/taikhoan/update`, user);
      if (req.success) {
        setUser(req.data);
        toast.success('Cập nhật thông tin thành công!');
      }
      else {
        toast.error(req.message || 'Cập nhật thông tin thất bại!');
      }
    }
    updateUser();
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 pt-16 pb-20">
      {/* Form Container */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gray-200 px-10 py-6 border-b">
          <h2 className="text-4xl font-bold text-gray-800">Thông tin cá nhân</h2>
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
                Tên đăng nhập
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Nhập tên đăng nhập của bạn"
                required
                value={user ? user.khachHang.hoTenKH : ''}
                onChange={(e) => { setUser({ ...user, khachHang: { ...user.khachHang, hoTenKH: e.target.value } }) }}
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
                value={user ? user.khachHang.soDienThoai : ''}
                onChange={(e) => { setUser({ ...user, khachHang: { ...user.khachHang, soDienThoai: e.target.value } }) }}
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
                value={user ? user.email : ''}
                onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
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

                <span className='text-gray-700 font-semibold'>
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
  )
}

export default AccountInfo
