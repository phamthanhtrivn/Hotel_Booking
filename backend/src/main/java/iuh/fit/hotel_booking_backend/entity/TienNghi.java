package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tien_nghi")
public class TienNghi {
    @Id
    @Column(name = "ma_tien_nghi")
    private String maTienNghi;
    @Column(name = "ten_tien_nghi", nullable = false, unique = true)
    private String tenTienNghi;
    private String icon;
    private String loaiTienNghi;
    @Column(name = "tinh_trang")
    private boolean tinhTrang;
}