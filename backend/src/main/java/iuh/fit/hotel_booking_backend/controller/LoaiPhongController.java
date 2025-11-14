package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.service.LoaiPhongService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/loaiphong")
public class LoaiPhongController {
    private LoaiPhongService loaiPhongService;

    public LoaiPhongController(LoaiPhongService loaiPhongService) {
        this.loaiPhongService = loaiPhongService;
    }

    @GetMapping
    public APIResponse<List<LoaiPhong>> getAll(){
        APIResponse<List<LoaiPhong>> response = new APIResponse<>();
        try{
            List<LoaiPhong> list = loaiPhongService.getAll();
            response.setData(list);
            response.setSuccess(true);
            response.setMessage("Fetched room types successfully");
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Failed to fetch room types");
            return response;
        }
        return response;
    }
}
