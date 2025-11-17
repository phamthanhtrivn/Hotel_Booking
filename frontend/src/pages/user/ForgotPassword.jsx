/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import bg01 from "../../assets/bg01.jpg";
import bg02 from "../../assets/bg02.jpg";
import bg03 from "../../assets/bg03.jpg";
import bg04 from "../../assets/bg04.jpg";
import ImgSlider from "@/components/common/ImgSlider";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Vui lòng nhập email của bạn.");
      return;
    }
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
      toast.error("Email không hợp lệ.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${baseUrl}/forgot-password`, {
        email,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.vaiTro === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, []);

  const handleLoginGG = () => {
    window.location.href = `${
      import.meta.env.VITE_BASE_API_URL
    }/oauth2/authorization/google`;
  };

  return (
    <div>

      {/* RIGHT FORM */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full px-6 py-10 bg-white shadow-2xl md:w-5/12 lg:w-5/12 xl:w-5/12"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="w-full max-w-sm border border-gray-200 shadow-lg rounded-2xl backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-[var(--color-background)] tracking-wide">
              Quên mật khẩu
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Button */}
            <Button
              onClick={handleForgotPassword}
              disabled={isLoading}
              className={`w-full bg-[var(--color-background)] font-semibold rounded-xl shadow-md transition-colors duration-300 hover:bg-[#2a4b70] flex items-center justify-center gap-2 cursor-pointer ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Đang gửi...
                </>
              ) : (
                "Gửi liên kết khôi phục"
              )}
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
                onClick={handleLoginGG}
                variant="outline"
                className="flex items-center justify-center gap-2 transition border-gray-300 cursor-pointer hover:bg-gray-100 rounded-xl"
              >
                <FcGoogle size={22} />
                <span>Đăng nhập bằng Google</span>
              </Button>
            </div>

            {/* Back to Login */}
            <div className="flex flex-col gap-1 mt-4 text-sm text-center text-gray-500">
              <p>
                Quay lại{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
