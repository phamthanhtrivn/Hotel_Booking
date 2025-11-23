package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghiId;
import iuh.fit.hotel_booking_backend.entity.TienNghi;
import iuh.fit.hotel_booking_backend.repository.ChiTietTienNghiRepository;
import iuh.fit.hotel_booking_backend.repository.TienNghiRepository;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TienNghiService {
    private final TienNghiRepository repo;
    private final ChiTietTienNghiRepository chiTietTienNghiRepository;
    private final IdUtil idUtil;

    public APIResponse<List<TienNghi>> getAll() {
        APIResponse<List<TienNghi>> response = new APIResponse<>();
        List<TienNghi> list = repo.findAll();
        if (list.isEmpty()) {
            response.setSuccess(true);
            response.setMessage("Không có tiện nghi nào.");
            response.setData(null);
        } else {
            response.setSuccess(true);
            response.setMessage("Lấy danh sách tiện nghi thành công.");
            response.setData(list);
        }
        return response;
    }

    public APIResponse<TienNghi> getById(String id) {
        APIResponse<TienNghi> response = new APIResponse<>();
        response.setSuccess(false);

        TienNghi tn = repo.findById(id).orElse(null);
        response.setData(tn);
        if (tn == null) {
            response.setMessage("Không tìm thấy tiện nghi.");
        } else {
            response.setSuccess(true);
            response.setMessage("Lấy tiện nghi thành công.");
            response.setData(tn);
        }
        return response;
    }

    public APIResponse<TienNghi> save(TienNghi tienNghi) {
        APIResponse<TienNghi> response = new APIResponse<>();
        response.setSuccess(false);
        response.setData(null);

        if (repo.existsTienNghiByTenTienNghi(tienNghi.getTenTienNghi())) {
            response.setMessage("Tiện nghi với tên này đã tồn tại.");
            return response;
        }

        tienNghi.setMaTienNghi(idUtil.generateUniqueCodeForTienNghi());
        tienNghi.setTinhTrang(true);
        TienNghi saved = repo.save(tienNghi);
        response.setSuccess(true);
        response.setMessage("Lưu tiện nghi thành công.");
        response.setData(saved);
        return response;
    }


    public APIResponse<TienNghi> update(TienNghi tienNghi) {
        APIResponse<TienNghi> response = new APIResponse<>();
        response.setSuccess(false);
        if (tienNghi.getMaTienNghi() == null || !repo.existsTienNGhiByMaTienNghi(tienNghi.getMaTienNghi())) {
            response.setMessage("Tiện nghi không tồn tại, không thể cập nhật.");
            return response;
        }

        TienNghi updated = repo.save(tienNghi);
        response.setSuccess(true);
        response.setMessage("Cập nhật tiện nghi thành công.");
        response.setData(updated);
        return response;
    }

    public APIResponse<TienNghi> deleteById(String id) {
        APIResponse<TienNghi> response = new APIResponse<>();
        response.setSuccess(false);

        TienNghi tn = repo.findById(id).orElse(null);
        response.setData(tn);
        if (tn == null) {
            response.setMessage("Không tìm thấy tiện nghi.");
            return response;
        }

        if (chiTietTienNghiRepository.existsByTienNghi_MaTienNghi(id)) {
            response.setMessage("Tiện nghi đang được sử dụng, không thể xóa.");
            return response;
        }

        repo.deleteById(id);
        response.setSuccess(true);
        response.setMessage("Xoá tiện nghi thành công.");

        return response;
    }

    public List<TienNghi> getByLoaiPhong(String id){
        List<TienNghi> tienNghis = repo.findByLoaiPhong(id);

        return tienNghis;
    }
}
