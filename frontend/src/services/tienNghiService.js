import api from "./api";

export const tienNghiService = {
  findAll: async () => {
    const result = await api.get(`/api/tiennghi`);
    return result.data;
  },
  findTienNghiByLoaiPhong: async (id) => {
    const result = await api.get(`/api/tiennghi/findbyloaiphong/${id}`);
    return result.data;
  }
};
