package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.DonDatPhongSearchRequest;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.service.DonDatPhongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dondatphong")
public class DonDatPhongController {
    private DonDatPhongService donDatPhongService;

    public DonDatPhongController(DonDatPhongService donDatPhongService) {
        this.donDatPhongService = donDatPhongService;
    }

    @PostMapping("/search")
    public ResponseEntity<List<DonDatPhong>> search(@RequestBody DonDatPhongSearchRequest req) {
        List<DonDatPhong> result = donDatPhongService.search(req);
        return ResponseEntity.ok(result);
    }
}
