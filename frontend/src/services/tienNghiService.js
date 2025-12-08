import api from "./api";

export const tienNghiService = {
  findAll: async () => {
    const result = await api.get(`/api/public/tiennghi`);
    return result.data;
  },
  findTienNghiByLoaiPhong: async (id) => {
    const result = await api.get(`/api/public/tiennghi/findbyloaiphong/${id}`);
    return result.data;
  }
};
