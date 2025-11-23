package iuh.fit.hotel_booking_backend.util;

import iuh.fit.hotel_booking_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
@RequiredArgsConstructor
public class IdUtil {
    private final TaiKhoanRepository taiKhoanRepository;
    private final LoaiPhongRepository loaiPhongRepository;
    private final KhachHangRepository khachHangRepository;
    private final TienNghiRepository tienNghiRepository;
    private final LoaiGiuongRepository loaiGiuongRepository;
    private final DonDatPhongRepository donDatPhongRepository;

    public String generateUniqueCode(String prefix) {
        String code;
        do {
            code = prefix + randomCode(10);
        } while (taiKhoanRepository.existsTaiKhoanByMaTaiKhoan(code));
        return code;
    }

    public String generateUniqueCodeForRoomType() {
        String code;
        do {
            code = "LP" + randomCode(10);
        } while (loaiPhongRepository.existsLoaiPhongByMaLoaiPhong(code));
        return code;
    }

    public String generateUniqueCodeForCustomer() {
        String code;
        do {
            code = "KH" + randomCode(10);
        } while (khachHangRepository.existsById(code));
        return code;
    }
    public String generateUniqueCodeForTienNghi() {
        String code;
        do {
            code = "TN" + randomCode(10);
        } while (tienNghiRepository.existsTienNGhiByMaTienNghi(code));
        return code;
    }

    public String generateUniqueCodeForLoaiGiuong() {
        String code;
        do {
            code = "LG" + randomCode(10);
        } while (loaiGiuongRepository.existsLoaiGiuongByMaGiuong(code));
        return code;
    }

    public String generateUniqueCodeForDonDatPhong() {
        String code;
        do {
            code = "DP" + randomCode(10);
        } while (donDatPhongRepository.existsDonDatPhongByMaDatPhong(code));
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
