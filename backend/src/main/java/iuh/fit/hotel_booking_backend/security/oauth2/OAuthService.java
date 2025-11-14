package iuh.fit.hotel_booking_backend.security.oauth2;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.LoginResponse;
import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.entity.LoaiTaiKhoan;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.repository.KhachHangRepository;
import iuh.fit.hotel_booking_backend.repository.TaiKhoanRepository;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import iuh.fit.hotel_booking_backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthService {
    private final TaiKhoanRepository taiKhoanRepository;
    private final KhachHangRepository khachHangRepository;
    private final PasswordEncoder passwordEncoder;
    private final IdUtil idUtil;
    private final JwtUtil jwtUtil;

    public APIResponse<LoginResponse> processOAuthPostLogin(String email, String name) {
        TaiKhoan taiKhoan = taiKhoanRepository.findByEmail(email);
        if (taiKhoan == null) {
            taiKhoan = createNewOAuthUser(email, name);
        }

        String token = jwtUtil.generateToken(taiKhoan.getEmail(), taiKhoan.getVaiTro().name());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(token);
        loginResponse.setTaiKhoan(taiKhoan);

        return new APIResponse<>(true, "Đăng nhập Google thành công", loginResponse);
    }

    private TaiKhoan createNewOAuthUser(String email, String name) {
        String maKH = idUtil.generateUniqueCode("KH");
        KhachHang khachHang = new KhachHang();
        khachHang.setMaKhachHang(maKH);
        khachHang.setHoTenKH(name);
        khachHang.setSoDienThoai("");
        khachHang.setDiemTichLuy(0);
        khachHangRepository.save(khachHang);

        String maTK = idUtil.generateUniqueCode("TK");
        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setMaTaiKhoan(maTK);
        taiKhoan.setEmail(email);
        taiKhoan.setMatKhau(passwordEncoder.encode("oauth2user"));
        taiKhoan.setVaiTro(LoaiTaiKhoan.MEMBER);
        taiKhoan.setActive(false);
        taiKhoan.setKhachHang(khachHang);

        taiKhoanRepository.save(taiKhoan);
        return taiKhoan;
    }
}
