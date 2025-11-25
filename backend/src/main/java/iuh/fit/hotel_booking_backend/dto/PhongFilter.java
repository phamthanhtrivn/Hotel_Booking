package iuh.fit.hotel_booking_backend.dto;

import lombok.Data;

@Data
public class PhongFilter {
    private String maLoaiPhong;
    private String viTri;
    private String trangThai;
    private Boolean tinhTrang;
}
