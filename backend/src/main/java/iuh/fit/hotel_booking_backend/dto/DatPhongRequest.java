package iuh.fit.hotel_booking_backend.dto;

import iuh.fit.hotel_booking_backend.entity.TrangThaiDon;
import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data

public class DatPhongRequest {
    public String maKhachHang;

    @NotBlank(message = "Vui lòng nhập tên khách hàng")
    @Pattern(regexp = "^(?:[A-ZÀ-Ỹ][a-zà-ỹ]*)(?:\\s+[A-ZÀ-Ỹ][a-zà-ỹ]*)+$", message = "Viết hoa mỗi chữ cái đầu, ít nhất 2 từ gồm họ và tên")
    @Column(name = "ho_ten_khach_hang")
    public String hoTenKhachHang;

    @NotBlank(message = "Vui lòng nhập số điện thoại")
    @Pattern(regexp = "^(\\+?84|0)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$", message = "Số điện thoại không hợp lệ")
    @Column(name = "so_dien_thoai")
    public String soDienThoai;

    public String maLoaiPhong;

    @NotBlank(message = "Vui lòng nhập email")
    @Pattern(regexp = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$", message = "Email không hợp lệ")
    public String email;

    @NotNull(message = "Ngày check-in không được để trống")
    @FutureOrPresent(message = "Ngày check-in phải là hiện tại hoặc tương lai")
    public LocalDate checkIn;

    @NotNull(message = "Ngày check-out không được để trống")
    @Future(message = "Ngày check-out phải ở tương lai")
    public LocalDate checkOut;

    @AssertTrue(message = "Vui lòng đồng ý với điều khoản và quy định của chúng tôi.")
    public boolean agreed;

    public double tongTien;
    public int vat;
    public double tongTienThanhToan;
    public String ghiChu;

    public double phuThuTreEm;
    public double giamGiaLanDau;
    public double giamGiaDiemTichLuy;
    public String trangThaiDon;
}
