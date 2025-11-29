/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AdminPagination from "@/components/common/AdminPagination";
import AdminTable from "@/components/common/AdminTable";
import DetailDialog from "@/components/common/DetailDialog";
import EditCreateDialog from "@/components/common/EditCreateDialog";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";
import ActionButtons from "@/components/common/ActionButtons";

const AmenityManagement = () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const [amenities, setAmenities] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    icon: "",
    status: true,
  });
  const rowsPerPage = 10;
  const [nameError, setNameError] = useState("");

  const fetchAmenities = async () => {
    try {
      const res = await axios.get(baseUrl + "/api/tiennghi");
      if (res.data.success) {
        setAmenities(res.data.data);
      } else {
        toast.info(res.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi tải tiện nghi:", error);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleSaveAndUpdate = async () => {
    if (!currentAmenity) {
      const nameRegex = /^[\p{L}]+(\s[\p{L}]+)*$/u;
      if (!formData.name.match(nameRegex)) {
        setNameError("Tên tiện nghi không hợp lệ");
        return;
      }
    }

    setNameError("");
    try {
      if (currentAmenity) {
        const res = await axios.put(
          `${baseUrl}/api/tiennghi/${currentAmenity.maTienNghi}`,
          {
            tenTienNghi: formData.name,
            tinhTrang: formData.status,
            icon: formData.icon,
            loaiTienNghi: formData.type,
          }
        );
        if (res.data.success) {
          setAmenities((prev) =>
            prev.map((a) =>
              a.maTienNghi === currentAmenity.maTienNghi ? res.data.data : a
            )
          );
          toast.success("Cập nhật tiện nghi thành công");
        } else {
          toast.info(res.data.message);
        }
      } else {
        const res = await axios.post(`${baseUrl}/api/tiennghi`, {
          tenTienNghi: formData.name,
          tinhTrang: formData.status,
          icon: formData.icon,
          loaiTienNghi: formData.type,
        });
        if (res.data.success) {
          setAmenities((prev) => [...prev, res.data.data]);
          toast.success("Thêm tiện nghi thành công");
        } else {
          toast.info(res.data.message);
        }
      }
      setOpenModal(false);
    } catch (error) {
      console.error("Lỗi khi lưu tiện nghi:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/tiennghi/${currentAmenity.maTienNghi}`
      );
      if (res.data.success) {
        toast.success("Xóa tiện nghi thành công");
        setAmenities((prev) =>
          prev.filter((a) => a.maTienNghi !== currentAmenity.maTienNghi)
        );
      } else {
        toast.info(res.data.message);
      }

      setOpenDelete(false);
    } catch (error) {
      console.error("Lỗi khi xóa tiện nghi:", error);
    }
  };

  const handleAdd = () => {
    setCurrentAmenity(null);
    setFormData({ name: "", type: "", icon: "", status: true });
    setOpenModal(true);
  };

  const handleEdit = (item) => {
    setCurrentAmenity(item);
    setFormData({
      name: item.tenTienNghi || "",
      status: item.tinhTrang ?? true,
      icon: item.icon || "",
      type: item.loaiTienNghi || "",
    });
    setOpenModal(true);
  };

  const handleDetail = (item) => {
    setCurrentAmenity(item);
    setOpenDetail(true);
  };

  const handleDelete = (item) => {
    setCurrentAmenity(item);
    setOpenDelete(true);
  };

  const filtered = amenities
    .filter((a) => a.tenTienNghi.toLowerCase().includes(search.toLowerCase()))
    .filter((a) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "true") return a.tinhTrang === true;
      if (statusFilter === "false") return a.tinhTrang === false;
    });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayedAmenities = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    { key: "maTienNghi", label: "ID" },
    { key: "tenTienNghi", label: "Tên tiện nghi" },
    { key: "loaiTienNghi", label: "Loại tiện nghi" },
    {
      key: "tinhTrang",
      label: "Tình trạng",
      render: (i) => (
        <span
          className={
            i.tinhTrang ? "text-green-600 italic" : "text-red-600 italic"
          }
        >
          {i.tinhTrang ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Quản lý tiện nghi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="w-[90%] flex items-center gap-3">
              <Input
                placeholder="Tìm kiếm tiện nghi theo tên..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="max-w-xs"
              />

              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="Lọc theo tình trạng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="true">Hoạt động</SelectItem>
                  <SelectItem value="false">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleAdd}
              className="rounded-2xl bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Thêm tiện nghi
            </Button>
          </div>

          {/* TABLE */}
          <AdminTable
            columns={columns}
            data={displayedAmenities}
            renderActions={(item) => (
              <ActionButtons
                onView={() => handleDetail(item)}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item)}
                canDelete={true}
              />
            )}
          />

          {/* PAGINATION */}
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={(p) => setCurrentPage(p)}
          />
        </CardContent>
      </Card>

      {/* DETAIL */}
      <DetailDialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        data={currentAmenity}
        fields={[
          { key: "maTienNghi", label: "ID" },
          { key: "tenTienNghi", label: "Tên tiện nghi" },
          {
            key: "tinhTrang",
            label: "Tình trạng",
            render: (d) => (d?.tinhTrang ? "Hoạt động" : "Không hoạt động"),
          },
        ]}
      />

      {/* DELETE */}
      <ConfirmDeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* EDIT / CREATE */}
      <EditCreateDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={currentAmenity ? "Cập nhật tiện nghi" : "Thêm tiện nghi"}
        onSubmit={handleSaveAndUpdate}
      >
        <div className="space-y-3">
          <div className="mb-2">
            Tên tiện nghi <span className="text-red-600">*</span>
          </div>
          <Input
            value={formData.name}
            placeholder="Tên tiện nghi..."
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {nameError && (
            <div className="text-red-600 text-sm mt-1">{nameError}</div>
          )}
          <div className="mt-3">
            <label>Loại tiện nghi</label>
            <Select
              value={String(formData.type)}
              onValueChange={(v) => setFormData({ ...formData, type: v })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mạng Internet và điện thoại">
                  Mạng Internet và điện thoại
                </SelectItem>
                <SelectItem value="Nhà tắm">Nhà tắm</SelectItem>
                <SelectItem value="Đồ nội thất">Đồ nội thất</SelectItem>
                <SelectItem value="Đồ điện tử">Đồ điện tử</SelectItem>
                <SelectItem value="Hình ảnh/âm thanh">
                  Hình ảnh/âm thanh
                </SelectItem>
                <SelectItem value="Khu vực ngoài trời">
                  Khu vực ngoài trời
                </SelectItem>
                <SelectItem value="Khác">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {currentAmenity && (
            <div className="mt-3">
              <label>Trạng thái</label>
              <Select
                value={String(formData.status)}
                onValueChange={(v) =>
                  setFormData({ ...formData, status: v === "true" })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Hoạt động</SelectItem>
                  <SelectItem value="false">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </EditCreateDialog>
    </div>
  );
};

export default AmenityManagement;
