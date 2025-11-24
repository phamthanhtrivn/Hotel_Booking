package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghi;
import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghiId;
import iuh.fit.hotel_booking_backend.repository.ChiTietTienNghiRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChiTietTienNghiService {
    private ChiTietTienNghiRepository repo;

    public ChiTietTienNghiService(ChiTietTienNghiRepository repo) {
        this.repo = repo;
    }

    public List<ChiTietTienNghi> getAll() {
        return repo.findAll();
    }

    public ChiTietTienNghi getById(ChiTietTienNghiId id) {
        return repo.findById(id).orElse(null);
    }

    public ChiTietTienNghi save(ChiTietTienNghi chiTietTienNghi) {
        return repo.save(chiTietTienNghi);
    }

    public void deleteById(ChiTietTienNghiId id) {
        repo.deleteById(id);
    }
}
