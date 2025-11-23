package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "danh_gia")
public class DanhGia {
    @Id
    @Column(name = "ma_danh_gia")
    private String maDanhGia;
    @Column(name = "diem_sach_se")
    private int diemSachSe;
    @Column(name = "diem_dich_vu")
    private int diemDichVu;
    @Column(name = "diem_co_so_vat_chat")
    private int diemCoSoVatChat;
    @Column(name = "binh_luan")
    private String binhLuan;
    @ManyToOne
    @JoinColumn(name = "ma_loai_phong", nullable = false)
    @JsonIgnore
    private LoaiPhong loaiPhong;
    @Column(name = "thoi_gian_danh_gia")
    private LocalDateTime thoiGianDanhGia;

    @OneToOne(mappedBy = "danhGia")
    @JsonIgnore
    private DonDatPhong donDatPhong;

    @Column(name = "tinh_trang")
    private boolean tinhTrang;

    @Transient
    private String hoTenKhachHang;

    @PostLoad
    private void calculateHoTenKhachHang() {
        if (this.donDatPhong != null && this.donDatPhong.getKhachHang() != null) {
            this.hoTenKhachHang = this.donDatPhong.getKhachHang().getHoTenKH();
        }
    }
}
