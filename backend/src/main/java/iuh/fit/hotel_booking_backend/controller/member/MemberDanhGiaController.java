package iuh.fit.hotel_booking_backend.controller.member;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.DanhGiaRequest;
import iuh.fit.hotel_booking_backend.entity.DanhGia;
import iuh.fit.hotel_booking_backend.service.DanhGiaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member/danhgia")
public class MemberDanhGiaController {
    private DanhGiaService danhGiaService;

    public MemberDanhGiaController(DanhGiaService danhGiaService) {
        this.danhGiaService = danhGiaService;
    }

    @PostMapping("/create")
    public APIResponse<DanhGia> createDanhGia(@RequestBody DanhGiaRequest danhGiaRequest){
        APIResponse<DanhGia> response = new APIResponse<>();
        try {
            DanhGia newDanhGia = danhGiaService.save(danhGiaRequest);
            response.setData(newDanhGia);
            response.setSuccess(true);
            response.setMessage("Đánh giá thành công!");
            return response;
        } catch (Exception e) {
            System.out.println(e);
            response.setSuccess(false);
            response.setMessage("Failed to create danh gia");
            return response;
        }
    }

}
