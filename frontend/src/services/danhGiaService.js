import api from "./api";

export const danhGiaService = {
  findByLoaiPhong: async (id) => {
    const result = await api.get(`/api/danhgia/findbyloaiphong/${id}`);
    return result.data;
  }
};
