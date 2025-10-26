package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.DanhGia;
import iuh.fit.hotel_booking_backend.repository.DanhGiaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DanhGiaService {
    private DanhGiaRepository repo;

    public DanhGiaService(DanhGiaRepository repo) {
        this.repo = repo;
    }

    public List<DanhGia> getAll() {
        return repo.findAll();
    }

    public DanhGia getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public DanhGia save(DanhGia danhGia) {
        return repo.save(danhGia);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
