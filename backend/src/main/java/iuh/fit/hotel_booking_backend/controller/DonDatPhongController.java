package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.service.DonDatPhongService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dondatphong")
public class DonDatPhongController {
    private DonDatPhongService donDatPhongService;

    public DonDatPhongController(DonDatPhongService donDatPhongService) {
        this.donDatPhongService = donDatPhongService;
    }
}
