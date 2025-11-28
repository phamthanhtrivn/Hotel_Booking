package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.Phong;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PhongRepository extends JpaRepository<Phong, String>, JpaSpecificationExecutor<Phong> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
                SELECT p
                FROM Phong p
                WHERE p.loaiPhong.maLoaiPhong = :maLoaiPhong
                  AND p.tinhTrang = true
                  AND p.maPhong NOT IN (
                      SELECT d.phong.maPhong
                      FROM DonDatPhong d
                      WHERE d.trangThai IN (iuh.fit.hotel_booking_backend.entity.TrangThaiDon.CHUA_THANH_TOAN,
                                            iuh.fit.hotel_booking_backend.entity.TrangThaiDon.DA_THANH_TOAN)
                        AND d.checkIn < :newCheckOut
                        AND d.checkOut > :newCheckIn
                  )
            """)
    List<Phong> findAvailableRoomsForUpdate(
            @Param("maLoaiPhong") String maLoaiPhong,
            @Param("newCheckIn") LocalDateTime newCheckIn,
            @Param("newCheckOut") LocalDateTime newCheckOut,
            Pageable pageable
    );

    boolean existsByLoaiPhongMaLoaiPhong(String maLoaiPhong);
}
