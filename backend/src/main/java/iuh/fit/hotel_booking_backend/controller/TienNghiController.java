package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.service.TienNghiService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tiennghi")
public class TienNghiController {
    private TienNghiService tienNghiService;

    public TienNghiController(TienNghiService tienNghiService) {
        this.tienNghiService = tienNghiService;
    }
}
