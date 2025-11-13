package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.repository.LoaiPhongRepository;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

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

    public LoaiPhong getById(String id) {
        return loaiPhongRepository.findById(id).orElse(null);
    }

    public APIResponse<LoaiPhong> update(String id, LoaiPhong updatedData,
                                         List<String> existingImages,
                                         List<MultipartFile> newPhotos) {
        APIResponse<LoaiPhong> response = new APIResponse<>();

        try {
            LoaiPhong old = loaiPhongRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy loại phòng"));

            List<String> newImageUrls = new ArrayList<>();
            if (newPhotos != null && !newPhotos.isEmpty()) {
                newImageUrls = cloudinaryService.uploadFiles(newPhotos, "loai_phong");
            }

            List<String> finalImages = new ArrayList<>();
            if (existingImages != null) finalImages.addAll(existingImages);
            finalImages.addAll(newImageUrls);

            old.setTenLoaiPhong(updatedData.getTenLoaiPhong());
            old.setMoTa(updatedData.getMoTa());
            old.setGia(updatedData.getGia());
            old.setHinhAnh(finalImages);

            loaiPhongRepository.save(old);

            response.setSuccess(true);
            response.setMessage("Cập nhật loại phòng thành công");
            response.setData(old);

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
        }catch (Exception e){
            response.setMessage("Thêm loại phòng thất bại. " + e.getMessage());
            response.setSuccess(false);
            return response;
        }
    }

    public APIResponse<Object> deleteById(String id) {
        APIResponse<Object> response = new APIResponse<>();
        try{
            loaiPhongRepository.deleteById(id);
            response.setSuccess(true);
            response.setMessage("Xóa loại phòng thành công");
            return response;
        }catch (Exception e){
            response.setSuccess(false);
            response.setMessage("Lỗi khi xóa loại phòng: " + e.getMessage());
            return response;
        }
    }
}
