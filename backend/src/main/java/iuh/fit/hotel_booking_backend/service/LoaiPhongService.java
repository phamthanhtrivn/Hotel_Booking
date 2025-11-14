package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.entity.TrangThaiPhong;
import iuh.fit.hotel_booking_backend.helper.LoaiPhongSpecification;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<LoaiPhongDTO> getAllLoaiPhongDTO() {
        List<LoaiPhong> list = repo.findAll();

        return list.stream().map(loaiPhong -> {
            LoaiPhongDTO dto = new LoaiPhongDTO();
            dto.setLoaiPhong(loaiPhong);
            long soPhongTrong = loaiPhong.getPhongList() != null
                    ? loaiPhong.getPhongList().stream()
                    .filter(p -> p.getTrangThai() == TrangThaiPhong.TRONG)
                    .count()
                    : 0;
            dto.setSoPhongTrong(soPhongTrong);
            return dto;
        }).collect(Collectors.toList());
    }

    public List<LoaiPhongDTO> searchAdvancedDTO(
            LocalDateTime checkIn,
            LocalDateTime checkOut,
            String tenLoaiPhong,
            Integer soKhach,
            Double minGia,
            Double maxGia,
            Double minDienTich,
            Double maxDienTich,
            String maGiuong
    ) {

        Specification<LoaiPhong> spec = Specification.allOf(
                LoaiPhongSpecification.phongTrong(checkIn, checkOut),
                LoaiPhongSpecification.tenLoaiPhongContains(tenLoaiPhong),
                LoaiPhongSpecification.soKhachGreaterOrEqual(soKhach),
                LoaiPhongSpecification.giaBetween(minGia, maxGia),
                LoaiPhongSpecification.dienTichBetween(minDienTich, maxDienTich),
                LoaiPhongSpecification.loaiGiuong(maGiuong)
        );

        List<LoaiPhong> list = repo.findAll(spec);

        return list.stream()
                .map(lp -> {
                    long soPhongTrong = repo.countPhongTrong(
                            lp.getMaLoaiPhong(), checkIn, checkOut
                    );

                    LoaiPhongDTO dto = new LoaiPhongDTO();
                    dto.setLoaiPhong(lp);
                    dto.setSoPhongTrong(soPhongTrong);
                    return dto;
                })
                .collect(Collectors.toList());
    }

}
