package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.entity.TrangThaiPhong;
import iuh.fit.hotel_booking_backend.helper.LoaiPhongSpecification;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class LoaiPhongService {
    private final LoaiPhongRepository loaiPhongRepository;
    private final CloudinaryService cloudinaryService;
    private final IdUtil idUtil;

    public LoaiPhongService(LoaiPhongRepository loaiPhongRepository,
                            CloudinaryService cloudinaryService,
                            IdUtil IdUtil) {
        this.loaiPhongRepository = loaiPhongRepository;
        this.cloudinaryService = cloudinaryService;
        this.idUtil = IdUtil;
    }

    public List<LoaiPhong> getAll() {
        return loaiPhongRepository.findAll();
    }

    public Page<LoaiPhong> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return loaiPhongRepository.findAll(pageable);
    }

    public LoaiPhong getById(String id) {
        return loaiPhongRepository.findById(id).orElse(null);
    }

    public APIResponse<LoaiPhong> update(LoaiPhong loaiPhong,
                                         List<String> existingImages,
                                         List<MultipartFile> newPhotos) {
        APIResponse<LoaiPhong> response = new APIResponse<>();

        try {
            List<String> newImageUrls = new ArrayList<>();
            if (newPhotos != null && !newPhotos.isEmpty()) {
                newImageUrls = cloudinaryService.uploadFiles(newPhotos, "loai_phong");
            }

            List<String> finalImages = new ArrayList<>();
            if (existingImages != null) {
                finalImages.addAll(existingImages);
            }
            finalImages.addAll(newImageUrls);


            loaiPhong.setHinhAnh(finalImages);

            loaiPhongRepository.save(loaiPhong);

            response.setSuccess(true);
            response.setMessage("Cập nhật loại phòng thành công");
            response.setData(loaiPhong);

        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Cập nhật thất bại: " + e.getMessage());
        }
        return response;
    }


    public APIResponse<LoaiPhong> save(LoaiPhong loaiPhong,
                                       List<MultipartFile> images) {

        APIResponse<LoaiPhong> response = new APIResponse<>();
        try {
            List<String> urls = cloudinaryService.uploadFiles(images, "loai_phong");

            loaiPhong.setMaLoaiPhong(idUtil.generateUniqueCodeForRoomType());
            loaiPhong.setHinhAnh(urls);
            loaiPhongRepository.save(loaiPhong);

            response.setSuccess(true);
            response.setMessage("Thêm loại phòng thành công");
            response.setData(loaiPhong);
            return response;
        } catch (Exception e) {
            response.setMessage("Thêm loại phòng thất bại. " + e.getMessage());
            response.setSuccess(false);
            return response;
        }
    }

    public APIResponse<Object> deleteById(String id) {
        APIResponse<Object> response = new APIResponse<>();
        try {
            loaiPhongRepository.deleteById(id);
            response.setSuccess(true);
            response.setMessage("Xóa loại phòng thành công");
            return response;
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Lỗi khi xóa loại phòng: " + e.getMessage());
            return response;
        }

    }

    public List<LoaiPhongDTO> getAllLoaiPhongDTO() {
        List<LoaiPhong> list = loaiPhongRepository.findAll();

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

        List<LoaiPhong> list = loaiPhongRepository.findAll((Sort) spec);

        return list.stream()
                .map(lp -> {
                    long soPhongTrong = loaiPhongRepository.countPhongTrong(
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
