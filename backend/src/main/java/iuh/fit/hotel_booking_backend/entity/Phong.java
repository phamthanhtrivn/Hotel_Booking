package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "phong")
public class Phong {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ma_phong")
    private String maPhong;

    @Column(name = "ten_phong")
    @NotBlank
    private String tenPhong;

    @ManyToOne
    @JoinColumn(name = "ma_loai_phong", nullable = false)
    private LoaiPhong loaiPhong;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiPhong trangThai;

    @NotBlank(message = "Vui lòng thêm vị trí")
    @Pattern(regexp = "^(Tầng [1-8])$", message = "Chỉ từ tầng 1 - 8")
    @Column(name = "vi_tri")
    private String viTri;


    @Column(name = "tinh_trang")
    private boolean tinhTrang;

    public String getMaLoaiPhong() {
        return this.loaiPhong != null ? this.loaiPhong.getMaLoaiPhong() : null;
    }

    public String getTenLoaiPhong() {
        return this.loaiPhong != null ? this.loaiPhong.getTenLoaiPhong() : null;
    }
}
