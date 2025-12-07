package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.projections.LoaiPhongDropdownProjection;
import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.dto.LoaiPhongSearchRequest;
import java.time.LocalDateTime;
import java.util.Collections;


@RestController
@RequestMapping("/api/public/loaiphong")
public class LoaiPhongController {
    private final LoaiPhongService loaiPhongService;

    public LoaiPhongController(LoaiPhongService loaiPhongService) {
        this.loaiPhongService = loaiPhongService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<LoaiPhong>> findById(@PathVariable String id) {
        APIResponse<LoaiPhong> result = loaiPhongService.findById(id);

        return ResponseEntity.status(result.isSuccess() ? 200 : 400).body(result);
    }

    @GetMapping("/get-dropdown")
    public ResponseEntity<APIResponse<List<LoaiPhongDropdownProjection>>> findForDropdown() {
        APIResponse<List<LoaiPhongDropdownProjection>> response = new APIResponse<>();
        try {
            List<LoaiPhongDropdownProjection> projections = loaiPhongService.getForDropdown();
            response.setMessage("Lấy dropdown thành công!");
            response.setSuccess(true);
            response.setData(projections);
        } catch (Exception e) {
            response.setMessage("Lỗi khi lấy dropdown!");
            response.setSuccess(false);
            return ResponseEntity.status(500).body(response);
        }
        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }


    @PostMapping("/search")
    public ResponseEntity<List<LoaiPhongDTO>> searchAdvanced(
            @RequestBody LoaiPhongSearchRequest req
    ) {
        System.out.println(req);
        if (req.getCheckIn() != null && req.getCheckOut() != null) {
            if (req.getCheckOut().isBefore(req.getCheckIn())) {
                return ResponseEntity.badRequest()
                        .body(Collections.emptyList());
            }
        }
        LocalDateTime checkinDateTime =
                req.getCheckIn().atTime(13, 0); // 13:00 VN

        LocalDateTime checkoutDateTime =
                req.getCheckOut().atTime(12, 30); // 12:30 VN
        List<LoaiPhongDTO> result = loaiPhongService.searchAdvancedDTO(
                checkinDateTime,
                checkoutDateTime,
                req.getTenLoaiPhong(),
                req.getSoKhach(),
                req.getTreEm(),
                req.getMinGia(),
                req.getMaxGia(),
                req.getMinDienTich(),
                req.getMaxDienTich(),
                req.getMaGiuong()
        );

        return ResponseEntity.ok(result);
    }

    @GetMapping()
    public ResponseEntity<List<LoaiPhongDTO>> getAll() {
        List<LoaiPhongDTO> result = loaiPhongService.getAllLoaiPhongDTO();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/loaiPhong")
    public APIResponse<List<LoaiPhong>> getAllLoaiPhong() {
        APIResponse<List<LoaiPhong>> response = new APIResponse<>();
        try {
            List<LoaiPhong> listLoaiPhong = loaiPhongService.getAll();
            response.setData(listLoaiPhong);
            response.setSuccess(true);
            response.setMessage("Get all loai phong successfully");
            return response;
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Failed to get all loai phong: " + e.getMessage());
            return response;
        }
    }
}
