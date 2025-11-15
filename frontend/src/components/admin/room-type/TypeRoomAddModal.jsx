import EditModal from "../Modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TypeRoomAddModal({
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    maLoaiPhong: initialData?.maLoaiPhong || "",
    tenLoaiPhong: initialData?.tenLoaiPhong || "",
    gia: initialData?.gia || "",
    dienTich: initialData?.dienTich || "",
    soKhach: initialData?.soKhach || "",
    moTa: initialData?.moTa || "",
  });

  const [oldImages, setOldImages] = useState(initialData?.hinhAnh || []);
  const [files, setFiles] = useState([]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveOldImage = (index) => {
    setOldImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append(
      "loaiPhong",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    fd.append(
      "oldImages",
      new Blob([JSON.stringify(oldImages)], { type: "application/json" })
    );

    files.forEach((f) => fd.append("photos", f.file));

    onSubmit(fd);
  };

  return (
    <EditModal title="Thêm Loại Phòng" onClose={onClose}>
      <div className="flex flex-col gap-3">
        {/* Grid 1 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Tên loại phòng</label>
            <Input
              type="text"
              name="tenLoaiPhong"
              value={formData.tenLoaiPhong}
              onChange={handleInputChange}
              placeholder="Ví dụ: Standard Twin"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Giá</label>
            <Input
              type="number"
              name="gia"
              value={formData.gia}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Grid 2 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Diện tích</label>
            <Input
              type="number"
              name="dienTich"
              value={formData.dienTich}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Số khách</label>
            <Input
              type="number"
              name="soKhach"
              value={formData.soKhach}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-1">
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

        {/* Mô tả */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Mô tả</label>
          <Textarea
            name="moTa"
            value={formData.moTa}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end mt-5">
        <Button className="bg-gray-500" onClick={onClose}>
          Hủy
        </Button>
        <Button
          className="bg-[var(--color-primary)] text-white"
          onClick={handleSubmit}
        >
          {initialData ? "Cập nhật" : "Thêm"}
        </Button>
      </div>
    </EditModal>
  );
}