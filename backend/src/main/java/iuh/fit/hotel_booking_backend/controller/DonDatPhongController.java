package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.DatPhongRequest;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.service.DonDatPhongService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/dondatphong")
public class DonDatPhongController {

    private final DonDatPhongService donDatPhongService;

    public DonDatPhongController(DonDatPhongService donDatPhongService, JavaMailSender mailSender) {
        this.donDatPhongService = donDatPhongService;
    }

    @PostMapping("/create")
    public ResponseEntity<APIResponse<DonDatPhong>> createBooking(@Valid @RequestBody DatPhongRequest request) {
        APIResponse<DonDatPhong> response = new APIResponse<>();
        try {
            DonDatPhong don = donDatPhongService.createBooking(request);
            response.setData(don);
            response.setSuccess(true);
            response.setMessage("Tạo đơn thành công!");
            return ResponseEntity.status(200).body(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setSuccess(false);
            response.setMessage("Lỗi khi tạo đơn!");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<DonDatPhong>> getById(@PathVariable String id) {
        APIResponse<DonDatPhong> response;
        try {
            DonDatPhong data = donDatPhongService.getById(id);
            response = new APIResponse<>(true, "Lấy đơn đặt phòng thành công", data);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new APIResponse<>(false, e.getMessage(), null));
        }
    }

}
