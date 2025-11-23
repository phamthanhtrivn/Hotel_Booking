import api from "./api";

export const loaiPhongService = {
  findAllPaged: async (page = 0, size = 7) => {
    const result = await api.get("/api/loaiphong/paged", {
      params: { page, size },
    });
    return result.data;
  },
  add: async (formData) => {
    const result = await api.post("/api/loaiphong", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result.data;
  },
  update: async (formData)  =>  {
    const result = await api.put(`/api/loaiphong`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result.data;
  },
  findById: async (id) => {
    const result = await api.get(`/api/loaiphong/${id}`);
    return result.data;
  },
  search: async (req) => {
    return api.post(`/api/loaiphong/search`, req).then(res => res.data)
  }
};
