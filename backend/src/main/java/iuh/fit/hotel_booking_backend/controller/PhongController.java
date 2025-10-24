package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.service.PhongService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/phong")
public class PhongController {
    private PhongService phongService;

    public PhongController(PhongService phongService) {
        this.phongService = phongService;
    }
}
