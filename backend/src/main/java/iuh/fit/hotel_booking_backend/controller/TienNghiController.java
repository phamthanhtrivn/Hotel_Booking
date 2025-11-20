package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.entity.TienNghi;
import iuh.fit.hotel_booking_backend.service.TienNghiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tiennghi")
public class TienNghiController {
    private TienNghiService tienNghiService;

    public TienNghiController(TienNghiService tienNghiService) {
        this.tienNghiService = tienNghiService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTienNghi() {
        return ResponseEntity.ok(tienNghiService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {
        return ResponseEntity.ok(tienNghiService.getById(id));
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
