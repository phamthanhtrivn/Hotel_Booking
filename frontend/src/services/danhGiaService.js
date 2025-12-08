import api from "./api";

export const danhGiaService = {
  findByLoaiPhong: async (id) => {
    const result = await api.get(`/api/public/danhgia/findbyloaiphong/${id}`);
    return result.data;
  }
};
