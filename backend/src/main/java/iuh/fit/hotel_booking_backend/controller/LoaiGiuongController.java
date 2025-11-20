package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.entity.LoaiGiuong;
import iuh.fit.hotel_booking_backend.service.LoaiGiuongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loaigiuong")
public class LoaiGiuongController {
    private LoaiGiuongService loaiGiuongService;

    public LoaiGiuongController(LoaiGiuongService loaiGiuongService) {
        this.loaiGiuongService = loaiGiuongService;
    }

    @GetMapping
    public ResponseEntity<?> getAllLoaiGiuong() {
        return ResponseEntity.ok(loaiGiuongService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {
        return ResponseEntity.ok(loaiGiuongService.getById(id));
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
