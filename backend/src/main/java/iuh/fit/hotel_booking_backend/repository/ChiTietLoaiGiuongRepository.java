package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuongId;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface ChiTietLoaiGiuongRepository extends JpaRepository<ChiTietLoaiGiuong, ChiTietLoaiGiuongId> {
    boolean existsByLoaiGiuong_MaGiuong(String loaiGiuongMaGiuong);

    List<ChiTietLoaiGiuong> findByLoaiPhongMaLoaiPhong(String maLoaiPhong);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM chi_tiet_loai_giuong WHERE ma_loai_phong = :maLoaiPhong", nativeQuery = true)
    void deleteByLoaiPhongMaLoaiPhong(@Param("maLoaiPhong") String maLoaiPhong);
}
