package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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

    @NotBlank(message = "Vui lòng nhập tên khách hàng")
    @Pattern(regexp = "^(?:[A-ZÀ-Ỹ][a-zà-ỹ]*)(?:\\s+[A-ZÀ-Ỹ][a-zà-ỹ]*)+$", message = "Viết hoa mỗi chữ cái đầu, ít nhất 2 từ gồm họ và tên")
    @Column(name = "ho_ten_khach_hang")
    private String hoTenKhachHang;

    @NotBlank(message = "Vui lòng nhập số điện thoại")
    @Pattern(regexp = "^(\\+?84|0)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$", message = "Số điện thoại không hợp lệ")
    @Column(name = "so_dien_thoai")
    private String soDienThoai;

    @NotBlank(message = "Vui lòng nhập email")
    @Pattern(regexp = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$", message = "Email không hợp lệ")
    @Column(name = "email")
    private String email;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang")
    private KhachHang khachHang;

    @ManyToOne
    @JoinColumn(name = "ma_phong")
    private Phong phong;

    @NotNull
    @Column(name = "tong_tien")
    private double tongTien;

    @NotNull
    @Column(name = "tong_tien_tt")
    private double tongTienTT;

    @Column(name = "check_in")
    private LocalDateTime checkIn;

    @Column(name = "check_out")
    private LocalDateTime checkOut;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime ngayTao;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiDon trangThai;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ma_danh_gia", unique = true)
    private DanhGia danhGia;

    @Column(name = "vat")
    private double VAT;

    @Column(name = "giam_gia_lan_dau")
    private double giamGiaLanDau;

    @Column(name = "giam_gia_diem_tich_luy")
    private double giamGiaDiemTichLuy;

    public DonDatPhong(String maDatPhong) {
        this.maDatPhong = maDatPhong;
    }
}
