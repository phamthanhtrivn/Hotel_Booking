package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChiTietLoaiGiuongId implements Serializable {
    private String loaiPhong;
    private String loaiGiuong;
}