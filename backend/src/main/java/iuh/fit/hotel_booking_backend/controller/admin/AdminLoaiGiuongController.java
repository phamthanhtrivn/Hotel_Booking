package iuh.fit.hotel_booking_backend.controller.admin;

import iuh.fit.hotel_booking_backend.entity.LoaiGiuong;
import iuh.fit.hotel_booking_backend.service.LoaiGiuongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/loaigiuong")
public class AdminLoaiGiuongController {
    private LoaiGiuongService loaiGiuongService;

    public AdminLoaiGiuongController(LoaiGiuongService loaiGiuongService) {
        this.loaiGiuongService = loaiGiuongService;
    }

    @PostMapping
    public ResponseEntity<?> createLoaiGiuong(@RequestBody LoaiGiuong loaiGiuong) {
        return ResponseEntity.ok(loaiGiuongService.save(loaiGiuong));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLoaiGiuong(@PathVariable String id, @RequestBody LoaiGiuong loaiGiuong) {
        loaiGiuong.setMaGiuong(id);
        return ResponseEntity.ok(loaiGiuongService.update(loaiGiuong));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLoaiGiuong(@PathVariable String id) {
        return ResponseEntity.ok(loaiGiuongService.deleteById(id));
    }
}
