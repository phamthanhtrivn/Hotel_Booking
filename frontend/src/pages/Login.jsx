/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; 
import bg01 from "../assets/bg01.jpg";
import bg02 from "../assets/bg02.jpg";
import bg03 from "../assets/bg03.jpg";
import bg04 from "../assets/bg04.jpg";
import ImgSlider from "@/components/common/ImgSlider";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#e2ecf7] to-[#f9fafc] overflow-hidden">
      {/* LEFT IMAGE */}
      <motion.div
        className="relative hidden w-7/12 md:block"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ImgSlider images={[bg01, bg02, bg03, bg04]} interval={4000} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold leading-tight drop-shadow-lg">
            Chào mừng trở lại
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Kết nối và trải nghiệm dịch vụ của chúng tôi ngay hôm nay!
          </p>
        </div>
      </motion.div>

      {/* RIGHT LOGIN FORM */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full px-6 py-10 bg-white shadow-2xl md:w-5/12 lg:w-5/12 xl:w-5/12"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="w-full max-w-sm border border-gray-200 shadow-lg rounded-2xl backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-[var(--color-background)] tracking-wide">
              Đăng Nhập
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email */}
            <div className="relative space-y-2 group">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 group-focus-within:text-[var(--color-background)] transition-colors"
              >
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                className="focus-visible:ring-[var(--color-background)] rounded-xl"
              />
            </div>

            {/* Password */}
            <div className="relative space-y-2 group">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 group-focus-within:text-[var(--color-background)] transition-colors"
              >
                Mật khẩu <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="focus-visible:ring-[var(--color-background)] rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Button Login */}
            <Button className="w-full bg-[var(--color-background)] cursor-pointer font-semibold hover:bg-[#2a4b70] transition-colors duration-300 rounded-xl shadow-md">
              Đăng Nhập
            </Button>

            {/* Separator */}
            <div className="flex items-center gap-2 my-2">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500">hoặc</span>
              <Separator className="flex-1" />
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 transition border-gray-300 cursor-pointer hover:bg-gray-100 rounded-xl"
              >
                <FcGoogle size={22} />
                <span>Đăng nhập bằng Google</span>
              </Button>

              <Button className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] cursor-pointer rounded-xl transition shadow-md">
                <FaFacebook size={22} />
                <span>Đăng nhập bằng Facebook</span>
              </Button>
            </div>

            {/* Register + Forgot password links */}

            <div className="flex flex-col gap-1 mt-4 text-sm text-center text-gray-500">
              <p>
                Bạn chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Đăng ký ngay
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
