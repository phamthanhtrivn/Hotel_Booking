import api from "./api";

export const phongService = {
  search: async (page, size, filters) => {
    const result = await api.post(
      `/api/admin/phong/search?page=${page}&size=${size}`,
      filters,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return result.data;
  },
  update: async (phong) => {
    const result = await api.put(`/api/admin/phong`, phong, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
};
