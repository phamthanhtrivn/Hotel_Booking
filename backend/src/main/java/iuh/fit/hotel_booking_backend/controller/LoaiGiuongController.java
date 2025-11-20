package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.LoaiGiuong;
import iuh.fit.hotel_booking_backend.service.LoaiGiuongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/loaigiuong")
public class LoaiGiuongController {
    private LoaiGiuongService loaiGiuongService;

    public LoaiGiuongController(LoaiGiuongService loaiGiuongService) {
        this.loaiGiuongService = loaiGiuongService;
    }

    @GetMapping
    public ResponseEntity<APIResponse<List<LoaiGiuong>>> getAll() {
        return ResponseEntity.ok(loaiGiuongService.getAll());
    }

    @GetMapping("/findByLoaiPhong/{id}")
    public ResponseEntity<APIResponse<List<LoaiGiuong>>> getAll(@PathVariable String id) {
        return ResponseEntity.ok(loaiGiuongService.findByMaLoaiPhong(id));
    }

}
