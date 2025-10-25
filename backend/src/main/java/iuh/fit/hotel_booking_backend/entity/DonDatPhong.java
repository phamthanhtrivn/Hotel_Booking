package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "don_dat_phong")
public class DonDatPhong {
    @Id
    @Column(name = "ma_dat_phong")
    private String maDatPhong;
    @Column(name = "ho_ten_khach_hang")
    private String hoTenKhachHang;
    @Column(name = "so_dien_thoai")
    private String soDienThoai;
    @Column(name = "email")
    private String email;
    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = false)
    private KhachHang khachHang;
    @ManyToOne
    @JoinColumn(name = "ma_phong")
    private Phong phong;
    @Column(name = "tong_tien")
    private double tongTien;
    @Column(name = "tong_tien_tt")
    private double tongTienTT;
    @Column(name = "check_in")
    private LocalDateTime checkIn;
    @Column(name = "check_out")
    private LocalDateTime checkOut;
    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiDon trangThai;
    @Column(name = "ghi_chu")
    private String ghiChu;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ma_danh_gia", unique = true)
    private DanhGia danhGia;
    private int VAT;
    private boolean lanDau;
    private double giamGiaDiemTichLuy;
}
