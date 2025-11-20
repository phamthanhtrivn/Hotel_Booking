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
import { Textarea } from "@/components/ui/textarea";

const BedTypeManagement = () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const [bedTypes, setBedTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [currentBedType, setCurrentBedType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: true,
  });
  const rowsPerPage = 10;
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const fetchBedTypes = async () => {
    try {
      const res = await axios.get(baseUrl + "/api/loaigiuong");

      if (res.data.success) {
        setBedTypes(res.data.data);
      } else {
        toast.info(res.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi tải loại giường:", error);
    }
  };

  useEffect(() => {
    fetchBedTypes();
  }, []);

  const handleSaveAndUpdate = async () => {
    let valid = true;

    setNameError("");
    setDescriptionError("");

    if (!currentBedType) {
      const nameRegex = /^[\p{L}]+(\s[\p{L}]+)*$/u;
      if (!formData.name.match(nameRegex)) {
        setNameError(
          "Tên giường không hợp lệ (3-50 ký tự, chữ/số/khoảng trắng)"
        );
        valid = false;
      }

      if (!formData.description.match(nameRegex)) {
        setDescriptionError(
          "Mô tả không hợp lệ (không được để trống, tối đa 200 ký tự)"
        );
        valid = false;
      }
    }

    if (!valid) return;
    try {
      if (currentBedType) {
        const res = await axios.put(
          `${baseUrl}/api/loaigiuong/${currentBedType.maGiuong}`,
          {
            tenGiuong: formData.name,
            moTa: formData.description,
            tinhTrang: formData.status,
          }
        );

        if (res.data.success) {
          setBedTypes((prev) =>
            prev.map((i) =>
              i.maGiuong === currentBedType.maGiuong ? res.data.data : i
            )
          );
          toast.success("Cập nhật loại giường thành công");
        } else {
          toast.info(res.data.message);
        }
      } else {
        const res = await axios.post(`${baseUrl}/api/loaigiuong`, {
          tenGiuong: formData.name,
          moTa: formData.description,
        });

        if (res.data.success) {
          setBedTypes((prev) => [...prev, res.data.data]);
          toast.success("Thêm loại giường thành công");
        } else {
          toast.info(res.data.message);
        }
      }

      setOpenModal(false);
    } catch (error) {
      console.error("Lỗi khi lưu loại giường:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/loaigiuong/${currentBedType.maGiuong}`
      );

      if (res.data.success) {
        toast.success("Xóa loại giường thành công");
        setBedTypes((prev) =>
          prev.filter((i) => i.maGiuong !== currentBedType.maGiuong)
        );
      } else {
        toast.info(res.data.message);
      }

      setOpenDelete(false);
    } catch (error) {
      console.error("Lỗi khi xóa loại giường:", error);
    }
  };

  const handleAdd = () => {
    setCurrentBedType(null);
    setFormData({ name: "", description: "", status: true });
    setOpenModal(true);
  };

  const handleEdit = (item) => {
    setCurrentBedType(item);
    setFormData({
      name: item.tenGiuong || "",
      description: item.moTa || "",
      status: item.tinhTrang ?? true,
    });
    setOpenModal(true);
  };

  const handleDetail = (item) => {
    setCurrentBedType(item);
    setOpenDetail(true);
  };

  const handleDelete = (item) => {
    setCurrentBedType(item);
    setOpenDelete(true);
  };

  const filtered = bedTypes
    .filter((i) => i.tenGiuong.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "true") return i.tinhTrang === true;
      if (statusFilter === "false") return i.tinhTrang === false;
    });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    { key: "maGiuong", label: "ID" },
    { key: "tenGiuong", label: "Tên giường" },
    { key: "moTa", label: "Mô tả" },
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
            Quản lý loại giường
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="w-[90%] flex items-center gap-3">
              <Input
                placeholder="Tìm kiếm theo tên giường..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="max-w-xs"
              />

              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v);
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
              Thêm loại giường
            </Button>
          </div>

          {/* TABLE */}
          <AdminTable
            columns={columns}
            data={displayed}
            renderActions={(item) => (
              <ActionButtons
                onView={() => handleDetail(item)}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item)}
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
        data={currentBedType}
        fields={[
          { key: "maGiuong", label: "ID" },
          { key: "tenGiuong", label: "Tên giường" },
          { key: "moTa", label: "Mô tả" },
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

      {/* ADD / EDIT */}
      <EditCreateDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={currentBedType ? "Cập nhật loại giường" : "Thêm loại giường"}
        onSubmit={handleSaveAndUpdate}
      >
        <div className="space-y-3">
          <div className="mb-2">
            Tên giường <span className="text-red-600">*</span>
          </div>
          <Input
            value={formData.name}
            placeholder="Tên giường..."
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {nameError && (
            <div className="text-red-600 text-sm mt-1">{nameError}</div>
          )}

          <div className="mb-2 mt-4">
            Mô tả <span className="text-red-600">*</span>
          </div>
          <Textarea
            value={formData.description}
            placeholder="Mô tả..."
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {descriptionError && (
            <div className="text-red-600 text-sm mt-1">{descriptionError}</div>
          )}

          {currentBedType && (
            <div className="mt-3">
              <label>Trạng thái:</label>
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

export default BedTypeManagement;
