package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ChiTietTienNghiId implements Serializable {
    private String tienNghi;
    private String loaiPhong;
}