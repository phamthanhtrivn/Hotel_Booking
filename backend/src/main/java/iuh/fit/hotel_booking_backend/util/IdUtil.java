package iuh.fit.hotel_booking_backend.util;

import iuh.fit.hotel_booking_backend.repository.TaiKhoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
@RequiredArgsConstructor
public class IdUtil {
    private final TaiKhoanRepository taiKhoanRepository;

    public String generateUniqueCode(String prefix) {
        String code;
        do {
            code = prefix + randomCode(10);
        } while (taiKhoanRepository.existsTaiKhoanByMaTaiKhoan(code));
        return code;
    }

    private String randomCode(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
