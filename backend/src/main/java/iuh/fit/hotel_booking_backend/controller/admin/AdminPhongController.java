package iuh.fit.hotel_booking_backend.controller.admin;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.PhongDTO;
import iuh.fit.hotel_booking_backend.dto.PhongFilter;
import iuh.fit.hotel_booking_backend.entity.Phong;
import iuh.fit.hotel_booking_backend.service.PhongService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/phong")
public class AdminPhongController {
    private final PhongService phongService;

    public AdminPhongController(PhongService phongService) {
        this.phongService = phongService;
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
    public ResponseEntity<APIResponse<Phong>> update(@RequestBody PhongDTO phong) {
        System.out.println(phong);
        APIResponse<Phong> response = new APIResponse<>();
        try {
            Phong p = phongService.save(phong);
            response.setData(p);
            response.setSuccess(true);
            response.setMessage("Cập nhật thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            response.setMessage("Cập nhật thất bại!");
            response.setSuccess(false);
            return ResponseEntity.status(500).body(response);
        }
        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }
}
