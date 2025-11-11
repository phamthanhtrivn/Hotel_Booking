package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @Column(name = "ten_loai_phong", nullable = false, unique = true)
    private String tenLoaiPhong;
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
    @Column(name = "mo_ta")
    private String moTa;

    public LoaiPhong(String maLoaiPhong) {
        this.maLoaiPhong = maLoaiPhong;
    }
}
