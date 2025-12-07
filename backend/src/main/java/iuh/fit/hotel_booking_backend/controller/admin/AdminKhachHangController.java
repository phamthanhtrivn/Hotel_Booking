package iuh.fit.hotel_booking_backend.controller.admin;

import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.service.KhachHangService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/khachhang")
public class AdminKhachHangController {
    private KhachHangService khachHangService;

    public AdminKhachHangController(KhachHangService khachHangService) {
        this.khachHangService = khachHangService;
    }

    @GetMapping
    public ResponseEntity<Page<TaiKhoan>> getAllKhachHang(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean trangThai,
            @RequestParam(defaultValue = "khachHang.diemTichLuy") String sortField,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Page<TaiKhoan> result = khachHangService.getAll(page, size, keyword, trangThai, sortField, sortDir);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable String id) {
        Boolean deleted = khachHangService.deleteById(id);
        return ResponseEntity.ok(deleted);
    }

    @GetMapping("/search")
    public ResponseEntity<List<KhachHang>> search(@RequestParam String keyword) {
        List<KhachHang> list = khachHangService.search(keyword);
        return ResponseEntity.ok(list);
    }

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
