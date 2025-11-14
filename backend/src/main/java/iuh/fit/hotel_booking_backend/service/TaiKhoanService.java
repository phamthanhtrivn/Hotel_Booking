package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.LoaiTaiKhoan;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import iuh.fit.hotel_booking_backend.repository.TaiKhoanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaiKhoanService {
    private TaiKhoanRepository repo;

    public TaiKhoanService(TaiKhoanRepository repo) {
        this.repo = repo;
    }

    public List<TaiKhoan> getAll() {
        return repo.findAll();
    }

    public TaiKhoan getById(String id) {
        return repo.findById(id).orElse(null);
    }



    public TaiKhoan save(TaiKhoan t) {
        return repo.save(t);
    }


    public TaiKhoan update(TaiKhoan t) {
        TaiKhoan existingTaiKhoan = repo.findById(t.getMaTaiKhoan()).orElse(null);
        if(existingTaiKhoan == null) throw new RuntimeException("TaiKhoan not found");
        else{
            if(t.getEmail() != null) existingTaiKhoan.setEmail(t.getEmail());
            if(t.getVaiTro() != null) existingTaiKhoan.setVaiTro(t.getVaiTro());
            if(t.getKhachHang() != null) existingTaiKhoan.setKhachHang(t.getKhachHang());
            if(t.isActive() != existingTaiKhoan.isActive()) existingTaiKhoan.setActive(t.isActive());
            if(t.getKhachHang() != null){

                if(t.getKhachHang().getHoTenKH().trim() != "") existingTaiKhoan.getKhachHang().setHoTenKH(t.getKhachHang().getHoTenKH());
                if(t.getKhachHang().getSoDienThoai().trim() != "" ) existingTaiKhoan.getKhachHang().setSoDienThoai(t.getKhachHang().getSoDienThoai());
            }
        }
        return repo.save(existingTaiKhoan);
    }




    public void deleteById(String id) {
        repo.deleteById(id);
    }
}
