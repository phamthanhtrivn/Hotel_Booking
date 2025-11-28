package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank(message = "Vui lòng nhập tên tiện nghi")
    @Column(name = "ten_tien_nghi", nullable = false, unique = true)
    private String tenTienNghi;

    private String icon;

    @NotBlank(message = "Vui lòng chọn loại tiện nghi")
    private String loaiTienNghi;

    @Column(name = "tinh_trang")
    private boolean tinhTrang;
}