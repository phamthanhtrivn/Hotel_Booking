package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.Phong;
import iuh.fit.hotel_booking_backend.repository.PhongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhongService {
    private PhongRepository repo;

    public PhongService(PhongRepository repo) {
        this.repo = repo;
    }

    public Phong getAvailableRoomByRoomType(String idLoaiPhong) {
        return repo.findFirstAvailableRoomNative(idLoaiPhong)
                .orElse(null);
    }

    public List<Phong> getAll() {
        return repo.findAll();
    }

    public Phong getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public Phong save(Phong phong) {
        return repo.save(phong);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
