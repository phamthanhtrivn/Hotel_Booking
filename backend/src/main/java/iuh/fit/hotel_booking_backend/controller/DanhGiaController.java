package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.DanhGia;
import iuh.fit.hotel_booking_backend.service.DanhGiaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import iuh.fit.hotel_booking_backend.dto.DanhGiaRequest;
import iuh.fit.hotel_booking_backend.dto.DanhGiaRespone;
import iuh.fit.hotel_booking_backend.dto.DanhGiaTimKiemRequest;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/danhgia")
public class DanhGiaController {
    private DanhGiaService danhGiaService;

    public DanhGiaController(DanhGiaService danhGiaService) {
        this.danhGiaService = danhGiaService;
    }

    @GetMapping("/findbyloaiphong/{id}")
    public ResponseEntity<APIResponse<List<DanhGia>>> findByLoaiPhong(@PathVariable String id){
        APIResponse<List<DanhGia>> response = new APIResponse<>();
        try{
            List<DanhGia> danhGias = danhGiaService.findByLoaiPhong(id);
            response.setMessage("Lấy danh sách đánh giá thành công");
            response.setSuccess(true);
            response.setData(danhGias);
        }catch (Exception e){
            System.out.println(e.getMessage());
            response.setSuccess(false);
            response.setMessage("Lỗi khi lấy đánh gía");
        }
        return ResponseEntity.status(response.isSuccess() ? 200 : 400).body(response);
    }


    @GetMapping("/top-three-rating")
    public ResponseEntity<?> getTopThreeRatings() {
        return ResponseEntity.ok(danhGiaService.getTopThreeRatings());
    }

    @GetMapping
    public APIResponse<Page<DanhGiaRespone>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String maLoaiPhong,
            @RequestParam(required = false) String loaiMucDo,
            @RequestParam(required = false) Integer diemMucDo,
            @RequestParam(required = false, defaultValue = "0") Integer thang,
            @RequestParam(required = false, defaultValue = "0") Integer nam
    ){
        APIResponse<Page<DanhGiaRespone>> response = new APIResponse<>();
        DanhGiaTimKiemRequest request = new DanhGiaTimKiemRequest();


        if(maLoaiPhong.trim().length() != 0){
            request.setMaLoaiPhong(maLoaiPhong);
        }
        if(loaiMucDo.trim().length() != 0 && loaiMucDo.trim().length() != 0 && diemMucDo != null) {
            DanhGiaTimKiemRequest.MucDo mucDo = new DanhGiaTimKiemRequest.MucDo();
            mucDo.setLoai(loaiMucDo);
            mucDo.setDiem(Integer.parseInt(diemMucDo.toString()));
            request.setDanhGia(mucDo);
        }
        if(thang.toString().length() != 0 ) {
            request.setThang(Integer.parseInt(thang.toString()));
        }
        if(nam.toString().length() != 0 ) {
            request.setNam(nam);
        }

        try{
            Page<DanhGiaRespone> listDanhGia = danhGiaService.getAllByDanhGia(page, size, request);
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

    @PutMapping("/update/{maDanhGia}")
    public APIResponse<DanhGia> updateDanhGia(
            @PathVariable String maDanhGia
    ){
        APIResponse<DanhGia> response = new APIResponse<>();
        try {
            boolean check = danhGiaService.updateById(maDanhGia);
            response.setSuccess(check);
            response.setMessage("Update danh gia successfully");
        } catch (Exception e) {
            System.out.println(e);
            response.setSuccess(false);
            response.setMessage("Failed to update danh gia: " + e.getMessage());
        }
        return response;
    }


    @GetMapping("/nam")
    public APIResponse<List<Integer>> getDistinctYears() {
        APIResponse<List<Integer>> response = new APIResponse<>();
        try {
            List<Integer> years = danhGiaService.findDistinctYears();
            response.setData(years);
            response.setSuccess(true);
            response.setMessage("Get distinct years successfully");
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Failed to get distinct years: ");
        }
        return response;
    }
}
