package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.ChiTietLoaiGiuongResponse;
import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuong;
import iuh.fit.hotel_booking_backend.service.ChiTietLoaiGiuongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public/chitietloaigiuong")
public class ChiTietLoaiGiuongController {
    private ChiTietLoaiGiuongService chiTietLoaiGiuongService;

    public ChiTietLoaiGiuongController(ChiTietLoaiGiuongService chiTietLoaiGiuongService) {
        this.chiTietLoaiGiuongService = chiTietLoaiGiuongService;
    }
    @GetMapping("/loai-phong/{maLoaiPhong}")
    public ResponseEntity<List<ChiTietLoaiGiuongResponse>> getByLoaiPhong(
            @PathVariable String maLoaiPhong) {
        List<ChiTietLoaiGiuong> chiTiets = chiTietLoaiGiuongService.findByLoaiPhong(maLoaiPhong);

        List<ChiTietLoaiGiuongResponse> responses = chiTiets.stream()
                .map(ct -> new ChiTietLoaiGiuongResponse(
                        ct.getLoaiGiuong().getMaGiuong(),
                        ct.getLoaiGiuong().getTenGiuong(),
                        ct.getSoGiuong()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }
}
