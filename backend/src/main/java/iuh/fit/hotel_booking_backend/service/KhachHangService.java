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
        return repo.save(khachHang);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
