package iuh.fit.hotel_booking_backend.dto;

import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoaiPhongDTO {
    private LoaiPhong loaiPhong;
    private long soPhongTrong;
}
