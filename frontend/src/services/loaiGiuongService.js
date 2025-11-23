// /api/loaigiuong
import api from "./api";

export const loaiGiuongService = {
  getAll: async () => {
    const result = await api.get(`/api/loaigiuong`);
    return result.data;
  },
  findByLoaiPhong: async (id) => {
    const result = await api.get(`/api/loaigiuong/findByLoaiPhong/${id}`);
    return result.data;
  }
};
