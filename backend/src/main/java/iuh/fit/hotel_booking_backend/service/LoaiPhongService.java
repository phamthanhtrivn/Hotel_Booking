package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoaiPhongService {
    private LoaiPhongRepository repo;

    public LoaiPhongService(LoaiPhongRepository repo) {
        this.repo = repo;
    }

    public List<LoaiPhong> getAll() {
        return repo.findAll();
    }

    public LoaiPhong getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public LoaiPhong save(LoaiPhong loaiPhong) {
        return repo.save(loaiPhong);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
