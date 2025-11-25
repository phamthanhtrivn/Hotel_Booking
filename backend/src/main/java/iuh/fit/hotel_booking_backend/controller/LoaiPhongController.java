package iuh.fit.hotel_booking_backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.projections.LoaiPhongDropdownProjection;
import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.dto.LoaiPhongSearchRequest;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Collections;


@RestController
@RequestMapping("/api/loaiphong")
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
    public ResponseEntity<APIResponse<List<LoaiPhongDropdownProjection>>> findForDropdown(){
        APIResponse<List<LoaiPhongDropdownProjection>> response = new APIResponse<>();
        try{
            List<LoaiPhongDropdownProjection> projections = loaiPhongService.getForDropdown();
            response.setMessage("Lấy dropdown thành công!");
            response.setSuccess(true);
            response.setData(projections);
        }catch (Exception e){
            response.setMessage("Lỗi khi lấy dropdown!");
            response.setSuccess(false);
            return ResponseEntity.status(500).body(response);
        }
        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }

    @PostMapping("/find-conditions")
    public ResponseEntity<?> findAllPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestBody LoaiPhongSearchRequest requestbody
    ) {
        Page<LoaiPhong> result = loaiPhongService.findByConditions(page, size, requestbody);
        return ResponseEntity.ok(result);
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


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<APIResponse<LoaiPhong>> save(
            @RequestPart("loaiPhong") @Valid LoaiPhong loaiPhong,
            @RequestPart(value = "photos", required = false) List<MultipartFile> photos) {

        APIResponse<LoaiPhong> result = loaiPhongService.save(loaiPhong, photos);

        return ResponseEntity.status(result.isSuccess() ? 200 : 400).body(result);
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<APIResponse<LoaiPhong>> update(
            @RequestPart("loaiPhong") @Valid LoaiPhong loaiPhong,
            @RequestPart(value = "oldImages", required = false) String oldImagesJson,
            @RequestPart(value = "photos", required = false) List<MultipartFile> newPhotos
    ) throws Exception {

        List<String> existingImages = new ArrayList<>();

        if (oldImagesJson != null && !oldImagesJson.isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            existingImages = mapper.readValue(
                    oldImagesJson,
                    new TypeReference<List<String>>() {
                    }
            );
        }

        APIResponse<LoaiPhong> result = loaiPhongService.update(loaiPhong, existingImages, newPhotos);
        return ResponseEntity.status(result.isSuccess() ? 200 : 400).body(result);
    }


    @DeleteMapping
    public ResponseEntity<APIResponse<Object>> delete(@RequestParam("id") String id) {
        APIResponse<Object> result = loaiPhongService.deleteById(id);

        return ResponseEntity.status(result.isSuccess() ? 200 : 400).body(result);

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
            @RequestParam(required = false) String maGiuong,
            @RequestParam(required = false) Integer[] treEm
    ) {

        if (checkIn != null && checkOut != null) {
            if (checkOut.isBefore(checkIn)) {
                return ResponseEntity.badRequest().body(null);
            }
        }

        List<LoaiPhongDTO> result = loaiPhongService.searchAdvancedDTO(
                checkIn, checkOut,
                tenLoaiPhong, soKhach, treEm,
                minGia, maxGia,
                minDienTich, maxDienTich,
                maGiuong
        );

        return ResponseEntity.ok(result);

    }

}
