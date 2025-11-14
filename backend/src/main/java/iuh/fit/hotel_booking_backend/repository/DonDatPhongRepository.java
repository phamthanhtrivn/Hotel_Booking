package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonDatPhongRepository extends JpaRepository<DonDatPhong, String> {
    List<DonDatPhong> findByKhachHang_MaKhachHang(String maKhachHang);
}
