import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const OAuth2Error = () => {
  const [params] = useSearchParams();
  const errorMessage = params.get("error") || "OAuth2 unknown error";

  useEffect(() => {
    if (errorMessage.includes("access_denied")) {
      toast.error("Bạn đã huỷ đăng nhập Google.");
    } else if (errorMessage.includes("invalid_grant")) {
      toast.error("Google đã từ chối yêu cầu đăng nhập.");
    } else {
      toast.error("Đăng nhập Google thất bại. Vui lòng thử lại.");
    }
  }, [errorMessage]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg shadow bg-white text-center">
        <h2 className="text-2xl font-bold text-red-600">Đăng nhập thất bại</h2>
        <p className="mt-2 text-gray-700">{errorMessage}</p>
        <a href="/" className="mt-4 inline-block text-blue-600 underline">
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
};

export default OAuth2Error;
