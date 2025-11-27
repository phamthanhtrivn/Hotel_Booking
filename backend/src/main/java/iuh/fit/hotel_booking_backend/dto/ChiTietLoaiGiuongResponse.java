package iuh.fit.hotel_booking_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChiTietLoaiGiuongResponse {
    private String maGiuong;
    private String tenGiuong;
    private int soGiuong;
}