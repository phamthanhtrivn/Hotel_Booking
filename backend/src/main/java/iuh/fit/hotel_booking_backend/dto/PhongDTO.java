package iuh.fit.hotel_booking_backend.dto;

import iuh.fit.hotel_booking_backend.entity.TrangThaiPhong;
import lombok.Data;

@Data
public class PhongDTO {
    private String maPhong;
    private String tenPhong;
    private String maLoaiPhong;
    private String viTri;
    private TrangThaiPhong trangThai;
    private boolean tinhTrang;
}
