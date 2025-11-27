package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chi_tiet_tien_nghi")
public class ChiTietTienNghi {

    @EmbeddedId
    private ChiTietTienNghiId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tienNghi")
    @JoinColumn(name = "ma_tien_nghi", nullable = false)
    private TienNghi tienNghi;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("loaiPhong")
    @JoinColumn(name = "ma_loai_phong", nullable = false)
    private LoaiPhong loaiPhong;

}
