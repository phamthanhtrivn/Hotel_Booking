package iuh.fit.hotel_booking_backend.controller.admin;

import iuh.fit.hotel_booking_backend.entity.TienNghi;
import iuh.fit.hotel_booking_backend.service.TienNghiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/tiennghi")
public class AdminTienNghiController {
    private TienNghiService tienNghiService;

    public AdminTienNghiController(TienNghiService tienNghiService) {
        this.tienNghiService = tienNghiService;
    }

    @PostMapping
    public ResponseEntity<?> createTienNghi(@RequestBody TienNghi tienNghi) {
        return ResponseEntity.ok(tienNghiService.save(tienNghi));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTienNghi(@PathVariable String id, @RequestBody TienNghi tienNghi) {
        tienNghi.setMaTienNghi(id);
        return ResponseEntity.ok(tienNghiService.update(tienNghi));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTienNghi(@PathVariable String id) {
        return ResponseEntity.ok(tienNghiService.deleteById(id));
    }
}
