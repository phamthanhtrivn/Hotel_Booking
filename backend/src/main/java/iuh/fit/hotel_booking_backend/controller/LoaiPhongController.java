package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/loaiphong")
public class LoaiPhongController {
    private LoaiPhongService loaiPhongService;

    public LoaiPhongController(LoaiPhongService loaiPhongService) {
        this.loaiPhongService = loaiPhongService;
    }
}
