import api from "./api";

export const danhGiaService = {
  findByLoaiPhong: async (id, page, size) => {
    const result = await api.get(`/api/public/danhgia/findbyloaiphong/${id}?page=${page}&size=${size}`);
    return result.data;
  },
  getReviewStats: async (id) => {
    const result = await api.get(`/api/public/danhgia/get-review-stats/${id}`);
    return result.data;
  }
};
