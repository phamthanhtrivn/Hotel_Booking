import { useState, useEffect } from "react";
import axios from "axios";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/common/AdminTable";
import ActionButtons from "@/components/common/ActionButtons";
import DetailDialog from "@/components/common/DetailDialog";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";
import { Button } from "@/components/ui/button";

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [search, setSearch] = useState({
    keyword: "",
    hoTenKhachHang: "",
    soDienThoai: "",
    email: "",
    maKhachHang: "",
    maPhong: "",
    trangThai: "",
    minTongTien: "",
    maxTongTien: "",
    checkIn: "",
    checkOut: "",
  });

  const sanitizeSearch = (searchObj) => {
    const cleaned = {};
    Object.keys(searchObj).forEach((key) => {
      const value = searchObj[key];
      if (value !== "" && value !== null && value !== undefined) {
        cleaned[key] = value;
      }
    });
    return cleaned;
  };

  const fetchAllBookings = async (page = currentPage) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/dondatphong?page=${
          page - 1
        }&size=10`
      );
      setBookings(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
    }
  };

  const searchBookings = async (page = 1) => {
    try {
      const payload = sanitizeSearch(search);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/dondatphong/search?page=${
          page - 1
        }&size=10`,
        payload
      );
      setBookings(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error("Search error:", err.response?.data || err.message);
    }
  };

  const handleDetail = (item) => {
    setCurrentBooking(item);
    setIsOpenDetail(true);
  };

  const resetSearch = () => {
    setSearch({
      keyword: "",
      hoTenKhachHang: "",
      soDienThoai: "",
      email: "",
      maKhachHang: "",
      maPhong: "",
      trangThai: "",
      minTongTien: "",
      maxTongTien: "",
      checkIn: "",
      checkOut: "",
    });
    fetchAllBookings(1);
  };

   useEffect(() => {
    const payload = sanitizeSearch(search);
    if (Object.keys(payload).length === 0) {
      fetchAllBookings(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchAllBookings();
  }, [currentPage]);

  const columns = [
    { key: "maDatPhong", label: "ID" },
    { key: "hoTenKhachHang", label: "Họ và tên" },
    { key: "soDienThoai", label: "Số điện thoại" },
    { key: "email", label: "Email" },
    { key: "tongTienTT", label: "Tổng tiền" },
    { key: "trangThai", label: "Trạng thái" },
  ];

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Quản Lý Đơn Đặt Phòng</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-4 flex justify-between">
            <div className="flex items-center gap-2">
              {/* Keyword */}
              <AdminInput
                label="Họ tên/SĐT/Email"
                type="text"
                placeholder="Nhập thông tin..."
                value={search.keyword}
                onChange={(v) => setSearch({ ...search, keyword: v })}
              />
              {/* Trạng thái */}
              <AdminSelect
                label="Trạng thái"
                className="w-40"
                value={search.trangThai || "ALL"}
                onChange={(v) =>
                  setSearch({ ...search, trangThai: v === "ALL" ? "" : v })
                }
                options={[
                  { label: "Tất cả", value: "ALL" },
                  { label: "Chưa thanh toán", value: "CHUA_THANH_TOAN" },
                  { label: "Đã thanh toán", value: "DA_THANH_TOAN" },
                  { label: "Đã hủy", value: "DA_HUY" },
                ]}
            />
              {/* Tổng tiền */}
              <AdminInput
                label="Tổng tiền tối thiểu"
                type="number"
                value={search.minTongTien}
                onChange={(v) => setSearch({ ...search, minTongTien: v })}
              />
              -
              <AdminInput
                label="Tổng tiền tối đa"
                type="number"
                value={search.maxTongTien}
                onChange={(v) => setSearch({ ...search, maxTongTien: v })}
              />
              {/* Check-in / Check-Out */}
              <AdminInput
                label="Check-in"
                type="datetime-local"
                value={search.checkIn}
                onChange={(v) => setSearch({ ...search, checkIn: v })}
              />
              -
              <AdminInput
                label="Check-out"
                type="datetime-local"
                value={search.checkOut}
                onChange={(v) => setSearch({ ...search, checkOut: v })}
              />
              {/* Buttons */}
              <Button
                className="rounded-2xl bg-blue-600 h-10"
                onClick={() => searchBookings(1)}
              >
                Tìm kiếm
              </Button>
              <Button
                className="rounded-2xl bg-gray-400 h-10"
                onClick={resetSearch}
              >
                X
              </Button>
            </div>
          </div>

          <AdminTable
            data={bookings}
            columns={columns}
            renderActions={(item) => (
              <ActionButtons onView={() => handleDetail(item)} />
            )}
          />
        </CardContent>
      </Card>

      <DetailDialog
        open={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
        data={currentBooking}
        fields={[
          ...columns,
          { key: "checkIn", label: "Check In" },
          { key: "checkOut", label: "Check Out" },
          { key: "ghiChu", label: "Ghi Chú" },
        ]}
      />

      {/* PAGINATION */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={(p) => {
          setCurrentPage(p);
          const payload = sanitizeSearch(search);
          if (Object.keys(payload).length > 0) {
            searchBookings(p);
          } else {
            fetchAllBookings(p);
          }
        }}
      />
    </div>
  );
}
