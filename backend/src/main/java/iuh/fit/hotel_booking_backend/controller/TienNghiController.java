package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.TienNghi;
import iuh.fit.hotel_booking_backend.service.TienNghiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/tiennghi")
public class TienNghiController {
    private TienNghiService tienNghiService;

    public TienNghiController(TienNghiService tienNghiService) {
        this.tienNghiService = tienNghiService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTienNghi() {
        return ResponseEntity.ok(tienNghiService.getAll());
    }

    @GetMapping("/findbyloaiphong/{id}")
    public ResponseEntity<APIResponse<List<TienNghi>>> findByLoaiPhong(@PathVariable String id) {
        APIResponse<List<TienNghi>> response = new APIResponse<>();
        try {
            List<TienNghi> tienNghis = tienNghiService.getByLoaiPhong(id);
            response.setData(tienNghis);
            response.setMessage("Lấy tiện nghi thành công!");
            response.setSuccess(true);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Lỗi trong khi lấy tiện nghi!");
        }
        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {
        return ResponseEntity.ok(tienNghiService.getById(id));
    }

}
