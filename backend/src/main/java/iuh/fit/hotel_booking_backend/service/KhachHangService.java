package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.dto.DatPhongRequest;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.repository.DonDatPhongRepository;
import iuh.fit.hotel_booking_backend.repository.KhachHangRepository;
import iuh.fit.hotel_booking_backend.repository.TaiKhoanRepository;
import iuh.fit.hotel_booking_backend.util.IdUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhachHangService {
    private KhachHangRepository repo;
    private TaiKhoanRepository taiKhoanRepo;
    private DonDatPhongRepository donDatPhongRepo;
    private IdUtil idUtil;

    public KhachHangService(KhachHangRepository repo, IdUtil idUtil, TaiKhoanRepository taiKhoanRepo, DonDatPhongRepository donDatPhongRepo) {
        this.taiKhoanRepo = taiKhoanRepo;
        this.repo = repo;
        this.idUtil = idUtil;
        this.donDatPhongRepo = donDatPhongRepo;
    }

    public Page<TaiKhoan> getAll(
            int page,
            int size,
            String keyword,
            Boolean trangThai,
            String sortField,
            String sortDir
    ) {
        Sort sort = sortDir.equals("asc")
                ? Sort.by(sortField).ascending()
                : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return repo.searchTaiKhoan(keyword, trangThai, pageable);
    }

    public KhachHang getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public KhachHang save(KhachHang khachHang) {
        if (repo.existsById(khachHang.getMaKhachHang())) {
            return null;
        }
        return repo.save(khachHang);
    }

    public boolean deleteById(String id) {
        List<DonDatPhong> listKH = donDatPhongRepo.findByKhachHang_MaKhachHang(id);
        if (!listKH.isEmpty()) {
            return false;
        }
        TaiKhoan tk = repo.findTaiKhoanByMaKhachHang(id);
        taiKhoanRepo.deleteById(tk.getMaTaiKhoan());
        repo.deleteById(id);
        return true;
    }

    // Tìm kiếm theo tên hoặc sdt
    public List<KhachHang> search(String keyword) {
        return repo.searchByKeyword(keyword);
    }

    public boolean updateTinhTrang(String id){
        TaiKhoan tk = taiKhoanRepo.findById(id).orElse(null);
        if(tk == null) return false;
        tk.setTinhTrang(!tk.isTinhTrang());
        taiKhoanRepo.save(tk);
        return true;
    }

    // update
    public boolean update(String id, boolean trangThai,KhachHang updatedKhachHang) {
        KhachHang existing = repo.findById(id).orElse(null);
        if (existing == null) return false;

        if (updatedKhachHang.getHoTenKH() != null)
            existing.setHoTenKH(updatedKhachHang.getHoTenKH());
        if (updatedKhachHang.getSoDienThoai() != null)
            existing.setSoDienThoai(updatedKhachHang.getSoDienThoai());

        TaiKhoan tk = repo.findTaiKhoanByMaKhachHang(id);
        tk.setTinhTrang(trangThai);

        repo.save(existing);
        taiKhoanRepo.save(tk);
        return true;
    }
}
