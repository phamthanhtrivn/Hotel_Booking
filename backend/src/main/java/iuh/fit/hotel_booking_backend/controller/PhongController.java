package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.PhongDTO;
import iuh.fit.hotel_booking_backend.dto.PhongFilter;
import iuh.fit.hotel_booking_backend.entity.Phong;
import iuh.fit.hotel_booking_backend.service.PhongService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.io.Console;
import java.util.List;

@RestController
@RequestMapping("/api/phong")
public class PhongController {
    private final PhongService phongService;

    public PhongController(PhongService phongService) {
        this.phongService = phongService;
    }

    @GetMapping("/get-available-room-by-room-type/{id}")
    public ResponseEntity<APIResponse<Phong>> getAvailableRoomByRoomType(@PathVariable String id) {
        APIResponse<Phong> response = new APIResponse<>();
        try {
            Phong phong = phongService.getAvailableRoomByRoomType(id);
            if (phong == null) {
                response.setMessage("Không tìm thấy phòng trống cho loại phòng này");
                response.setSuccess(false);
            } else {
                response.setData(phong);
                response.setMessage("Tìm thấy phòng!");
                response.setSuccess(true);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setMessage("Lỗi khi tìm phòng phù hợp.");
            response.setSuccess(false);
            return ResponseEntity.status(500).body(response);
        }

        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }

    @PostMapping("/search")
    public ResponseEntity<APIResponse<Page<Phong>>> search(
            @RequestBody PhongFilter filter,
            @RequestParam int page,
            @RequestParam int size
    ) {
        APIResponse<Page<Phong>> response = new APIResponse<>();
        Pageable pageable = PageRequest.of(page, size);
        try {
            Page<Phong> phongPage = phongService.searchPhong(filter, pageable);
            response.setData(phongPage);
            response.setSuccess(true);
            response.setMessage("Tìm phòng thành công!");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setMessage("Lỗi khi thực hiện tìm phòng!");
            response.setSuccess(false);
            return ResponseEntity.status(500).body(response);
        }
        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }

    @PutMapping
    public ResponseEntity<APIResponse<Phong>> update(@RequestBody(required = true) PhongDTO phong) {
        APIResponse<Phong> response = new APIResponse<>();
        try {
            Phong p = phongService.save(phong);
            response.setData(p);
            response.setSuccess(true);
            response.setMessage("Cập nhật thành công!");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setMessage("Cập nhật thất bại!");
            response.setSuccess(false);
            return ResponseEntity.status(500).body(response);
        }
        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }
}
