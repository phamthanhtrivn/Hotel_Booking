package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tai_khoan")
public class TaiKhoan {
    @Id
    @Column(name = "ma_tai_khoan")
    private String maTaiKhoan;
    @Enumerated(EnumType.STRING)

    @NotNull
    @Column(name = "vai_tro")
    private LoaiTaiKhoan vaiTro;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ma_khach_hang", unique = true)
    private KhachHang khachHang;

    @NotBlank(message = "Vui lòng nhập email")
    @Pattern(regexp = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$", message = "Email không hợp lệ")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Vui lòng nhập mật khẩu")
    @Column(name = "mat_khau")
    private String matKhau;

    @Column(name = "tinh_trang")
    private boolean tinhTrang;
}
