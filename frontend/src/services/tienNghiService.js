import api from "./api";

export const tienNghiService = {
  findTienNghiByLoaiPhong: async (id) => {
    const result = await api.get(`/api/tiennghi/findbyloaiphong/${id}`);
    return result.data;
  }
};
