package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.service.KhachHangService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/khachhang")
public class KhachHangController {
    private KhachHangService khachHangService;

    public KhachHangController(KhachHangService khachHangService) {
        this.khachHangService = khachHangService;
    }

    @GetMapping
    public List<KhachHang> list() {
        return khachHangService.getAll();
    }

    @GetMapping("/{id}")
    public KhachHang getById(@PathVariable String id) {
        return khachHangService.getById(id);
    }
}
