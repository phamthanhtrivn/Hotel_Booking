package iuh.fit.hotel_booking_backend.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data

public class DatPhongRequest {
    public String maKhachHang;
    public String hoTenKhachHang;
    public String soDienThoai;
    public String maLoaiPhong;
    public String email;

    @NotNull(message = "Ngày check-in không được để trống")
    @FutureOrPresent(message = "Ngày check-in phải là hiện tại hoặc tương lai")
    public LocalDate checkIn;

    @NotNull(message = "Ngày check-out không được để trống")
    @Future(message = "Ngày check-out phải ở tương lai")
    public LocalDate checkOut;
    public double tongTien;
    public int vat;
    public double tongTienThanhToan;
    public String ghiChu;
}
