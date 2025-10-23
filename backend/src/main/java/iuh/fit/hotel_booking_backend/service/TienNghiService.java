package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.TienNghi;
import iuh.fit.hotel_booking_backend.repository.TienNghiRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TienNghiService {
    private TienNghiRepository repo;

    public TienNghiService(TienNghiRepository repo) {
        this.repo = repo;
    }

    public List<TienNghi> getAll() {
        return repo.findAll();
    }

    public TienNghi getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public TienNghi save(TienNghi tienNghi) {
        return repo.save(tienNghi);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
