package iuh.fit.hotel_booking_backend.controller;
import iuh.fit.hotel_booking_backend.service.PhongService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/phong")
public class PhongController {
    private final PhongService phongService;

    public PhongController(PhongService phongService) {
        this.phongService = phongService;
    }

}
