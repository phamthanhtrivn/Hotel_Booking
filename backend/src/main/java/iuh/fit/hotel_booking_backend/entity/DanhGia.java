package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "Vui lòng chấm điểm sạch sẽ")
    @Min(value = 1, message = "Điểm từ 1 - 10")
    @Max(value = 10, message = "Điểm từ 1 - 10")
    @Column(name = "diem_sach_se")
    private int diemSachSe;

    @NotNull(message = "Vui lòng chấm điểm sạch sẽ")
    @Min(value = 1, message = "Điểm từ 1 - 10")
    @Max(value = 10, message = "Điểm từ 1 - 10")

    @NotNull(message = "Vui lòng chấm điểm dịch vụ")
    @Min(value = 1, message = "Điểm từ 1 - 10")
    @Max(value = 10, message = "Điểm từ 1 - 10")
    @Column(name = "diem_dich_vu")
    private int diemDichVu;

    @NotNull(message = "Vui lòng chấm điểm cơ sở vật chất")
    @Min(value = 1, message = "Điểm từ 1 - 10")
    @Max(value = 10, message = "Điểm từ 1 - 10")
    @Column(name = "diem_co_so_vat_chat")
    private int diemCoSoVatChat;

    @NotBlank(message = "Vui lòng để lại bình luận")
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
