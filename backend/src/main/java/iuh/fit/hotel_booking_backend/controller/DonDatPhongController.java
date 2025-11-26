package iuh.fit.hotel_booking_backend.controller;

import com.cloudinary.api.ApiResponse;
import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.DatPhongRequest;
import iuh.fit.hotel_booking_backend.dto.DonDatPhongSearchRequest;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.service.DonDatPhongService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.entity.TrangThaiDon;
import jakarta.mail.internet.MimeMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

import java.util.List;

@RestController
@RequestMapping("/api/dondatphong")
public class DonDatPhongController {

    private final DonDatPhongService donDatPhongService;
    private final JavaMailSender mailSender;

    public DonDatPhongController(DonDatPhongService donDatPhongService, JavaMailSender mailSender) {
        this.donDatPhongService = donDatPhongService;
        this.mailSender = mailSender;
    }

    //Lấy tất cả đơn đặt phòng
    @GetMapping
    public List<DonDatPhong> getAll() {
        return donDatPhongService.getAll();
    }

    //Lấy lịch sử đặt phòng theo mã khách hàng
    @GetMapping("/lichsu/{maKhachHang}")
    public List<DonDatPhong> getLichSuByMaKhachHang(@PathVariable("maKhachHang") String maKhachHang) {
        return donDatPhongService.getByMaKhachHang(maKhachHang);
    }

    //Hủy đơn đặt phòng (chỉ cho phép nếu còn >24h trước check-in)
    @PostMapping("/huy/{maDatPhong}")
    public ResponseEntity<?> huyDonDatPhong(@PathVariable("maDatPhong") String maDatPhong) {
        DonDatPhong don = donDatPhongService.getById(maDatPhong);

        if (don == null) {
            return ResponseEntity.notFound().build();
        }

        // Kiểm tra thời gian hiện tại với check-in
        LocalDateTime now = LocalDateTime.now();
        if (don.getCheckIn().minusHours(24).isBefore(now)) {
            return ResponseEntity.badRequest().body("Không thể hủy đơn, vì còn ít hơn 24h trước check-in!");
        }

        don.setTrangThai(TrangThaiDon.DA_HUY);
        donDatPhongService.save(don);


        try {
            String email = don.getEmail(); // hoặc don.getKhachHang().getEmail() nếu lấy từ khách hàng liên kết
            String hoTen = don.getHoTenKhachHang();
            String maDatPhongEmail = don.getMaDatPhong();
            String phong = don.getPhong().getLoaiPhong().getTenLoaiPhong();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
            String checkInFormatted = don.getCheckIn().format(formatter);
            String checkOutFormatted = don.getCheckOut().format(formatter);


            NumberFormat vnFormat = NumberFormat.getInstance(new Locale("vi", "VN"));
            String tongTienFormatted = vnFormat.format(don.getTongTienTT()) + " VNĐ";

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("Thông báo hủy đơn đặt phòng TWAN HOTEL");

            String html = """
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
                        <h2 style="color: #1E2A38; text-align: center;">TWAN HOTEL</h2>
                        <p style="font-size: 16px; color: #333;">Chào %s,</p>
                        <p style="font-size: 16px; color: #333;">
                            Đơn đặt phòng <strong>%s</strong> của bạn đã được hủy thành công.
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            Thông tin phòng: <strong>%s</strong><br>
                            Thời gian: <strong>%s đến %s</strong><br>
                            Tổng thanh toán: <strong>%s</strong>
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            Hệ thống sẽ tiến hành hoàn tiền (nếu có) trong vòng 24h.
                        </p>
                        <p style="font-size: 14px; color: #555;">
                            Nếu bạn không thực hiện hủy đơn, vui lòng liên hệ TWAN HOTEL ngay lập tức.
                        </p>
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                        <p style="font-size: 12px; color: #999; text-align: center;">
                            TWAN HOTEL – Chúng tôi luôn quan tâm đến sự hài lòng và bảo mật của bạn.
                        </p>
                    </div>
                    """.formatted(hoTen, maDatPhongEmail, phong, checkInFormatted, checkOutFormatted, tongTienFormatted);

            helper.setText(html, true);
            mailSender.send(message);

        } catch (Exception e) {
            System.err.println("Không gửi được email thông báo hủy: " + e.getMessage());
        }


        return ResponseEntity.ok("Hủy đơn đặt phòng thành công! Hệ thống sẽ hoàn tiền trong vòng 24h.");
    }

    //Cập nhật ghi chú (chỉ cho phép nếu còn >24h trước check-in)
    @PostMapping("/capnhat-ghichu/{maDatPhong}")
    public ResponseEntity<?> capNhatGhiChu(
            @PathVariable("maDatPhong") String maDatPhong,
            @RequestBody String ghiChuMoi) {

        DonDatPhong don = donDatPhongService.getById(maDatPhong);

        if (don == null) {
            return ResponseEntity.notFound().build();
        }

        LocalDateTime now = LocalDateTime.now();
        if (don.getCheckIn().minusHours(24).isBefore(now)) {
            return ResponseEntity.badRequest().body("Không thể cập nhật ghi chú vì còn ít hơn 24h trước check-in!");
        }

        don.setGhiChu(ghiChuMoi);
        donDatPhongService.save(don);


        return ResponseEntity.ok("Cập nhật ghi chú thành công!");
    }

    @PostMapping("/search")
    public ResponseEntity<List<DonDatPhong>> search(@RequestBody DonDatPhongSearchRequest req) {
        List<DonDatPhong> result = donDatPhongService.search(req);
        return ResponseEntity.ok(result);
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
