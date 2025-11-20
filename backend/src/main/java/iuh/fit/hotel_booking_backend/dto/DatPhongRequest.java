package iuh.fit.hotel_booking_backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DatPhongRequest {
    public String maKhachHang;
    public String hoTenKhachHang;
    public String soDienThoai;
    public String email;
    public String maPhong;
    public LocalDateTime checkIn;
    public LocalDateTime checkOut;
    public double tongTien;
    public int vat;
    public boolean isPaid;
    public String ghiChu;
}
