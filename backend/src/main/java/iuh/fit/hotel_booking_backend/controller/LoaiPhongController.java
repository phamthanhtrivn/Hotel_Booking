package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.dto.LoaiPhongSearchRequest;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/loaiphong")
@CrossOrigin(origins = "http://localhost:5173")
public class LoaiPhongController {
    private LoaiPhongService loaiPhongService;

    public LoaiPhongController(LoaiPhongService loaiPhongService) {

        this.loaiPhongService = loaiPhongService;
    }

    @GetMapping()
    public ResponseEntity<List<LoaiPhongDTO>> getAll() {
        List<LoaiPhongDTO> result = loaiPhongService.getAllLoaiPhongDTO();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/search")
    public ResponseEntity<List<LoaiPhongDTO>> searchAdvanced(
            @RequestBody LoaiPhongSearchRequest req
    ) {
        if (req.getCheckIn() != null && req.getCheckOut() != null) {
            if (req.getCheckOut().isBefore(req.getCheckIn())) {
                return ResponseEntity.badRequest()
                        .body(Collections.emptyList());
            }
        }

        List<LoaiPhongDTO> result = loaiPhongService.searchAdvancedDTO(
                req.getCheckIn(),
                req.getCheckOut(),
                req.getTenLoaiPhong(),
                req.getSoKhach(),
                req.getMinGia(),
                req.getMaxGia(),
                req.getMinDienTich(),
                req.getMaxDienTich(),
                req.getMaGiuong()
        );

        return ResponseEntity.ok(result);
    }


    @GetMapping("/search")
    public ResponseEntity<List<LoaiPhongDTO>> searchAdvancedGet(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkIn,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkOut,
            @RequestParam(required = false) String tenLoaiPhong,
            @RequestParam(required = false) Integer soKhach,
            @RequestParam(required = false) Double minGia,
            @RequestParam(required = false) Double maxGia,
            @RequestParam(required = false) Double minDienTich,
            @RequestParam(required = false) Double maxDienTich,
            @RequestParam(required = false) String maGiuong
    ) {

        if (checkIn != null && checkOut != null) {
            if (checkOut.isBefore(checkIn)) {
                return ResponseEntity.badRequest().body(null);
            }
        }

        List<LoaiPhongDTO> result = loaiPhongService.searchAdvancedDTO(
                checkIn, checkOut,
                tenLoaiPhong, soKhach,
                minGia, maxGia,
                minDienTich, maxDienTich,
                maGiuong
        );

        return ResponseEntity.ok(result);
    }

}
