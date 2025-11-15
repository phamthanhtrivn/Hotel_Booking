/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${baseUrl}/verify-token`, {
            headers: { Authorization: `Bearer ${token}` },
            validateStatus: () => true,
          });
          if (res.data.success) setUser(res.data.data);
          else {
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          setToken(null);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <Loader2 className="w-16 h-16 text-[#1E2A38] animate-spin" />
      </div>
    );

  return (
    <AuthContext.Provider value={{ user, token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
