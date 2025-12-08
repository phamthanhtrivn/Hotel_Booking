package iuh.fit.hotel_booking_backend.controller.admin;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.ChiTietLoaiGiuongRequest;
import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.dto.LoaiPhongSearchRequest;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/loaiphong")
public class AdminLoaiPhongController {
    private final LoaiPhongService loaiPhongService;

    public AdminLoaiPhongController(LoaiPhongService loaiPhongService) {
        this.loaiPhongService = loaiPhongService;
    }

    @PostMapping("/find-conditions")
    public ResponseEntity<?> findAllPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestBody LoaiPhongSearchRequest requestbody
    ) {
        System.out.println(requestbody);
        Page<LoaiPhongDTO> result = loaiPhongService.findByConditions(page, size, requestbody);
        return ResponseEntity.ok(result);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<APIResponse<Object>> create(
            @Valid @RequestPart("loaiPhong") LoaiPhong loaiPhong,
            @RequestPart(value = "images", required = false) List<MultipartFile> hinhAnh,
            @RequestPart(value = "tienNghiIds", required = false) List<String> tienNghiIds,
            @RequestPart(value = "chiTietGiuongs", required = false) List<ChiTietLoaiGiuongRequest> chiTietGiuongs) {

        APIResponse<Object> response = loaiPhongService.save(loaiPhong, hinhAnh, tienNghiIds, chiTietGiuongs);

        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<APIResponse<LoaiPhong>> update(
            @RequestPart("loaiPhong") @Valid LoaiPhong loaiPhong,
            @RequestPart(value = "oldImages", required = false) String oldImagesJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> newPhotos,
            @RequestPart(value = "tienNghiIds", required = false) List<String> tienNghiIds,
            @RequestPart(value = "chiTietGiuongs", required = false) List<ChiTietLoaiGiuongRequest> chiTietGiuongs
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

        APIResponse<LoaiPhong> result = loaiPhongService.update(loaiPhong, existingImages, newPhotos, tienNghiIds, chiTietGiuongs);
        return ResponseEntity.status(result.isSuccess() ? 200 : 400).body(result);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse<String>> delete(@PathVariable String id) {
        APIResponse<String> response = new APIResponse<>();
        try {
            loaiPhongService.deleteById(id);
            response.setData(id);
            response.setSuccess(true);
            response.setMessage("Xóa loại phòng thành công");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new APIResponse<>(false, "Lỗi khi xóa loại phòng", ""));
        }
        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }
}
