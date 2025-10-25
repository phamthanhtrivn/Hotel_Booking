package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.service.ChiTietTienNghiService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chitiettiennghi")
public class ChiTietTienNghiController {
    private ChiTietTienNghiService chiTietTienNghiService;

    public ChiTietTienNghiController(ChiTietTienNghiService chiTietTienNghiService) {
        this.chiTietTienNghiService = chiTietTienNghiService;
    }
}
