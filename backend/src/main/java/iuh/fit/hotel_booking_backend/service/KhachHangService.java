package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.repository.KhachHangRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhachHangService {
    private KhachHangRepository repo;

    public KhachHangService(KhachHangRepository repo) {
        this.repo = repo;
    }

    public List<KhachHang> getAll() {
        return repo.findAll();
    }

    public KhachHang getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public KhachHang save(KhachHang khachHang) {
        if (repo.existsById(khachHang.getMaKhachHang())){
            return null;
        }
        return repo.save(khachHang);
    }

    public void deleteById(String id) {
        if (!repo.existsById(id)){
            return ;
        }
        repo.deleteById(id);
    }

    // Tìm kiếm theo tên hoặc sdt
    public List<KhachHang> search(String keyword) {
        return repo.searchByKeyword(keyword);
    }

    // update
    public boolean update(String id, KhachHang updatedKhachHang) {
        KhachHang existing = repo.findById(id).orElse(null);
        if (existing == null) return false;

        if (updatedKhachHang.getHoTenKH() != null)
            existing.setHoTenKH(updatedKhachHang.getHoTenKH());
        if (updatedKhachHang.getSoDienThoai() != null)
            existing.setSoDienThoai(updatedKhachHang.getSoDienThoai());
        if (updatedKhachHang.getDiemTichLuy() > 0)
            existing.setDiemTichLuy(updatedKhachHang.getDiemTichLuy());

        repo.save(existing);
        return true;
    }
}
