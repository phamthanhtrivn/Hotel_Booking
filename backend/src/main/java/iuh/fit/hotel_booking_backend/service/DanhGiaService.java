package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.DanhGia;
import iuh.fit.hotel_booking_backend.repository.DanhGiaRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DanhGiaService {
    private DanhGiaRepository repo;

    public DanhGiaService(DanhGiaRepository repo) {
        this.repo = repo;
    }

    public List<DanhGia> getAll() {
        return repo.findAll();
    }

    public List<DanhGia> findByLoaiPhong(String id){
        return repo.findByLoaiPhong(id);
    }

    public DanhGia getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public DanhGia save(DanhGia danhGia) {
        return repo.save(danhGia);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }

    public APIResponse<Object> getTopThreeRatings() {
        APIResponse<Object> response = new APIResponse<>();
        response.setData(null);
        try {
            Pageable top3 = PageRequest.of(0, 3);
            List<DanhGia> topThreeRatings = repo.findTop3ByLoaiPhongOrderByRatingDesc(top3);
            response.setData(topThreeRatings);
            response.setSuccess(true);
            response.setMessage("Lấy danh sách đánh giá thành công");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setSuccess(false);
            response.setMessage("Lỗi khi lấy đánh giá");
        }
        return response;
    }
}
