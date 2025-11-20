package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuong;
import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuongId;
import iuh.fit.hotel_booking_backend.repository.ChiTietLoaiGiuongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChiTietLoaiGiuongService {
    private ChiTietLoaiGiuongRepository repo;

    public ChiTietLoaiGiuongService(ChiTietLoaiGiuongRepository repo) {
        this.repo = repo;
    }

    public List<ChiTietLoaiGiuong> getAll() {
        return repo.findAll();
    }

    public ChiTietLoaiGiuong getById(ChiTietLoaiGiuongId id) {
        return repo.findById(id).orElse(null);
    }

    public ChiTietLoaiGiuong save(ChiTietLoaiGiuong chiTietLoaiGiuong) {
        return repo.save(chiTietLoaiGiuong);
    }

    public void delete(ChiTietLoaiGiuongId id) {
        repo.deleteById(id);
    }

}
