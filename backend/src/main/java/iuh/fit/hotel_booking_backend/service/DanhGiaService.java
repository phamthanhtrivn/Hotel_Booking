package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.*;
import iuh.fit.hotel_booking_backend.entity.DanhGia;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.repository.DanhGiaRepository;
import iuh.fit.hotel_booking_backend.repository.DonDatPhongRepository;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DanhGiaService {
    private DanhGiaRepository repo;
    private DonDatPhongRepository donDatPhongRepo;
    private LoaiPhongRepository loaiPhongRepo;

    public DanhGiaService(DanhGiaRepository repo, DonDatPhongRepository donDatPhongRepo, LoaiPhongRepository loaiPhongRepo) {
        this.repo = repo;
        this.donDatPhongRepo = donDatPhongRepo;
        this.loaiPhongRepo = loaiPhongRepo;
    }

    public Page<DanhGia> findByLoaiPhong(String id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("thoiGianDanhGia").descending());
        return repo.findByLoaiPhongPagable(id, pageable);
    }

    public ReviewStatsDTO getReviewStats(String maLoaiPhong) {
        List<DanhGia> allReviews = repo.findByLoaiPhong(maLoaiPhong);

        if (allReviews.isEmpty()) {
            return new ReviewStatsDTO(null, 0, "", 0.0, 0.0, 0.0, 0);
        }
        int numOfReviews = allReviews.size();

        double totalService = 0;
        double totalClean = 0;
        double totalFacilities = 0;

        for (DanhGia review : allReviews) {
            totalService += review.getDiemDichVu();
            totalClean += review.getDiemSachSe();
            totalFacilities += review.getDiemCoSoVatChat();
        }

        double avgService = totalService / numOfReviews;
        double avgClean = totalClean / numOfReviews;
        double avgFacilities = totalFacilities / numOfReviews;
        double avg = (avgService + avgClean + avgFacilities) / 3;

        String ratingText = getRatingText(avg);

        List<DanhGia> top5 = allReviews.stream()
                .sorted((a, b) -> {
                    double avgA = (a.getDiemDichVu() + a.getDiemSachSe() + a.getDiemCoSoVatChat()) / 3.0;
                    double avgB = (b.getDiemDichVu() + b.getDiemSachSe() + b.getDiemCoSoVatChat()) / 3.0;

                    return Double.compare(avgB, avgA);
                })
                .limit(5)
                .collect(Collectors.toList());

        return new ReviewStatsDTO(
                top5,
                numOfReviews,
                ratingText,
                avgService,
                avgClean,
                avgFacilities,
                avg
        );
    }

    private String getRatingText(double score) {
        if (score >= 8.5) return "Rất tốt";
        if (score >= 7.5) return "Tốt";
        if (score >= 5) return "Trung bình";
        if (score >= 3) return "Kém";
        return "Rất kém";
    }

    public DanhGia getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public DanhGia save(DanhGiaRequest danhGiaRequest) {
        DanhGia newDanhGia = new DanhGia();
        DanhGia dg = repo.findTopByOrderByMaDanhGiaDesc();
        int cnt = 0;
        if (dg != null) {
            cnt = Integer.parseInt(dg.getMaDanhGia().substring(dg.getMaDanhGia().length() - 3));
        }
        String maDG = "DG" + String.format("%03d", cnt + 1);

        newDanhGia.setMaDanhGia(maDG);
        newDanhGia.setThoiGianDanhGia(LocalDateTime.now());
        newDanhGia.setBinhLuan(danhGiaRequest.getBinhLuan());
        newDanhGia.setDiemCoSoVatChat(danhGiaRequest.getDiemCoSoVatChat());
        newDanhGia.setDiemDichVu(danhGiaRequest.getDiemDichVu());
        newDanhGia.setDiemSachSe(danhGiaRequest.getDiemSachSe());

        LoaiPhong loaiPhong = loaiPhongRepo.findById(danhGiaRequest.getMaLoaiPhong()).orElse(null);
        DonDatPhong donDatPhong = donDatPhongRepo.findById(danhGiaRequest.getMaDatPhong()).orElse(null);
        newDanhGia.setLoaiPhong(loaiPhong);

        if (donDatPhong != null) {
            donDatPhong.setDanhGia(newDanhGia);
            donDatPhongRepo.save(donDatPhong);
        }

        return repo.save(newDanhGia);
    }


    public Page<DanhGiaRespone> getAllByDanhGia(int page, int size, DanhGiaTimKiemRequest request) {
        int minDiem = 0, maxDiem = 0;
        if (request.getDanhGia() != null) {
            if (request.getDanhGia().getLoai().equals("BAD")) {
                minDiem = request.getDanhGia().getDiem();
            } else maxDiem = request.getDanhGia().getDiem();
        }
        Pageable pageable = PageRequest.of(page, size);
        return repo.searchDanhGia(
                request.getMaLoaiPhong(),
                minDiem,
                maxDiem,
                request.getThang(),
                request.getNam(),
                pageable
        );
    }

    public List<Integer> findDistinctYears() {
        return repo.findDistinctYears();
    }

    public boolean updateById(String id) {
        DanhGia existingDanhGia = repo.findById(id).orElse(null);
        if (existingDanhGia != null) {
            existingDanhGia.setTinhTrang(!existingDanhGia.isTinhTrang());
            repo.save(existingDanhGia);
            return true;
        }
        return false;
    }

    public APIResponse<Object> getTopThreeRatings() {
        APIResponse<Object> response = new APIResponse<>();
        response.setData(null);
        try {
            Pageable top3 = PageRequest.of(0, 3);
            List<DanhGia> topThreeRatings = repo.findTop3ByLoaiPhongOrderByRatingDesc(top3);
            response.setData(topThreeRatings);
            response.setSuccess(true);
            response.setMessage("Lấy danh sách đánh giá thành công");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setSuccess(false);
            response.setMessage("Lỗi khi lấy đánh giá");
        }
        return response;
    }
}
