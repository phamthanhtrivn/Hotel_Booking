package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.DatPhongRequest;
import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.repository.KhachHangRepository;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhachHangService {
    private KhachHangRepository repo;
    private IdUtil idUtil;

    public KhachHangService(KhachHangRepository repo, IdUtil idUtil) {
        this.repo = repo;
        this.idUtil = idUtil;
    }

    public List<KhachHang> getAll() {
        return repo.findAll();
    }

    public KhachHang getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public KhachHang save(KhachHang khachHang) {
        if (repo.existsById(khachHang.getMaKhachHang())) {
            return null;
        }
        return repo.save(khachHang);
    }

    public KhachHang getOrCreateCustomer(DatPhongRequest req) {
        KhachHang khachHang = null;

        if (req.maKhachHang != null && !req.maKhachHang.trim().isEmpty()) {
            khachHang = repo.findById(req.maKhachHang).orElse(null);
        }

        if (khachHang == null) {
            khachHang = new KhachHang();
            khachHang.setMaKhachHang(idUtil.generateUniqueCodeForCustomer());
            khachHang.setHoTenKH(req.hoTenKhachHang);
            khachHang.setSoDienThoai(req.soDienThoai);
            repo.save(khachHang);
        }
        return khachHang;
    }

    public void deleteById(String id) {
        if (!repo.existsById(id)) {
            return;
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
