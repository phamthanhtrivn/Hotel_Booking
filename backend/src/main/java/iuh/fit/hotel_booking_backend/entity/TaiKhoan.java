package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.*;
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
    @Column(name = "vai_tro")
    private LoaiTaiKhoan vaiTro;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ma_khach_hang", unique = true)
    private KhachHang khachHang;
    @Column(unique = true)
    private String email;
    @Column(name = "mat_khau")
    private String matKhau;
    @Column(name = "is_active")
    private boolean isActive;
}
