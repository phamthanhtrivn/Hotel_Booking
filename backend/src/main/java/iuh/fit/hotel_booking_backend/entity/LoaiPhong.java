package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "loai_phong")
public class LoaiPhong {
    @Id
    @Column(name = "ma_loai_phong")
    private String maLoaiPhong;
    @NotBlank
    @Column(name = "ten_loai_phong", nullable = false, unique = true)
    private String tenLoaiPhong;

    @Min(value = 25, message = "Diên tích phải lớn hơn 25 m2")
    @Column(name = "dien_tich")
    private double dienTich;
    @Column(name = "so_khach")
    private int soKhach;
    @Column(name = "gia")
    private double gia;
    @ElementCollection
    @CollectionTable(
            name = "hinh_anh",
            joinColumns = @JoinColumn(name = "ma_loai_phong")
    )
    @Column(name = "url")
    private List<String> hinhAnh;
    @Column(name = "mo_ta", columnDefinition = "TEXT")
    private String moTa;

    @OneToMany(mappedBy = "loaiPhong", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ChiTietLoaiGiuong> chiTietLoaiGiuongList = new ArrayList<>();

    @OneToMany(mappedBy = "loaiPhong", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Phong> phongList = new ArrayList<>();
    @Column(name = "tinh_trang")
    private boolean tinhTrang;
}
