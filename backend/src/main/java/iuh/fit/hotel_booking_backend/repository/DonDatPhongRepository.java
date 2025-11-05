package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DonDatPhongRepository extends JpaRepository<DonDatPhong, String> {
    @Query("SELECT COUNT(d) FROM DonDatPhong d WHERE d.khachHang.maKhachHang = :maKhachHang")
    int countByKhachHangId(@Param("maKhachHang") String maKhachHang);

}
