package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.service.CloudinaryService;
import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/loaiphong")
public class LoaiPhongController {
    private final LoaiPhongService loaiPhongService;

    public LoaiPhongController(LoaiPhongService loaiPhongService, CloudinaryService cloudinaryService) {
        this.loaiPhongService = loaiPhongService;
    }

    @GetMapping
    public List<LoaiPhong> finAll() {
        return loaiPhongService.getAll();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<APIResponse<LoaiPhong>> save(
            @RequestPart("loaiPhong") @Valid LoaiPhong loaiPhong,
            @RequestPart(value = "photos", required = false) List<MultipartFile> photos) {

        APIResponse<LoaiPhong> result = loaiPhongService.save(loaiPhong, photos);

        return ResponseEntity.status(result.isSuccess() ? 200 : 400).body(result);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<APIResponse<LoaiPhong>> update(
            @PathVariable String id,
            @RequestPart("loaiPhong") @Valid LoaiPhong loaiPhong,
            @RequestPart(value = "existingImages", required = false) List<String> existingImages,
            @RequestPart(value = "newPhotos", required = false) List<MultipartFile> newPhotos
    ) {
        APIResponse<LoaiPhong> result = loaiPhongService.update(id, loaiPhong, existingImages, newPhotos);
        return ResponseEntity.status(result.isSuccess() ? 200 : 400).body(result);
    }


    @DeleteMapping
    public ResponseEntity<APIResponse<Object>> delete(@RequestParam("id") String id) {
        APIResponse<Object> result = loaiPhongService.deleteById(id);

        return ResponseEntity.status(result.isSuccess() ? 200 : 400).body(result);
    }

}
