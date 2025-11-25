package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.Phong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhongRepository extends JpaRepository<Phong, String>, JpaSpecificationExecutor<Phong> {
    @Query(value = "SELECT * FROM phong p WHERE p.ma_loai_phong = :maLoaiPhong AND p.trang_thai = 'TRONG' AND p.tinh_trang = true LIMIT 1",
            nativeQuery = true)

    Optional<Phong> findFirstAvailableRoomNative(@Param("maLoaiPhong") String maLoaiPhong);

}
