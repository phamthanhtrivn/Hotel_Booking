package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.service.KhachHangService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/khachhang")
public class KhachHangController {
    private KhachHangService khachHangService;

    public KhachHangController(KhachHangService khachHangService) {
        this.khachHangService = khachHangService;
    }
}
