package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/loaiphong")
public class LoaiPhongController {
    private LoaiPhongService loaiPhongService;

    public LoaiPhongController(LoaiPhongService loaiPhongService) {

        this.loaiPhongService = loaiPhongService;
    }

    //        Tìm kiếm loại phòng còn trống theo ngày checkIn và checkOut
//        /api/loai-phong/available?checkIn=2025-12-24T14:00:00&checkOut=2025-12-26T12:00:00
    @GetMapping("/available")
    public ResponseEntity<List<LoaiPhongDTO>> timLoaiPhongTrongs (
            @RequestParam("checkIn") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkIn,
            @RequestParam("checkOut") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkOut)
    {

        List<LoaiPhongDTO> availableRooms = loaiPhongService.timLoaiPhongTrong(checkIn, checkOut);
        return ResponseEntity.ok(availableRooms);
    }
}
