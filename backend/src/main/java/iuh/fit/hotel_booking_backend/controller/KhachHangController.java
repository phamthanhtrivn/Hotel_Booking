package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.service.KhachHangService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.List;

@RestController
@RequestMapping("/api/khachhang")
public class KhachHangController {
    private KhachHangService khachHangService;

    public KhachHangController(KhachHangService khachHangService) {
        this.khachHangService = khachHangService;
    }



    // get all khach hang
    @GetMapping
    public ResponseEntity<List<KhachHang>> getAllKhachHang() {
        List<KhachHang> list = khachHangService.getAll();
        return ResponseEntity.ok(list);
    }

    // get khach hang by id
    @GetMapping("/{id}")
    public ResponseEntity<KhachHang> getById(@PathVariable String id) {
        KhachHang khachHang = khachHangService.getById(id);
        return ResponseEntity.ok(khachHang);
    }

    // xoa khach hang
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        khachHangService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // tim kiem khach hang bang ten hoac sdt
    @GetMapping("/search")
    public ResponseEntity<List<KhachHang>> search(@RequestParam String keyword) {
        List<KhachHang> list = khachHangService.search(keyword);
        return ResponseEntity.ok(list);
    }

    // them khach hang
    @PostMapping
    public ResponseEntity<KhachHang> create(@RequestBody KhachHang khachHang) {
        KhachHang saved = khachHangService.save(khachHang);
        return ResponseEntity.ok(saved);
    }

    // cap nhat thogn tin khach hang
    @PutMapping("/{id}")
    public ResponseEntity<Boolean> update(@PathVariable String id, @RequestBody KhachHang updatedKhachHang) {
        Boolean update = khachHangService.update(id,updatedKhachHang);
        return ResponseEntity.ok(update);
    }
}
