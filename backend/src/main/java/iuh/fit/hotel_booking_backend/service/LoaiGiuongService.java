package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.LoaiGiuong;
import iuh.fit.hotel_booking_backend.repository.LoaiGiuongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoaiGiuongService {
    private LoaiGiuongRepository repo;

    public LoaiGiuongService(LoaiGiuongRepository repo) {
        this.repo = repo;
    }

    public APIResponse<List<LoaiGiuong>> getAll() {
        APIResponse<List<LoaiGiuong>> apiResponse = new APIResponse<>();
        List<LoaiGiuong> loaiGiuongs = repo.findAll();
        apiResponse.setData(loaiGiuongs);
        apiResponse.setSuccess(true);
        apiResponse.setMessage("Lấy loại giường thành công");
        return apiResponse;
    }
    public APIResponse<List<LoaiGiuong>> findByMaLoaiPhong(String maLoaiPhong) {
        APIResponse<List<LoaiGiuong>> apiResponse = new APIResponse<>();
        List<LoaiGiuong> loaiGiuongs = repo.findByMaLoaiPhong(maLoaiPhong);
        apiResponse.setData(loaiGiuongs);
        apiResponse.setSuccess(true);
        apiResponse.setMessage("Lấy loại giường thành công");
        return apiResponse;
    }

    public LoaiGiuong getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public LoaiGiuong save(LoaiGiuong loaiGiuong) {
        return repo.save(loaiGiuong);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
