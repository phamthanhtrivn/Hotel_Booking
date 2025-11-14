package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoaiPhongRepository
        extends JpaRepository<LoaiPhong, String>, JpaSpecificationExecutor<LoaiPhong> {

    @Query("""
    SELECT COUNT(p.maPhong)
    FROM Phong p
    WHERE p.loaiPhong.maLoaiPhong = :maLoaiPhong
      AND p.maPhong NOT IN (
          SELECT d.phong.maPhong
          FROM DonDatPhong d
          WHERE d.trangThai IN ('CHUA_THANH_TOAN', 'DA_THANH_TOAN')
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
