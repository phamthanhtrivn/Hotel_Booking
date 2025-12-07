package iuh.fit.hotel_booking_backend.controller.admin;

import iuh.fit.hotel_booking_backend.dto.DonDatPhongSearchRequest;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.service.DonDatPhongService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dondatphong")
public class AdminDonDatPhongController {

    private final DonDatPhongService donDatPhongService;

    public AdminDonDatPhongController(DonDatPhongService donDatPhongService) {
        this.donDatPhongService = donDatPhongService;
    }

    @GetMapping
    public ResponseEntity<Page<DonDatPhong>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<DonDatPhong> donDatPhongs = donDatPhongService.getAll(page, size);
        return ResponseEntity.ok(donDatPhongs);
    }

    @PostMapping("/search")
    public ResponseEntity<Page<DonDatPhong>> search(
            @RequestBody DonDatPhongSearchRequest req,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<DonDatPhong> result = donDatPhongService.search(req, page, size);
        return ResponseEntity.ok(result);
    }
}
