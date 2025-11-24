package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.LoaiTaiKhoan;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.service.TaiKhoanService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/taikhoan")

public class TaiKhoanController {
    private TaiKhoanService taikhoanService;

    public TaiKhoanController(TaiKhoanService taikhoanService) {
        this.taikhoanService = taikhoanService;
    }


    @GetMapping("/{id}")
    public APIResponse<TaiKhoan> getById(@PathVariable String id) {
        APIResponse<TaiKhoan> response = new APIResponse<>();
        try{
            TaiKhoan tk = taikhoanService.getById(id);
            if(tk != null) {
                response.setData(tk);
                response.setSuccess(true);
                response.setMessage("Get TaiKhoan successfully");
            }
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Error retrieving TaiKhoan");
            return response;
        }
        return response;
    }

    @PutMapping("/update")
    public APIResponse<TaiKhoan> updateTaiKhoan(@RequestBody TaiKhoan t) {
        APIResponse<TaiKhoan> response = new APIResponse<>();
        try{
            response.setData(taikhoanService.update(t));
            response.setSuccess(true);
            response.setMessage("Update TaiKhoan successfully");
            return response;
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Error updating TaiKhoan: " + e.getMessage());
            return response;
        }
    }




    // get all account
    @GetMapping
    public ResponseEntity<List<TaiKhoan>> getAllTaiKhoan() {
        List<TaiKhoan> list = taikhoanService.getAllMembers();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<TaiKhoan> create(@RequestBody TaiKhoan taiKhoan) {
        TaiKhoan saved = taikhoanService.save(taiKhoan);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            boolean deleted = taikhoanService.deleteById(id);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Không tìm thấy tài khoản cần xóa.");
            }
            return ResponseEntity.ok("Xóa tài khoản thành công!");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/email")
    public ResponseEntity<?> getByEmail(@RequestParam String email) {
        TaiKhoan tk = taikhoanService.getTaiKhoanByEmail(email);
        if (tk == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Không tìm thấy tài khoản có email: " + email);
        }
        return ResponseEntity.ok(tk);
    }

}
