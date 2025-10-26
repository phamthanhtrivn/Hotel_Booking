package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "loai_giuong")
public class LoaiGiuong {
    @Id
    @Column(name = "ma_giuong")
    private String maGiuong;
    @Column(name = "ten_giuong", nullable = false)
    private String tenGiuong;
    @Column(name = "mo_ta")
    private String moTa;
}
