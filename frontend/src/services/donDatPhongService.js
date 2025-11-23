import api from "./api";

export const donDatPhongService = {
  datPhong: async (datPhongRequest) => {
    const result = await api.post(`/api/dondatphong/create`, datPhongRequest);
    return result.data;
  }
};
