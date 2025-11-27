package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.ChiTietLoaiGiuongRequest;
import iuh.fit.hotel_booking_backend.dto.LoaiPhongSearchRequest;
import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuong;
import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghi;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.helper.DTOMapper;
import iuh.fit.hotel_booking_backend.helper.QuyDoiKhachHelper;
import iuh.fit.hotel_booking_backend.projections.LoaiPhongDropdownProjection;
import iuh.fit.hotel_booking_backend.repository.DonDatPhongRepository;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import iuh.fit.hotel_booking_backend.repository.PhongRepository;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    private final PhongRepository phongRepository;
    private final DonDatPhongRepository donDatPhongRepository;
    private final ChiTietTienNghiService chiTietTienNghiService;
    private final ChiTietLoaiGiuongService chiTietLoaiGiuongService;
    private final CloudinaryService cloudinaryService;
    private final IdUtil idUtil;

    public LoaiPhongService(LoaiPhongRepository loaiPhongRepository,
                            PhongRepository phongRepository,
                            DonDatPhongRepository donDatPhongRepository,
                            ChiTietTienNghiService chiTietTienNghiService,
                            ChiTietLoaiGiuongService chiTietLoaiGiuongService,
                            CloudinaryService cloudinaryService,
                            IdUtil IdUtil) {
        this.loaiPhongRepository = loaiPhongRepository;
        this.chiTietLoaiGiuongService = chiTietLoaiGiuongService;
        this.chiTietTienNghiService = chiTietTienNghiService;
        this.donDatPhongRepository = donDatPhongRepository;
        this.phongRepository = phongRepository;
        this.cloudinaryService = cloudinaryService;
        this.idUtil = IdUtil;
    }

    public List<LoaiPhong> getAll() {
        return loaiPhongRepository.findAll();
    }

    public Page<LoaiPhongDTO> findByConditions(int page, int size, LoaiPhongSearchRequest dto) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<LoaiPhong> spec = Specification.allOf(
                LoaiPhongSpecification.tenLoaiPhongContains(dto.getTenLoaiPhong()),
                LoaiPhongSpecification.soKhachGreaterOrEqual(dto.getSoKhach()),
                LoaiPhongSpecification.giaBetween(dto.getMinGia(), dto.getMaxGia()),
                LoaiPhongSpecification.dienTichBetween(dto.getMinDienTich(), dto.getMaxDienTich()));

        Page<LoaiPhong> loaiPhongPage = loaiPhongRepository.findAll(spec, pageable);

        List<LoaiPhongDTO> dtos = loaiPhongPage.getContent().stream().map(lp -> {
            LoaiPhongDTO dtoItem = DTOMapper.loaiPhongMapToDTO(lp);
            boolean hasPhong = phongRepository.existsByLoaiPhongMaLoaiPhong(lp.getMaLoaiPhong());
            boolean hasDon = donDatPhongRepository.existsByLoaiPhongDaDuocDat(lp.getMaLoaiPhong());
            dtoItem.setCanDelete(!hasPhong && !hasDon);

            return dtoItem;
        }).collect(Collectors.toList());
        return new PageImpl<>(dtos, pageable, loaiPhongPage.getTotalElements());
    }

    public LoaiPhong getById(String id) {
        return loaiPhongRepository.findById(id).orElse(null);
    }

    @Transactional
    public APIResponse<LoaiPhong> update(LoaiPhong loaiPhong,
                                         List<String> existingImages,
                                         List<MultipartFile> newPhotos,
                                         List<String> tienNghiIds,
                                         List<ChiTietLoaiGiuongRequest> chiTietGiuongs) {
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

            chiTietTienNghiService.updateChiTietTienNghi(loaiPhong.getMaLoaiPhong(), tienNghiIds);

            chiTietLoaiGiuongService.updateChiTietLoaiGiuong(loaiPhong.getMaLoaiPhong(), chiTietGiuongs);

            response.setSuccess(true);
            response.setMessage("Cập nhật loại phòng thành công");
            response.setData(loaiPhong);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setSuccess(false);
            response.setMessage("Cập nhật thất bại: " + e.getMessage());
        }
        return response;
    }

    public APIResponse<LoaiPhong> findById(String id) {
        APIResponse<LoaiPhong> response = new APIResponse<>();
        try {
            LoaiPhong loaiPhong = loaiPhongRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Loại phòng với id " + id + " không tồn tại"));

            response.setSuccess(true);
            response.setData(loaiPhong);

        } catch (Exception e) {
            response.setSuccess(false);
            response.setData(null);
            throw new RuntimeException("Lỗi khi tìm kiếm loại phòng: " + e.getMessage(), e);
        }
        return response;
    }

    public List<LoaiPhongDropdownProjection> getForDropdown() {
        return loaiPhongRepository.findAllProjectedBy();
    }

    @Transactional
    public APIResponse<LoaiPhong> save(LoaiPhong loaiPhong,
                                       List<MultipartFile> images,
                                       List<String> tienNghiIds,
                                       List<ChiTietLoaiGiuongRequest> chiTietGiuongs) {
        APIResponse<LoaiPhong> response = new APIResponse<>();
        try {
            List<String> urls = cloudinaryService.uploadFiles(images, "loai_phong");

            loaiPhong.setMaLoaiPhong(idUtil.generateUniqueCodeForRoomType());
            loaiPhong.setHinhAnh(urls);
            loaiPhongRepository.save(loaiPhong);

            if (tienNghiIds != null && !tienNghiIds.isEmpty()) {
                chiTietTienNghiService.saveChiTietTienNghi(loaiPhong.getMaLoaiPhong(), tienNghiIds);
            }

            // Lưu thông tin giường
            if (chiTietGiuongs != null && !chiTietGiuongs.isEmpty()) {
                chiTietLoaiGiuongService.saveChiTietLoaiGiuong(loaiPhong.getMaLoaiPhong(), chiTietGiuongs);
            }

            response.setSuccess(true);
            response.setMessage("Thêm loại phòng thành công");
            response.setData(loaiPhong);
            return response;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setMessage("Thêm loại phòng thất bại. " + e.getMessage());
            response.setSuccess(false);
            return response;
        }
    }

    public void deleteById(String id) {
        boolean hasPhong = phongRepository.existsByLoaiPhongMaLoaiPhong(id);
        boolean hasDon = donDatPhongRepository.existsByLoaiPhongDaDuocDat(id);
        if (!hasDon && !hasPhong) loaiPhongRepository.deleteById(id);
        else throw new RuntimeException("Không thể xóa loại phòng này");
    }

    public List<LoaiPhongDTO> getAllLoaiPhongDTO() {
        List<LoaiPhong> list = loaiPhongRepository.findAll();

        return list.stream().map(loaiPhong -> {
            LoaiPhongDTO dto = DTOMapper.loaiPhongMapToDTO(loaiPhong);
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
            Integer[] treEm,
            Double minGia,
            Double maxGia,
            Double minDienTich,
            Double maxDienTich,
            String maGiuong
    ) {
        int soKhachThucTe = QuyDoiKhachHelper.tinhSoKhachSauQuyDoi(soKhach, treEm);

        Specification<LoaiPhong> spec = Specification.allOf(
                LoaiPhongSpecification.phongTrong(checkIn, checkOut),
                LoaiPhongSpecification.tenLoaiPhongContains(tenLoaiPhong),
                LoaiPhongSpecification.soKhachGreaterOrEqual(soKhachThucTe),
                LoaiPhongSpecification.giaBetween(minGia, maxGia),
                LoaiPhongSpecification.dienTichBetween(minDienTich, maxDienTich),
                LoaiPhongSpecification.loaiGiuong(maGiuong)
        );

        List<LoaiPhong> list = loaiPhongRepository.findAll(spec);

        return list.stream()
                .map(lp -> {
                    long soPhongTrong = loaiPhongRepository.countPhongTrong(
                            lp.getMaLoaiPhong(), checkIn, checkOut
                    );

                    LoaiPhongDTO dto = DTOMapper.loaiPhongMapToDTO(lp);
                    dto.setSoPhongTrong(soPhongTrong);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
