package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonManagedReference
    private KhachHang khachHang;
    @Column(unique = true)
    private String email;
    @Column(name = "mat_khau")
    private String matKhau;
    @Column(name = "tinh_trang")
    private boolean tinhTrang;
}
