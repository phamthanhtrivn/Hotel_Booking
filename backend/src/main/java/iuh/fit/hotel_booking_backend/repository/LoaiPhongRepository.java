package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;


public interface LoaiPhongRepository extends JpaRepository<LoaiPhong, String> {
    boolean existsLoaiPhongByMaLoaiPhong(String code);

    @Query("""
        SELECT COUNT(p.maPhong)
        FROM Phong p
        WHERE p.loaiPhong.maLoaiPhong = :maLoaiPhong
          AND p.maPhong NOT IN (
              SELECT d.phong.maPhong
              FROM DonDatPhong d
              WHERE d.trangThai IN (
                  iuh.fit.hotel_booking_backend.entity.TrangThaiDon.CHUA_THANH_TOAN,
                  iuh.fit.hotel_booking_backend.entity.TrangThaiDon.DA_THANH_TOAN)
                AND d.checkIn < :checkOut
                AND d.checkOut > :checkIn
          )
    """)
    long countPhongTrong(
            @Param("maLoaiPhong") String maLoaiPhong,
            @Param("checkIn") LocalDateTime checkIn,
            @Param("checkOut") LocalDateTime checkOut
    );

}
