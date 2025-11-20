package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.LoaiGiuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoaiGiuongRepository extends JpaRepository<LoaiGiuong, String> {
    @Query("SELECT lg FROM LoaiGiuong lg " +
            "JOIN lg.chiTietLoaiGiuongList ctg " +
            "WHERE ctg.loaiPhong.maLoaiPhong = :maLoaiPhong")
    List<LoaiGiuong> findByMaLoaiPhong(@Param("maLoaiPhong") String maLoaiPhong);
}
