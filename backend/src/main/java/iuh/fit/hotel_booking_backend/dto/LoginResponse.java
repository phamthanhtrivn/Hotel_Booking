package iuh.fit.hotel_booking_backend.dto;

import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private TaiKhoan taiKhoan;
}
