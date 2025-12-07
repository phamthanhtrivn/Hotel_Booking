package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.DanhGia;
import iuh.fit.hotel_booking_backend.service.DanhGiaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/public/danhgia")
public class DanhGiaController {
    private DanhGiaService danhGiaService;

    public DanhGiaController(DanhGiaService danhGiaService) {
        this.danhGiaService = danhGiaService;
    }

    @GetMapping("/findbyloaiphong/{id}")
    public ResponseEntity<APIResponse<List<DanhGia>>> findByLoaiPhong(@PathVariable String id){
        APIResponse<List<DanhGia>> response = new APIResponse<>();
        try{
            List<DanhGia> danhGias = danhGiaService.findByLoaiPhong(id);
            response.setMessage("Lấy danh sách đánh giá thành công");
            response.setSuccess(true);
            response.setData(danhGias);
        }catch (Exception e){
            System.out.println(e.getMessage());
            response.setSuccess(false);
            response.setMessage("Lỗi khi lấy đánh gía");
        }
        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }


    @GetMapping("/top-three-rating")
    public ResponseEntity<?> getTopThreeRatings() {
        return ResponseEntity.ok(danhGiaService.getTopThreeRatings());
    }
}
