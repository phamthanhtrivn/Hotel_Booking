package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.service.TaiKhoanService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/taikhoan")
public class TaiKhoanController {
    private TaiKhoanService taikhoanService;

    public TaiKhoanController(TaiKhoanService taikhoanService) {
        this.taikhoanService = taikhoanService;
    }

}
