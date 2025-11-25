import api from "./api";

export const phongService = {
  search: async (page, size, filters) => {
    const result = await api.post(`/api/phong/search?page=${page}&size=${size}`, filters);
    return result.data;
  },
  update: async (phong) => {
    const result = await api.put(`/api/phong`, phong);
    return result.data;
  }
};
