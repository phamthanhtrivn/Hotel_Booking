package iuh.fit.hotel_booking_backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LoaiPhongSearchRequest {
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private String tenLoaiPhong;
    private Integer soKhach;
    private Double minGia;
    private Double maxGia;
    private Double minDienTich;
    private Double maxDienTich;
    private String maGiuong;
}
