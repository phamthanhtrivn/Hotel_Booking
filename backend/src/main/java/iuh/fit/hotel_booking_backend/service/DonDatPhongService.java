package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.repository.DonDatPhongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonDatPhongService {
    private DonDatPhongRepository repo;

    public DonDatPhongService(DonDatPhongRepository repo) {
        this.repo = repo;
    }

    public List<DonDatPhong> getAll() {
        return repo.findAll();
    }

    public DonDatPhong getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public DonDatPhong save(DonDatPhong donDatPhong) {
        return repo.save(donDatPhong);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
