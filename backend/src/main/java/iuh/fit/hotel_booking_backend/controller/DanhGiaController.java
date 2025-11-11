package iuh.fit.hotel_booking_backend.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.DanhGiaRequest;
import iuh.fit.hotel_booking_backend.dto.DanhGiaTimKiemRequest;
import iuh.fit.hotel_booking_backend.entity.DanhGia;
import iuh.fit.hotel_booking_backend.repository.DanhGiaRepository;
import iuh.fit.hotel_booking_backend.service.DanhGiaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/danhgia")
public class DanhGiaController {
    private DanhGiaService danhGiaService;

    public DanhGiaController(DanhGiaService danhGiaService) {
        this.danhGiaService = danhGiaService;
    }

    @GetMapping
    public APIResponse<List<DanhGia>> getAll(){
        APIResponse<List<DanhGia>> response = new APIResponse<>();
        try{
            List<DanhGia> listDanhGia = danhGiaService.getAll();
            response.setData(listDanhGia);
            response.setSuccess(true);
            response.setMessage("Get all danh gia successfully");
            return response;
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Failed to get all danh gia: " + e.getMessage());
            return response;
        }
    }

    @PostMapping("/create")
    public APIResponse<DanhGia> createDanhGia(@RequestBody DanhGiaRequest danhGiaRequest){
        APIResponse<DanhGia> response = new APIResponse<>();
        System.out.println("Received danh gia: " + danhGiaRequest);
        try {
            DanhGia newDanhGia = danhGiaService.save(danhGiaRequest);
            response.setData(newDanhGia);
            response.setSuccess(true);
            response.setMessage("Create danh gia successfully");
            return response;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setSuccess(false);
            response.setMessage("Failed to create danh gia");
            return response;
        }
    }
    @GetMapping("search")
    public  APIResponse<List<DanhGia>> searchDanhGia(
            @RequestParam(required = false) String maLoaiPhong,
            @RequestParam(required = false) String loaiMucDo,
            @RequestParam(required = false) Integer diemMucDo,
            @RequestParam(required = false, defaultValue = "0") Integer thang,
            @RequestParam(required = false, defaultValue = "0") Integer nam
    ){
        APIResponse<List<DanhGia>> response = new APIResponse<>();
        DanhGiaTimKiemRequest request = new DanhGiaTimKiemRequest();
        request.setMaLoaiPhong(maLoaiPhong);
        if(loaiMucDo != null && diemMucDo != null) {
            DanhGiaTimKiemRequest.MucDo mucDo = new DanhGiaTimKiemRequest.MucDo();
            mucDo.setLoai(loaiMucDo);
            mucDo.setDiem(diemMucDo);
            request.setDanhGia(mucDo);
        }
        request.setThang(thang);
        request.setNam(nam);
        System.out.println("Search request: " + request.toString());
        try{
            List<DanhGia> listDanhGia = danhGiaService.searchDanhGia(request);
            response.setData(listDanhGia);
            response.setSuccess(true);
            response.setMessage("Search danh gia successfully");

        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Failed to search danh gia: " + e.getMessage());
        }
        return response;
    }

}
