package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.service.LoaiGiuongService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/loaigiuong")
public class LoaiGiuongController {
    private LoaiGiuongService loaiGiuongService;

    public LoaiGiuongController(LoaiGiuongService loaiGiuongService) {
        this.loaiGiuongService = loaiGiuongService;
    }
}
