package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.ChiTietLoaiGiuongRequest;
import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuong;
import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuongId;
import iuh.fit.hotel_booking_backend.entity.LoaiGiuong;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.repository.ChiTietLoaiGiuongRepository;
import iuh.fit.hotel_booking_backend.repository.LoaiGiuongRepository;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChiTietLoaiGiuongService {
    private final LoaiPhongRepository loaiPhongRepository;
    private final LoaiGiuongRepository loaiGiuongRepository;
    private ChiTietLoaiGiuongRepository repo;

    public ChiTietLoaiGiuongService(ChiTietLoaiGiuongRepository repo, LoaiPhongRepository loaiPhongRepository, LoaiGiuongRepository loaiGiuongRepository) {
        this.repo = repo;
        this.loaiPhongRepository = loaiPhongRepository;
        this.loaiGiuongRepository = loaiGiuongRepository;
    }

    public List<ChiTietLoaiGiuong> getAll() {
        return repo.findAll();
    }

    public ChiTietLoaiGiuong getById(ChiTietLoaiGiuongId id) {
        return repo.findById(id).orElse(null);
    }

    public List<ChiTietLoaiGiuong> findByLoaiPhong(String maLoaiPhong) {
        return repo.findByLoaiPhongMaLoaiPhong(maLoaiPhong);
    }

    public void saveChiTietLoaiGiuong(String maLoaiPhong, List<ChiTietLoaiGiuongRequest> chiTietGiuongs) {
        List<ChiTietLoaiGiuong> chiTietLoaiGiuongs = new ArrayList<>();

        for (ChiTietLoaiGiuongRequest request : chiTietGiuongs) {
            ChiTietLoaiGiuong chiTiet = new ChiTietLoaiGiuong();

            ChiTietLoaiGiuongId id = new ChiTietLoaiGiuongId();
            id.setLoaiPhong(maLoaiPhong);
            id.setLoaiGiuong(request.getMaGiuong());
            chiTiet.setId(id);

            chiTiet.setLoaiPhong(loaiPhongRepository.getReferenceById(maLoaiPhong));
            chiTiet.setLoaiGiuong(loaiGiuongRepository.getReferenceById(request.getMaGiuong()));

            chiTiet.setSoGiuong(request.getSoGiuong());

            chiTietLoaiGiuongs.add(chiTiet);
        }

        repo.saveAll(chiTietLoaiGiuongs);
    }

    @Transactional
    public void updateChiTietLoaiGiuong(String maLoaiPhong, List<ChiTietLoaiGiuongRequest> newChiTietGiuongs) {
        try {
            if (newChiTietGiuongs == null) newChiTietGiuongs = new ArrayList<>();

            List<ChiTietLoaiGiuong> currentGiuongs = repo.findByLoaiPhongMaLoaiPhong(maLoaiPhong);

            if (!newChiTietGiuongs.isEmpty()) {
                processSmartUpdate(maLoaiPhong, currentGiuongs, newChiTietGiuongs);
            } else {
                repo.deleteByLoaiPhongMaLoaiPhong(maLoaiPhong);
                repo.flush();
            }

        } catch (Exception e) {
            System.err.println("Lỗi trong updateChiTietLoaiGiuong: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    private void processSmartUpdate(String maLoaiPhong,
                                    List<ChiTietLoaiGiuong> currentGiuongs,
                                    List<ChiTietLoaiGiuongRequest> newChiTietGiuongs) {

        Map<String, ChiTietLoaiGiuong> currentMap = currentGiuongs.stream()
                .collect(Collectors.toMap(
                        ct -> ct.getLoaiGiuong().getMaGiuong(),
                        ct -> ct
                ));

        Map<String, ChiTietLoaiGiuongRequest> newMap = newChiTietGiuongs.stream()
                .collect(Collectors.toMap(
                        ChiTietLoaiGiuongRequest::getMaGiuong,
                        ct -> ct
                ));

        List<ChiTietLoaiGiuong> toUpdate = new ArrayList<>();
        List<ChiTietLoaiGiuong> toRemove = new ArrayList<>();
        List<ChiTietLoaiGiuongRequest> toAdd = new ArrayList<>();

        // Kiểm tra giường hiện tại
        for (ChiTietLoaiGiuong current : currentGiuongs) {
            String maGiuong = current.getLoaiGiuong().getMaGiuong();
            ChiTietLoaiGiuongRequest newRequest = newMap.get(maGiuong);

            if (newRequest == null) {
                toRemove.add(current);
            } else if (current.getSoGiuong() != newRequest.getSoGiuong()) {
                current.setSoGiuong(newRequest.getSoGiuong());
                toUpdate.add(current);
            }
        }

        for (ChiTietLoaiGiuongRequest newRequest : newChiTietGiuongs) {
            if (!currentMap.containsKey(newRequest.getMaGiuong())) {
                toAdd.add(newRequest);
            }
        }
        if (!toRemove.isEmpty()) {
            repo.deleteAll(toRemove);
            repo.flush();
        }

        if (!toUpdate.isEmpty()) {
            repo.saveAll(toUpdate);
        }

        if (!toAdd.isEmpty()) {
            saveChiTietLoaiGiuong(maLoaiPhong, toAdd);
        }
    }

    public void delete(ChiTietLoaiGiuongId id) {
        repo.deleteById(id);
    }

}
