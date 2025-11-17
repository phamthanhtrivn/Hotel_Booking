package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.repository.TaiKhoanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaiKhoanService {
    private final TaiKhoanRepository repo;

    private final DonDatPhongService donDatPhongService;


    public TaiKhoanService(TaiKhoanRepository repo, DonDatPhongService donDatPhongService) {
        this.repo = repo;
        this.donDatPhongService = donDatPhongService;
    }

    public List<TaiKhoan> getAll() {
        return repo.findAll();
    }

    public TaiKhoan getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public TaiKhoan save(TaiKhoan t) {
        return repo.save(t);
    }


    public boolean deleteById(String id) {
        TaiKhoan tk = repo.findById(id).orElse(null);
        if (tk == null) return false;
        if (tk.getKhachHang() != null) {
            String maKH = tk.getKhachHang().getMaKhachHang();
            int soDon = donDatPhongService.countByKhachHangId(maKH);
            if (soDon > 0) {
                throw new IllegalStateException("Khách hàng đang có đơn đặt phòng, không thể xóa tài khoản!");
            }
        }

        repo.deleteById(id);
        return true;
    }

    public List<TaiKhoan> getAllMembers() {
        return repo.findAllMembers();
    }


    public TaiKhoan getTaiKhoanByEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email không được để trống!");
        }
        TaiKhoan tk = repo.findTaiKhoanByEmail(email);
        if (tk == null) {
            throw new IllegalStateException("Không tìm thấy tài khoản với email: " + email);
        }
        return tk;
    }
}
