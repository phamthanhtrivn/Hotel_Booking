package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.LoaiGiuong;
import iuh.fit.hotel_booking_backend.repository.ChiTietLoaiGiuongRepository;
import iuh.fit.hotel_booking_backend.repository.LoaiGiuongRepository;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoaiGiuongService {
    private final LoaiGiuongRepository repo;
    private final ChiTietLoaiGiuongRepository chiTietLoaiGiuongRepository;
    private final IdUtil idUtil;

    public APIResponse<List<LoaiGiuong>> getAll() {
        APIResponse<List<LoaiGiuong>> response = new APIResponse<>();
        List<LoaiGiuong> list = repo.findAll();

        response.setSuccess(true);
        response.setMessage(list.isEmpty() ? "Không có loại giường nào." : "Lấy danh sách loại giường thành công.");
        response.setData(list.isEmpty() ? null : list);

        return response;
    }

    public APIResponse<LoaiGiuong> getById(String id) {
        APIResponse<LoaiGiuong> response = new APIResponse<>();

        LoaiGiuong lg = repo.findById(id).orElse(null);
        if (lg == null) {
            response.setSuccess(false);
            response.setMessage("Không tìm thấy loại giường.");
        } else {
            response.setSuccess(true);
            response.setMessage("Lấy loại giường thành công.");
        }
        response.setData(lg);

        return response;
    }

    public APIResponse<LoaiGiuong> save(LoaiGiuong loaiGiuong) {
        APIResponse<LoaiGiuong> response = new APIResponse<>();

        if (repo.existsLoaiGiuongByTenGiuong(loaiGiuong.getTenGiuong())) {
            response.setSuccess(false);
            response.setMessage("Loại giường với tên này đã tồn tại.");
            return response;
        }

        loaiGiuong.setMaGiuong(idUtil.generateUniqueCodeForLoaiGiuong());
        loaiGiuong.setTinhTrang(true);

        LoaiGiuong saved = repo.save(loaiGiuong);
        response.setSuccess(true);
        response.setMessage("Lưu loại giường thành công.");
        response.setData(saved);

        return response;
    }

    public APIResponse<LoaiGiuong> update(LoaiGiuong loaiGiuong) {
        APIResponse<LoaiGiuong> response = new APIResponse<>();

        if (loaiGiuong.getMaGiuong() == null || !repo.existsLoaiGiuongByMaGiuong(loaiGiuong.getMaGiuong())) {
            response.setSuccess(false);
            response.setMessage("Loại giường không tồn tại, không thể cập nhật.");
            return response;
        }

        LoaiGiuong updated = repo.save(loaiGiuong);
        response.setSuccess(true);
        response.setMessage("Cập nhật loại giường thành công.");
        response.setData(updated);

        return response;
    }

    public APIResponse<LoaiGiuong> deleteById(String id) {
        APIResponse<LoaiGiuong> response = new APIResponse<>();

        LoaiGiuong lg = repo.findById(id).orElse(null);
        if (lg == null) {
            response.setSuccess(false);
            response.setMessage("Không tìm thấy loại giường.");
            return response;
        }

        if (chiTietLoaiGiuongRepository.existsByLoaiGiuong_MaGiuong(id)) {
            response.setSuccess(false);
            response.setMessage("Loại giường đang được sử dụng, không thể xoá.");
            return response;
        }

        repo.deleteById(id);
        response.setSuccess(true);
        response.setMessage("Xoá loại giường thành công.");

        return response;
    }
}
