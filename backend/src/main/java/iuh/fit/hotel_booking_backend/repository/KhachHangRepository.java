package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, String> {
    @Query("SELECT k FROM KhachHang k " +
            "WHERE LOWER(k.hoTenKH) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(k.soDienThoai) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<KhachHang> searchByKeyword(String keyword);

}
