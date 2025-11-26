import api from "./api";

export const loaiPhongService = {
  search: async (page = 0, size = 10, filters) => {
    const result = await api.post(
      `/api/loaiphong/find-conditions?page=${page}&size=${size}`,
      filters
    );
    return result.data;
  },
  add: async (formData) => {
    const result = await api.post("/api/loaiphong", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result.data;
  },
  update: async (formData) => {
    const result = await api.put(`/api/loaiphong`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result.data;
  },
  findById: async (id) => {
    const result = await api.get(`/api/loaiphong/${id}`);
    return result.data;
  },
  getForDropdown: async () => {
    const result = await api.get(`/api/loaiphong/get-dropdown`);
    return result.data;
  },
  delete: async (id) => {
    const result = await api.delete(`http://localhost:8080/api/loaiphong/${id}`);
    return result.data;
  }
};
