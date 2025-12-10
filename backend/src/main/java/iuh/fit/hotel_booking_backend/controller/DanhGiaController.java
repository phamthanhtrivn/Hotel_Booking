package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.DanhGia;
import iuh.fit.hotel_booking_backend.service.DanhGiaService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/danhgia")
public class DanhGiaController {
    private DanhGiaService danhGiaService;

    public DanhGiaController(DanhGiaService danhGiaService) {
        this.danhGiaService = danhGiaService;
    }

    @GetMapping("/findbyloaiphong/{id}")
    public ResponseEntity<APIResponse<Page<DanhGia>>> findByLoaiPhong(@PathVariable String id,
                                                                      @RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "10") int size) {
        APIResponse<Page<DanhGia>> response = new APIResponse<>();
        try {
            Page<DanhGia> danhGias = danhGiaService.findByLoaiPhong(id, page, size);
            response.setMessage("Lấy danh sách đánh giá thành công");
            response.setSuccess(true);
            response.setData(danhGias);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setSuccess(false);
            response.setMessage("Lỗi khi lấy đánh gía");
        }
        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }


    @GetMapping("/get-review-stats/{id}")
    public ResponseEntity<?> getReviewStatsByLoaiPhong(@PathVariable String id){
        return ResponseEntity.ok(danhGiaService.getReviewStats(id));
    }

    @GetMapping("/top-three-rating")
    public ResponseEntity<?> getTopThreeRatings() {
        return ResponseEntity.ok(danhGiaService.getTopThreeRatings());
    }
}
