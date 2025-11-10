package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.LoginRequest;
import iuh.fit.hotel_booking_backend.dto.LoginResponse;
import iuh.fit.hotel_booking_backend.dto.SignUpRequest;
import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.entity.LoaiTaiKhoan;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.repository.KhachHangRepository;
import iuh.fit.hotel_booking_backend.repository.TaiKhoanRepository;
import iuh.fit.hotel_booking_backend.security.CustomerUserDetails;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import iuh.fit.hotel_booking_backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
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
        taiKhoan.setActive(false);
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
            if (Boolean.FALSE.equals(taiKhoan.isActive())) {
                taiKhoan.setActive(true);
                taiKhoanRepository.save(taiKhoan);
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
            throw e;
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
}
