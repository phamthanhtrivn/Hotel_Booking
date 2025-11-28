import { loaiPhongService } from "@/services/loaiPhongService";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/common/AdminTable";
import AdminPagination from "@/components/common/AdminPagination";
import ActionButtons from "@/components/common/ActionButtons";
import { Button } from "@/components/ui/button";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";
import EditCreateDialog from "@/components/common/EditCreateDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent, SelectGroup } from "@radix-ui/react-select";
import MDEditor from "@uiw/react-md-editor";
import { Trash2, Upload } from "lucide-react";
import DetailDialog from "@/components/common/DetailDialog";
import { toast } from "react-toastify";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { tienNghiService } from "@/services/tienNghiService";
import { loaiGiuongService } from "@/services/loaiGiuongService";
import BedSelector from "@/components/admin/room-type/BedSelector";
import { chiTietLoaiGiuongService } from "@/services/chiTietLoaiGiuongService";

const defaultForm = {
  maLoaiPhong: "",
  tenLoaiPhong: "",
  dienTich: null,
  soKhach: null,
  gia: null,
  moTa: "",
  tinhTrang: true,
};

const defaultFilters = {
  tenLoaiPhong: "",
  tinhTrang: "ALL",
  minDienTich: null,
  maxDienTich: null,
  minGia: null,
  maxGia: null,
  soKhach: null,
};

