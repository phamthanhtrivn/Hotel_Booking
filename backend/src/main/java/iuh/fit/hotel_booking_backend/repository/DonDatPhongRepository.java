package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.entity.TrangThaiDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface DonDatPhongRepository extends JpaRepository<DonDatPhong, String>, JpaSpecificationExecutor<DonDatPhong> {
    List<DonDatPhong> findByKhachHang_MaKhachHang(String maKhachHang);

    @Query("SELECT COUNT(d) FROM DonDatPhong d WHERE d.khachHang.maKhachHang = :maKhachHang")
    int countByKhachHangId(@Param("maKhachHang") String maKhachHang);

    List<DonDatPhong> findByTrangThaiAndNgayTaoBefore(
            TrangThaiDon trangThai,
            LocalDateTime ngayTao
    );
}
