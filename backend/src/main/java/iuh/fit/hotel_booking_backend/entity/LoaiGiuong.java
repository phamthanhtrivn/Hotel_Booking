package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
@Table(name = "loai_giuong")
public class LoaiGiuong {
    @Id
    @Column(name = "ma_giuong")
    private String maGiuong;

    @NotBlank(message = "Vui lòng nhập tên giường")
    @Column(name = "ten_giuong", nullable = false)
    private String tenGiuong;

    @NotBlank(message = "Vui lòng nhập mô tả")
    @Column(name = "mo_ta")
    private String moTa;

    @OneToMany(mappedBy = "loaiGiuong", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ChiTietLoaiGiuong> chiTietLoaiGiuongList = new ArrayList<>();

    @Column(name = "tinh_trang")
    private boolean tinhTrang;
}
