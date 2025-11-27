package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghi;
import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghiId;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.entity.TienNghi;
import iuh.fit.hotel_booking_backend.repository.ChiTietTienNghiRepository;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import iuh.fit.hotel_booking_backend.repository.TienNghiRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ChiTietTienNghiService {
    private final LoaiPhongRepository loaiPhongRepository;
    private final TienNghiRepository tienNghiRepository;
    private ChiTietTienNghiRepository repo;

    public ChiTietTienNghiService(ChiTietTienNghiRepository repo, LoaiPhongRepository loaiPhongRepository, TienNghiRepository tienNghiRepository) {
        this.repo = repo;
        this.loaiPhongRepository = loaiPhongRepository;
        this.tienNghiRepository = tienNghiRepository;
    }

    public List<ChiTietTienNghi> getAll() {
        return repo.findAll();
    }

    public ChiTietTienNghi getById(ChiTietTienNghiId id) {
        return repo.findById(id).orElse(null);
    }

    public void saveChiTietTienNghi(String maLoaiPhong, List<String> tienNghiIds) {
        List<ChiTietTienNghi> chiTietTienNghis = new ArrayList<>();

        for (String maTienNghi : tienNghiIds) {
            ChiTietTienNghi chiTiet = new ChiTietTienNghi();
            ChiTietTienNghiId id = new ChiTietTienNghiId();
            id.setLoaiPhong(maLoaiPhong);
            id.setTienNghi(maTienNghi);
            chiTiet.setId(id);

            chiTiet.setLoaiPhong(loaiPhongRepository.getReferenceById(maLoaiPhong));
            chiTiet.setTienNghi(tienNghiRepository.getReferenceById(maTienNghi));

            chiTietTienNghis.add(chiTiet);
        }

        repo.saveAll(chiTietTienNghis);
    }

    public void updateChiTietTienNghi(String maLoaiPhong, List<String> newTienNghiIds) {
        if (newTienNghiIds == null) newTienNghiIds = new ArrayList<>();

        List<ChiTietTienNghi> current = repo.findByLoaiPhongMaLoaiPhong(maLoaiPhong);

        Set<String> currentIds = current.stream()
                .map(ct -> ct.getTienNghi().getMaTienNghi())
                .collect(Collectors.toSet());

        Set<String> newIds = new HashSet<>(newTienNghiIds);

        List<ChiTietTienNghi> toRemove = current.stream()
                .filter(ct -> !newIds.contains(ct.getTienNghi().getMaTienNghi()))
                .collect(Collectors.toList());

        List<String> toAdd = newTienNghiIds.stream()
                .filter(id -> !currentIds.contains(id))
                .collect(Collectors.toList());

        if (!toRemove.isEmpty()) {
            repo.deleteAll(toRemove);
        }

        if (!toAdd.isEmpty()) {
            saveChiTietTienNghi(maLoaiPhong, toAdd);
        }
    }
    public void deleteById(ChiTietTienNghiId id) {
        repo.deleteById(id);
    }
}
