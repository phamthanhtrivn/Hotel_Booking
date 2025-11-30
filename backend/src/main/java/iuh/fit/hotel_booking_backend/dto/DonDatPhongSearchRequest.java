package iuh.fit.hotel_booking_backend.dto;

import iuh.fit.hotel_booking_backend.entity.TrangThaiDon;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DonDatPhongSearchRequest {
    private String keyword;
    private String hoTenKhachHang;
    private String soDienThoai;
    private String email;
    private String maKhachHang;
    private String maPhong;
    private TrangThaiDon trangThai;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private Double minTongTien;
    private Double maxTongTien;
}
