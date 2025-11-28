package iuh.fit.hotel_booking_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SignUpRequest {
    private String email;
    private String matKhau;
    private String hoTenKH;
    @NotBlank(message = "Vui lòng nhập số điện thoại")
    @Pattern(regexp = "^(\\+?84|0)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$", message = "Số điện thoại không hợp lệ")
    private String soDienThoai;
}
