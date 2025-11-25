package iuh.fit.hotel_booking_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chi_tiet_loai_giuong")
public class ChiTietLoaiGiuong {

    @EmbeddedId
    private ChiTietLoaiGiuongId id;

    @ManyToOne
    @MapsId("loaiPhong")
    @JoinColumn(name = "ma_loai_phong", nullable = false)
    private LoaiPhong loaiPhong;

    @ManyToOne
    @MapsId("loaiGiuong")
    @JoinColumn(name = "ma_giuong", nullable = false)
    private LoaiGiuong loaiGiuong;

    @Column(name = "so_giuong")
    private int soGiuong;

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChiTietLoaiGiuongId implements Serializable {
        private String loaiPhong;
        private String loaiGiuong;
    }
}
