package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.repository.TaiKhoanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaiKhoanService {
    private TaiKhoanRepository repo;

    public TaiKhoanService(TaiKhoanRepository repo) {
        this.repo = repo;
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

    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
