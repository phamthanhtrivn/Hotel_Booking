package iuh.fit.hotel_booking_backend.security.jwt;

import io.github.cdimascio.dotenv.Dotenv;
import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.LoginRequest;
import iuh.fit.hotel_booking_backend.dto.LoginResponse;
import iuh.fit.hotel_booking_backend.dto.SignUpRequest;
import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.entity.LoaiTaiKhoan;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.repository.KhachHangRepository;
import iuh.fit.hotel_booking_backend.repository.TaiKhoanRepository;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import iuh.fit.hotel_booking_backend.util.JwtUtil;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final TaiKhoanRepository taiKhoanRepository;
    private final KhachHangRepository khachHangRepository;
    private final PasswordEncoder passwordEncoder;
    private final IdUtil idUtil;
    private final JwtUtil jwtUtil;
    private final String frontendUrl = Dotenv.load().get("FRONTEND_URL");
    private final JavaMailSenderImpl mailSender;

    public APIResponse<Object> register(SignUpRequest request) {
        APIResponse<Object> response = new APIResponse<Object>();
        response.setSuccess(false);
        response.setData(null);
        if (request.getEmail() == null || request.getEmail().isEmpty() ||
                !request.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            response.setMessage("Email không hợp lệ!");
            return response;
        }
        if (request.getHoTenKH() == null || request.getHoTenKH().isEmpty() ||
                !request.getHoTenKH().matches("^[\\p{L}]+(?: [\\p{L}]+)+$")) {
            response.setMessage("Họ tên không hợp lệ! (Phải có ít nhất 2 từ và không chứa số)");
            return response;
        }
        if (request.getSoDienThoai() == null || request.getSoDienThoai().isEmpty() ||
                !request.getSoDienThoai().matches("^(0[3|5|7|8|9])[0-9]{8}$")) {
            response.setMessage("Số điện thoại không hợp lệ!");
            return response;
        }
        if (request.getMatKhau() == null || request.getMatKhau().isEmpty() ||
                !request.getMatKhau().matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$")) {
            response.setMessage("Mật khẩu phải chứa ít nhất 1 chữ cái, 1 số và từ 6 ký tự trở lên!");
            return response;
        }

        if (taiKhoanRepository.findByEmail(request.getEmail()) != null) {
            response.setMessage("Email đã tồn tại!");
            return response;
        }
        if (khachHangRepository.findKhachHangBySoDienThoai(request.getSoDienThoai()) != null) {
            response.setMessage("Số điện thoại đã tồn tại!");
            return response;
        }

        String maKH = idUtil.generateUniqueCode("KH");
        String maTK = idUtil.generateUniqueCode("TK");

        KhachHang khachHang = new KhachHang();
        khachHang.setMaKhachHang(maKH);
        khachHang.setHoTenKH(request.getHoTenKH());
        khachHang.setSoDienThoai(request.getSoDienThoai());
        khachHang.setDiemTichLuy(0);

        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setMaTaiKhoan(maTK);
        taiKhoan.setEmail(request.getEmail());
        taiKhoan.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
        taiKhoan.setVaiTro(LoaiTaiKhoan.MEMBER);
        taiKhoan.setTinhTrang(true);
        taiKhoan.setKhachHang(khachHang);

        khachHangRepository.save(khachHang);
        taiKhoanRepository.save(taiKhoan);

        response.setSuccess(true);
        response.setMessage("Đăng ký thành công!");

        return response;
    }

    public APIResponse<Object> login(LoginRequest request) {
        APIResponse<Object> response = new APIResponse<>();
        response.setSuccess(false);
        response.setData(null);
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getMatKhau())
            );

            TaiKhoan taiKhoan = taiKhoanRepository.findByEmail(request.getEmail());

            if (taiKhoan == null) {
                response.setMessage("Tài khoản không tồn tại!");
                return response;
            }
            String token = jwtUtil.generateToken(taiKhoan.getEmail(), taiKhoan.getVaiTro().name());

            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(token);
            loginResponse.setTaiKhoan(taiKhoan);

            response.setSuccess(true);
            response.setMessage("Đăng nhập thành công!");
            response.setData(loginResponse);

        } catch (DisabledException e) {
            response.setSuccess(false);
            response.setMessage("Tài khoản chưa được kích hoạt!");
            return response;
        } catch (BadCredentialsException e) {
            response.setSuccess(false);
            response.setMessage("Email hoặc mật khẩu không đúng!");
            return response;
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Lỗi hệ thống!");
            return response;
        }
        return response;
    }

    public ResponseEntity<APIResponse<TaiKhoan>> verifyToken(String authHeader) {
        APIResponse<TaiKhoan> response = new APIResponse<>();
        response.setSuccess(false);
        response.setData(null);

        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.setMessage("Thiếu token hoặc token không hợp lệ");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);

            // Lấy tài khoản theo email
            TaiKhoan taiKhoan = taiKhoanRepository.findByEmail(email);
            if (taiKhoan == null) {
                response.setMessage("Không tìm thấy tài khoản");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            CustomerUserDetails userDetails = new CustomerUserDetails(taiKhoan);

            // Kiểm tra token hợp lệ
            if (!jwtUtil.isTokenValid(token, userDetails)) {
                response.setMessage("Token không hợp lệ hoặc đã hết hạn");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Thành công
            response.setSuccess(true);
            response.setMessage("Token hợp lệ");
            response.setData(taiKhoan);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.setMessage("Lỗi xác thực token: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    public APIResponse<Object> sendResetPasswordEmail(String email) {
        TaiKhoan tk = taiKhoanRepository.findByEmail(email);
        if (tk == null) {
            return new APIResponse<>(false, "Email không tồn tại trong hệ thống", null);
        }

        String token = jwtUtil.generateResetPasswordToken(email);
        String link = frontendUrl + "/reset-password?token=" + token;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("Đặt lại mật khẩu cho tài khoản TWAN HOTEL của bạn");
            helper.setText("""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="color: #d32f2f; text-align: center;">TWAN HOTEL</h2>
                <p style="font-size: 16px; color: #333;">Chào bạn,</p>
                <p style="font-size: 16px; color: #333;">
                    Ai đó (có thể là bạn) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
                </p>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="%s" style="background-color: #d32f2f; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
                        Đặt lại mật khẩu
                    </a>
                </p>
                <p style="font-size: 14px; color: #555;">
                    Liên kết trên sẽ hết hạn trong 15 phút.
                </p>
                <p style="font-size: 14px; color: #555;">
                    Nếu bạn không yêu cầu, vui lòng bỏ qua email này.
                </p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">
                    TWAN HOTEL – Chúng tôi luôn quan tâm đến sự bảo mật của bạn.
                </p>
            </div>
            """.formatted(link), true);

            mailSender.send(message);
            return new APIResponse<>(true, "Link đổi mặt khẩu đã được gửi! Vui lòng kiểm tra email \"" + email + "\" của bạn", null);

        } catch (Exception e) {
            return new APIResponse<>(false, "Không gửi được email: " + e.getMessage(), null);
        }
    }

    public APIResponse<Object> validateResetToken(String token) {
        try {
            if (!jwtUtil.validateResetPasswordToken(token)) {
                return new APIResponse<>(false, "Token không hợp lệ hoặc đã hết hạn", null);
            }
            return new APIResponse<>(true, "Token hợp lệ", null);
        } catch (Exception e) {
            return new APIResponse<>(false, "Lỗi khi kiểm tra token: " + e.getMessage(), null);
        }
    }

    public APIResponse<Void> resetPassword(String token, String newPassword) {
        try {
            if (!jwtUtil.validateResetPasswordToken(token)) {
                return new APIResponse<>(false, "Token không hợp lệ hoặc đã hết hạn", null);
            }

            String email = jwtUtil.extractEmail(token);
            TaiKhoan tk = taiKhoanRepository.findByEmail(email);
            if (tk == null) {
                return new APIResponse<>(false, "Không tìm thấy người dùng", null);
            }

            tk.setMatKhau(passwordEncoder.encode(newPassword));
            taiKhoanRepository.save(tk);

            return new APIResponse<>(true, "Đặt lại mật khẩu thành công", null);

        } catch (Exception e) {
            return new APIResponse<>(false, "Lỗi khi đặt lại mật khẩu: " + e.getMessage(), null);
        }
    }

}
