package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.Phong;
import iuh.fit.hotel_booking_backend.service.PhongService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.EntityResponse;

import java.io.Console;

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
}
