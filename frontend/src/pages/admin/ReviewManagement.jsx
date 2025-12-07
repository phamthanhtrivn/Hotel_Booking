import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/common/AdminTable";
import { useContext, useEffect, useState } from "react";
import ActionButtons from "@/components/common/ActionButtons";
import { useFetch } from "@/hooks/useFetch";
import { Search } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import DetailDialog from "@/components/common/DetailDialog";

import AdminPagination from "@/components/common/AdminPagination";
import { AuthContext } from "@/context/AuthContext";

const ratingScoreMap = {
  GOOD: 9,
  "QUITE-GOOD": 8,
  AVERAGE: 7,
  BAD: 6,
  all: "",
};

export default function ReviewManagement() {
  const { token } = useContext(AuthContext);
  const { get, put } = useFetch(`${import.meta.env.VITE_BASE_API_URL}`, {
    Authorization: `Bearer ${token}`,
  });
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    roomType: "",
    ratingType: "",
    ratingScore: "",
    month: "",
    year: "",
  });
  const [years, setYears] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReviews = async () => {
    const req = await get(
      `/api/admin/danhgia?page=${currentPage - 1}` +
        `&maLoaiPhong=${filters.roomType || ""}` +
        `&loaiMucDo=${filters.ratingType || ""}` +
        `&diemMucDo=${filters.ratingScore || ""}` +
        `&thang=${filters.month || ""}` +
        `&nam=${filters.year || ""}`
    );
    const reqYears = await get("/api/admin/danhgia/nam");
    const reqRoomTypes = await get("/api/public/loaiphong/loaiPhong");
    if (reqYears.success) {
      setYears(reqYears.data);
    }
    if (reqRoomTypes.success) {
      setRoomTypes(reqRoomTypes.data);
    }
    if (req.success) {
      setReviews(req.data.content);
      setTotalPages(req.data.totalPages);
    } else {
      console.log(req.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  const columns = [
    {
      key: "maDanhGia",
      label: "ID",
      render: (row) => row.danhGia?.maDanhGia || "N/A",
    },
    {
      key: "diemSachSe",
      label: "Điểm sạch sẽ",
      render: (row) => row.danhGia?.diemSachSe || "N/A",
    },
    {
      key: "diemDichVu",
      label: "Điểm dịch vụ",
      render: (row) => row.danhGia?.diemDichVu || "N/A",
    },
    {
      key: "diemCoSoVatChat",
      label: "Điểm CSVC",
      render: (row) => row.danhGia?.diemCoSoVatChat || "N/A",
    },
    {
      key: "tinhTrang",
      label: "Tình trạng",
      render: (row) => {
        const status = row.danhGia?.tinhTrang;
        return status ? (
          <button
            onClick={() => handleEdit(row)}
            className="bg-green-400 text-white font-normal px-1 py-0.5 rounded-2xl"
          >
            đã duyệt
          </button>
        ) : (
          <button
            onClick={() => handleEdit(row)}
            className="bg-red-500 text-white font-normal px-1 py-0.5 rounded-2xl"
          >
            đã ẩn
          </button>
        );
      },
    },
    {
      key: "loaiPhong",
      label: "Loại phòng",
      render: (row) => row.loaiPhong?.tenLoaiPhong || "N/A",
    },
  ];

  const handleDetail = (item) => {
    setOpenDetail(true);
    setSelectedReview(item);
  };

  const handleEdit = (item) => {
    const editReview = async () => {
      const req = await put(
        `/api/admin/danhgia/update/${item.danhGia.maDanhGia}`
      );
      if (req.success) {
        setReviews(
          reviews.map((r) =>
            r.danhGia.maDanhGia === item.danhGia.maDanhGia
              ? {
                  ...r,
                  danhGia: { ...r.danhGia, tinhTrang: !item.danhGia.tinhTrang },
                }
              : r
          )
        );
      }
    };
    editReview();
  };

  function formatToDDMMYYYY_HHMM(dateInput) {
    const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(d.getTime())) return "";

    const pad = (n) => String(n).padStart(2, "0");

    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  return (
    <div className="p-6 space-y-4">
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Quản lý đánh giá
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Select
              value={filters.roomType}
              onValueChange={(value) =>
                setFilters({ ...filters, roomType: value })
              }
            >
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Lọc theo loại phòng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tất cả</SelectItem>
                {roomTypes.map((item) => (
                  <SelectItem key={item.maLoaiPhong} value={item.maLoaiPhong}>
                    {item.tenLoaiPhong}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.ratingType}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  ratingType: value,
                  ratingScore: ratingScoreMap[value],
                })
              }
            >
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Lọc theo trung bình đánh giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tất cả</SelectItem>
                <SelectItem value="GOOD" score="9">
                  Xuất Sắc ({">="} 9 sao)
                </SelectItem>
                <SelectItem value="QUITE-GOOD" score="8">
                  Tốt ({">="} 8 sao)
                </SelectItem>
                <SelectItem value="AVERAGE" score="7">
                  Trung Bình ({">="} 7 sao)
                </SelectItem>
                <SelectItem value="BAD" score="6">
                  Kém ({"<"} 6 sao)
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.month}
              onValueChange={(value) =>
                setFilters({ ...filters, month: value })
              }
            >
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Lọc theo tháng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tất cả</SelectItem>
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i} value={String(i + 1).padStart(2, "0")}>
                    Tháng {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.year}
              onValueChange={(value) => setFilters({ ...filters, year: value })}
            >
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Lọc theo năm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tất cả</SelectItem>
                {years.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={fetchReviews}
              className="flex items-center gap-2 bg-[var(--color-background)] text-[#fff] px-6 py-2 rounded-lg"
            >
              <Search size={20} /> Tìm kiếm
            </button>
          </div>

          <AdminTable
            data={reviews}
            columns={columns}
            renderActions={(item) => (
              <ActionButtons onView={() => handleDetail(item)} />
            )}
          />

          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={(p) => setCurrentPage(p)}
          />
        </CardContent>
      </Card>

      <DetailDialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        data={selectedReview}
        fields={[
          {
            key: "binhLuan",
            label: "Bình luận",
            render: (row) => row.danhGia?.binhLuan || "N/A",
          },
          {
            key: "thoiGianDanhGia",
            label: "Thời gian đánh giá",
            render: (row) =>
              formatToDDMMYYYY_HHMM(row.danhGia?.thoiGianDanhGia) || "N/A",
          },
          {
            key: "maKhachHang",
            label: "Mã khách hàng",
            render: (row) => row.danhGia?.maKhachHang || "Khách vãng lai",
          },
          {
            key: "hoTenKH",
            label: "Tên khách hàng",
            render: (row) => row.khachHang?.hoTenKH || "Khách vãng lai",
          },
          {
            key: "diemTong",
            label: "Điểm tổng",
            render: (row) => {
              return (
                (row.danhGia?.diemSachSe || 0) +
                  (row.danhGia?.diemDichVu || 0) +
                  (row.danhGia?.diemCoSoVatChat || 0) || "N/A"
              );
            },
          },
          {
            key: "maDatPhong",
            label: "Mã đặt phòng",
            render: (row) => row.donDatPhong?.maDatPhong || "N/A",
          },
          {
            key: "tongTienTT",
            label: "Tổng tiền thanh toán",
            render: (row) =>
              row.donDatPhong?.tongTienTT
                ? row.donDatPhong?.tongTienTT.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : "N/A",
          },
          {
            key: "loaiPhong",
            label: "Loại phòng",
            render: (row) => row.loaiPhong?.tenLoaiPhong || "N/A",
          },
          {
            key: "phong",
            label: "Phòng",
            render: (row) => row.phong?.maPhong || "N/A",
          },
        ]}
      />
    </div>
  );
}
