package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.service.DanhGiaService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/danhgia")
public class DanhGiaController {
    private DanhGiaService danhGiaService;

    public DanhGiaController(DanhGiaService danhGiaService) {
        this.danhGiaService = danhGiaService;
    }
}
