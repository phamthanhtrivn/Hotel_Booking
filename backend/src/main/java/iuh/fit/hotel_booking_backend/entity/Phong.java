package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
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
    @Column(name = "maPhong")
    private String maPhong;
    @ManyToOne
    @JoinColumn(name = "ma_loai_phong", nullable = false)
    private LoaiPhong loaiPhong;
    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiPhong trangThai;
    @Column(name = "vi_tri")
    private String viTri;
    @Column(name = "tinh_trang")
    private boolean tinhTrang;
}
