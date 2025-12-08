package iuh.fit.hotel_booking_backend.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class LoaiPhongSearchRequest {
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String tenLoaiPhong;
    private Integer soKhach;
    private Integer[] treEm;
    private Double minGia;
    private Double maxGia;
    private Boolean tinhTrang;
    private Double minDienTich;
    private Double maxDienTich;
    private String maGiuong;
}