const RoomTypeManagement = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loaiPhongs, setLoaiPhongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState(defaultFilters);
  const [formData, setFormData] = useState(defaultForm);

  const [oldImages, setOldImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isEditModal, setShowEditModal] = useState(false);
  const [isDetailModal, setShowDetailModal] = useState(false);
  const [currentRoomType, setCurrentRoomType] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [tienNghis, setTienNghis] = useState([]);
  const [idDelete, setIdDelete] = useState("");
  const [selectedTienNghis, setSelectedTienNghis] = useState([]);
  const [beds, setBeds] = useState([]);
  const [selectedBeds, setSelectedBeds] = useState([]);
  // ============================ FETCH ===============================
  const fetchTienNghi = async () => {
    try {
      const result = await tienNghiService.findAll();
      setTienNghis(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBeds = async () => {
    const res = await loaiGiuongService.getAll();
    setBeds(res.data || []);
  };

  const fetchSelectedBeds = async (id) => {
    try {
      const res = await chiTietLoaiGiuongService.findByLoaiPhong(id);
      console.log("Chi tiết giường nhận được:", res);

      const mappedBeds = res.map((item) => ({
        maGiuong: item.maGiuong,
        soGiuong: item.soGiuong || 1,
      }));

      setSelectedBeds(mappedBeds);
    } catch (e) {
      console.error("Lỗi fetch giường:", e);
      setSelectedBeds([]);
    }
  };

  const fetchSelectedTienNghi = async (id) => {
    try {
      const result = await tienNghiService.findTienNghiByLoaiPhong(id);
      setSelectedTienNghis(result.data.map((t) => t.maTienNghi));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLoaiPhong = async () => {
    try {
      const payload = {
        ...filters,
        tinhTrang: filters.tinhTrang === "ALL" ? null : filters.tinhTrang,
      };

      const result = await loaiPhongService.search(currentPage, 10, payload);
      setLoaiPhongs(result.content);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLoaiPhong();
    fetchTienNghi();
    fetchBeds();
  }, [currentPage]);

  // ============================ FILTER ================================
  const handleChangeFilters = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // ============================ OPEN / CLOSE MODAL =====================
  const resetFormData = () => {
    setFormData(defaultForm);
    setOldImages([]);
    setFiles([]);
    setEdit(false);
    setSelectedBeds([]);
    setSelectedTienNghis([]);
  };

  const onOpenAdd = () => {
    resetFormData();
    setShowEditModal(true);
  };

  const onOpenDetail = (roomType) => {
    setShowDetailModal(true);
    setCurrentRoomType(roomType);
  };

  const onOpenEdit = async (item) => {
    resetFormData();
    setEdit(true);
    setFormData({
      maLoaiPhong: item.maLoaiPhong,
      tenLoaiPhong: item.tenLoaiPhong,
      dienTich: item.dienTich,
      soKhach: item.soKhach,
      gia: item.gia,
      moTa: item.moTa,
      tinhTrang: item.tinhTrang,
    });
    await fetchSelectedTienNghi(item.maLoaiPhong);
    await fetchSelectedBeds(item.maLoaiPhong);
    setOldImages(item.hinhAnh || []);
    setShowEditModal(true);
  };

  const onClose = () => {
    resetFormData();
    setLoading(false);
    setShowEditModal(false);
  };

  const onDelete = (id) => {
    setIdDelete(id);
    setOpenDelete(true);
  };

  const handleOnDelete = async () => {
    try {
      const result = await loaiPhongService.delete(idDelete);
      console.log(result);
      result.success
        ? toast.success(`Xóa loại phòng ${result.data} thành công!`)
        : toast.error(`Xóa loại phòng ${result.data} không thành công!`);
      setOpenDelete(false);
      setIdDelete("");
      fetchLoaiPhong();
    } catch (e) {
      toast.error("Lỗi khi xóa " + e);
    }
  };
  // ============================ ON CHANGE =====================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // xử lý number
    const numericFields = ["dienTich", "soKhach", "gia"];

    const newValue = numericFields.includes(name)
      ? value === ""
        ? null
        : Number(value)
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  // ============================ FILE =====================
  const handleFileChange = (e) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const handleRemoveFile = (index) => {
    URL.revokeObjectURL(files[index].url);
    setFiles(files.filter((_, idx) => idx !== index));
  };

  const handleRemoveOldImage = (index) => {
    setOldImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ============================ SUBMIT ===============================
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const fd = new FormData();

      fd.append(
        "tienNghiIds",
        new Blob([JSON.stringify(selectedTienNghis)], {
          type: "application/json",
        })
      );

      fd.append(
        "loaiPhong",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );

      fd.append(
        "chiTietGiuongs",
        new Blob([JSON.stringify(selectedBeds)], { type: "application/json" })
      );

      fd.append(
        "oldImages",
        new Blob([JSON.stringify(oldImages)], { type: "application/json" })
      );

      files.forEach((f) => fd.append("images", f.file));

      edit ? await loaiPhongService.update(fd) : await loaiPhongService.add(fd);

      fetchLoaiPhong();
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      console.error("Save error:", err);
    }
  };
  // ============================ RENDER ===============================

  const columns = [
    { key: "maLoaiPhong", label: "ID" },
    { key: "hinhAnh", label: "Hình ảnh" },
    { key: "tenLoaiPhong", label: "Tên loại phòng" },
    { key: "dienTich", label: "Diện tích" },
    { key: "soKhach", label: "Khách" },
    { key: "gia", label: "Giá / đêm" },
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
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex justify-between">
            Quản lý loại phòng
            <Button className="rounded-2xl bg-blue-600" onClick={onOpenAdd}>
              Thêm loại phòng
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between">
            <div className="flex items-center gap-2">
              <AdminInput
                label="Tên loại phòng"
                type="text"
                placeholder="Nhập tên loại phòng...."
                value={filters.tenLoaiPhong}
                onChange={(v) => handleChangeFilters("tenLoaiPhong", v)}
              />
              <AdminSelect
                label="Active"
                className="w-40"
                value={filters.tinhTrang}
                onChange={(v) => handleChangeFilters("tinhTrang", v)}
                options={[
                  { label: "Tất cả", value: "ALL" },
                  { label: "Hoạt động", value: true },
                  { label: "Không hoạt động", value: false },
                ]}
              />
              <AdminInput
                label="Diện tích tối thiểu"
                className="w-30"
                type="area"
                min={1}
                value={filters.minDienTich}
                onChange={(v) => handleChangeFilters("minDienTich", v)}
              />
              -
              <AdminInput
                label="Diện tích tối đa"
                className="w-30"
                type="area"
                min={1}
                value={filters.maxDienTich}
                onChange={(v) => handleChangeFilters("maxDienTich", v)}
              />
              <AdminInput
                label="Gía tối thiểu"
                className="w-30"
                type="currency"
                value={filters.minGia ? filters.minGia / 1000 : ""}
                onChange={(v) =>
                  handleChangeFilters("minGia", v ? v * 1000 : null)
                }
              />
              -
              <AdminInput
                label="Giá tối đa"
                className="w-30"
                type="currency"
                value={filters.maxGia ? filters.maxGia / 1000 : ""}
                onChange={(v) =>
                  handleChangeFilters("maxGia", v ? v * 1000 : null)
                }
              />
              <AdminInput
                label="Số khách"
                className="w-25"
                type="number"
                min={1}
                value={filters.soKhach}
                onChange={(v) => handleChangeFilters("soKhach", v)}
              />
              <Button
                className="rounded-2xl bg-blue-600"
                onClick={fetchLoaiPhong}
              >
                Tìm kiếm
              </Button>
            </div>
          </div>

          <AdminTable
            data={loaiPhongs}
            columns={columns}
            renderActions={(item) => (
              <ActionButtons
                canDelete={item.canDelete}
                onEdit={() => onOpenEdit(item)}
                onView={() => onOpenDetail(item)}
                onDelete={() => {
                  onDelete(item.maLoaiPhong);
                }}
              />
            )}
          />
        </CardContent>
        <AdminPagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onChange={(p) => setCurrentPage(p - 1)}
        />
      </Card>

      <DetailDialog
        data={currentRoomType}
        open={isDetailModal}
        fields={[
          { key: "maLoaiPhong", label: "ID" },
          { key: "hinhAnh", label: "Hình ảnh" },
          { key: "tenLoaiPhong", label: "Tên loại phòng" },
          { key: "dienTich", label: "Diện tích" },
          { key: "soKhach", label: "Khách" },
          { key: "gia", label: "Giá / đêm" },
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
          { key: "moTa", label: "Mô tả" },
        ]}
        onClose={() => setShowDetailModal(false)}
      />

      <EditCreateDialog
        loading={loading}
        onSubmit={handleSubmit}
        className="max-h-screen overflow-y-auto hide-scrollbar"
        title="Cập nhật loại phòng"
        open={isEditModal}
        onClose={onClose}
      >
        <div className="space-y-4 grid grid-cols-2 gap-3">
          {/* Loại phòng */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              Tên loại phòng
            </label>
            <Input
              name="tenLoaiPhong"
              value={formData.tenLoaiPhong}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Giá</label>
            <Input
              name="gia"
              value={formData.gia}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Diện tích</label>
            <Input
              name="dienTich"
              value={formData.dienTich}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Khách tối đa
            </label>
            <Input
              name="soKhach"
              value={formData.soKhach}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Active</label>
            <Select
              name="tinhTrang"
              value={formData.tinhTrang ? "true" : "false"}
              onValueChange={(v) =>
                setFormData((prev) => ({ ...prev, tinhTrang: v === "true" }))
              }
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true">Hoạt động</SelectItem>
                  <SelectItem value="false">Không hoạt động</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              Loại giường
            </label>
            <BedSelector
              allBeds={beds}
              value={selectedBeds}
              onChange={(list) => setSelectedBeds(list)}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Tiện nghi</label>
            <MultiSelect
              values={selectedTienNghis}
              onValuesChange={(newValues) => setSelectedTienNghis(newValues)}
            >
              <MultiSelectTrigger className="w-full">
                <MultiSelectValue placeholder="Chọn tiện nghi" />
              </MultiSelectTrigger>
              <MultiSelectContent>
                <MultiSelectGroup>
                  {tienNghis.map((item) => (
                    <MultiSelectItem
                      key={item.maTienNghi}
                      value={item.maTienNghi}
                    >
                      {item.tenTienNghi}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Mô tả</label>
            <MDEditor
              className="w-full"
              name="moTa"
              value={formData.moTa}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  moTa: val || "",
                })
              }
              preview="edit"
              hideToolbar={false}
            />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label className="font-medium">Hình ảnh</label>

            <label className="flex items-center justify-center gap-2 cursor-pointer px-4 py-2 rounded-md border w-[200px]">
              Tải lên hình ảnh <Upload size={18} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>

            <div className="mt-2 flex flex-col gap-1">
              {/* ẢNH CŨ */}
              {oldImages.length > 0 && (
                <div className="mt-2 flex flex-col gap-1">
                  {oldImages.map((img, index) => (
                    <div
                      key={img}
                      className="flex flex-row items-center justify-between px-3 py-1 border rounded-md"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <img src={img} className="w-[60px] h-[50px]" />
                        <span className="text-sm">{img.split("/").pop()}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveOldImage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {files.map((file, index) => (
                <div
                  key={file.file.name + index}
                  className="flex flex-row items-center justify-between px-3 py-1 border rounded-md"
                >
                  <div className="flex flex-row items-center gap-2">
                    <img src={file.url} alt="" className="w-[60px] h-[50px]" />
                    <span className="text-sm">{file.file.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EditCreateDialog>
      <ConfirmDeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleOnDelete}
      />
    </div>
  );
};

export default RoomTypeManagement;
