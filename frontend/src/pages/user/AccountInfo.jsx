import React from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { User, Phone, Mail } from 'lucide-react'

const AccountInfo = () => {
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
          <form className="space-y-8">
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
                id="email"
                name="email"
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Lưu thông tin
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AccountInfo
