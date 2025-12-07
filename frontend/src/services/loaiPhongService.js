import api from "./api";

export const loaiPhongService = {
  search: async (page = 0, size = 10, filters) => {
    const result = await api.post(
      `/api/admin/loaiphong/find-conditions?page=${page}&size=${size}`,
      filters,
      {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return result.data;
  },
  add: async (formData) => {
    const result = await api.post("/api/admin/loaiphong", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
  update: async (formData) => {
    const result = await api.put(`/api/admin/loaiphong`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
  findById: async (id) => {
    const result = await api.get(`/api/public/loaiphong/${id}`);
    return result.data;
  },
  getForDropdown: async () => {
    const result = await api.get(`/api/public/loaiphong/get-dropdown`);
    return result.data;
  },
  delete: async (id) => {
    const result = await api.delete(`/api/admin/loaiphong/${id}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    });
    return result.data;
  },
};
