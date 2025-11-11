package iuh.fit.hotel_booking_backend.dto;

import lombok.Data;

@Data
public class SignUpRequest {
    private String email;
    private String matKhau;
    private String hoTenKH;
    private String soDienThoai;
}
