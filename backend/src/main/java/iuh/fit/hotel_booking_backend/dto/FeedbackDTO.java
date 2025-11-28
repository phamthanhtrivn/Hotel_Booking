package iuh.fit.hotel_booking_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FeedbackDTO {
    private String maDanhGia;
    private int diemSachSe;
    private int diemDichVu;
    private int diemCoSoVatChat;
    private String binhLuan;
    private String loaiPhong;
    private LocalDateTime thoiGianDanhGia;
}
