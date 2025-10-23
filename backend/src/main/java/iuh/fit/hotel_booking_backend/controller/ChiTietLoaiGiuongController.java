package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.service.ChiTietLoaiGiuongService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chitietloaigiuong")
public class ChiTietLoaiGiuongController {
    private ChiTietLoaiGiuongService chiTietLoaiGiuongService;

    public ChiTietLoaiGiuongController(ChiTietLoaiGiuongService chiTietLoaiGiuongService) {
        this.chiTietLoaiGiuongService = chiTietLoaiGiuongService;
    }

}
