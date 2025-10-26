package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.LoaiGiuong;
import iuh.fit.hotel_booking_backend.repository.LoaiGiuongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoaiGiuongService {
    private LoaiGiuongRepository repo;

    public LoaiGiuongService(LoaiGiuongRepository repo) {
        this.repo = repo;
    }

    public List<LoaiGiuong> getAll() {
        return repo.findAll();
    }

    public LoaiGiuong getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public LoaiGiuong save(LoaiGiuong loaiGiuong) {
        return repo.save(loaiGiuong);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
