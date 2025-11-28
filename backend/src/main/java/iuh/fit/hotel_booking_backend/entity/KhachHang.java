package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "khach_hang")
public class KhachHang {
    @Id
    @Column(name = "ma_khach_hang")
    private String maKhachHang;

    @NotBlank(message = "Vui lòng nhập tên khách hàng")
    @Pattern(regexp = "^(?:[A-ZÀ-Ỹ][a-zà-ỹ]*)(?:\\s+[A-ZÀ-Ỹ][a-zà-ỹ]*)+$", message = "Viết hoa mỗi chữ cái đầu, ít nhất 2 từ gồm họ và tên")
    @Column(name = "ho_ten_khach_hang")
    private String hoTenKH;

    @NotBlank(message = "Vui lòng nhập số điện thoại")
    @Pattern(regexp = "^(\\+?84|0)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$", message = "Số điện thoại không hợp lệ")
    @Column(name = "so_dien_thoai")
    private String soDienThoai;

    @Column(name = "diem_tich_luy")
    private int diemTichLuy;

    @OneToOne(mappedBy = "khachHang")
    @JsonIgnore
    private TaiKhoan taiKhoan;

}
