package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.service.TaiKhoanService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/taikhoan")
public class TaiKhoanController {
    private TaiKhoanService taikhoanService;

    public TaiKhoanController(TaiKhoanService taikhoanService) {
        this.taikhoanService = taikhoanService;
    }

    @GetMapping
    public List<TaiKhoan> getAllTaiKhoan() {
        return taikhoanService.getAll();
    }

    @PatchMapping("/update")
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
}
