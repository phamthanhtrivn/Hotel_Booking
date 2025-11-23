package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.TienNghi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TienNghiRepository extends JpaRepository<TienNghi, String> {
    boolean existsTienNGhiByMaTienNghi(String maTienNghi);
    boolean existsTienNghiByTenTienNghi(String tenTienNghi);
    @Query("SELECT c.tienNghi FROM ChiTietTienNghi c WHERE c.loaiPhong.maLoaiPhong = :loaiPhongId")
    List<TienNghi> findByLoaiPhong(String loaiPhongId);
}
