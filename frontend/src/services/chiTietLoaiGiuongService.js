import api from "./api";

export const chiTietLoaiGiuongService = {
  findByLoaiPhong: async (maLoaiPhong) => {
    const result = await api.get(`/api/chitietloaigiuong/loai-phong/${maLoaiPhong}`);
    return result.data;
  }
};
