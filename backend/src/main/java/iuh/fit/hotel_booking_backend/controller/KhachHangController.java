package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.service.KhachHangService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Page<TaiKhoan>> getAllKhachHang(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean trangThai,
            @RequestParam(defaultValue = "khachHang.diemTichLuy") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Page<TaiKhoan> result = khachHangService.getAll(page, size, keyword, trangThai, sortField, sortDir);
        return ResponseEntity.ok(result);
    }

    // get khach hang by id
    @GetMapping("/{id}")
    public ResponseEntity<KhachHang> getById(@PathVariable String id) {
        KhachHang khachHang = khachHangService.getById(id);
        return ResponseEntity.ok(khachHang);
    }

    // xoa khach hang
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable String id) {
        Boolean deleted = khachHangService.deleteById(id);
        return ResponseEntity.ok(deleted);
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
    @PutMapping("/{id}/{trangThai}")
    public ResponseEntity<Boolean> update(@PathVariable String id ,@PathVariable boolean trangThai,@RequestBody KhachHang updatedKhachHang) {
        Boolean update = khachHangService.update(id,trangThai,updatedKhachHang);
        return ResponseEntity.ok(update);
    }

    @PutMapping("/updateTinhTrang/{id}")
    public ResponseEntity<Boolean> updateTinhTrang(@PathVariable String id) {
        Boolean update = khachHangService.updateTinhTrang(id);
        return ResponseEntity.ok(update);
    }

}
