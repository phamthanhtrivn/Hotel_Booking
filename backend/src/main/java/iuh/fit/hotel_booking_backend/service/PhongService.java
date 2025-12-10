package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.PhongDTO;
import iuh.fit.hotel_booking_backend.dto.PhongFilter;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.entity.Phong;
import iuh.fit.hotel_booking_backend.helper.PhongSpecification;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import iuh.fit.hotel_booking_backend.repository.PhongRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PhongService {
    private PhongRepository repo;
    private LoaiPhongRepository loaiPhongRepository;

    public PhongService(PhongRepository repo, LoaiPhongRepository loaiPhongRepository) {
        this.repo = repo;
        this.loaiPhongRepository = loaiPhongRepository;
    }

    public Phong getAvailableRoomByRoomType(String idLoaiPhong, LocalDateTime checkIn, LocalDateTime checkOut) throws Exception {
        List<Phong> rooms = repo.findAvailableRoomsForUpdate(
                idLoaiPhong,
                checkIn,
                checkOut,
                PageRequest.of(0, 1)
        );
        if (rooms.isEmpty()) {
            throw new Exception("Phòng không còn trống");
        }
        return rooms.get(0);
    }

    public Page<Phong> searchPhong(PhongFilter filter, Pageable pageable) {
        return repo.findAll(PhongSpecification.filter(filter), pageable);
    }

    public List<Phong> getAll() {
        return repo.findAll();
    }

    public Phong getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public Phong save(PhongDTO dto) {
        Phong p = repo.findById(dto.getMaPhong())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng"));
        p.setTenPhong(dto.getTenPhong());
        p.setViTri(dto.getViTri());
        p.setTrangThai(dto.getTrangThai());
        p.setTinhTrang(dto.isTinhTrang());
        p.setLoaiPhong(loaiPhongRepository.findById(dto.getMaLoaiPhong())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy loại phòng")));
        return repo.save(p);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
