package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghi;
import iuh.fit.hotel_booking_backend.entity.TienNghi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghiId;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ChiTietTienNghiRepository extends JpaRepository<ChiTietTienNghi, ChiTietTienNghiId> {
    boolean existsByTienNghi_MaTienNghi(String tienNghiMaTienNghi);

    List<ChiTietTienNghi> findByLoaiPhongMaLoaiPhong(String maLoaiPhong);

}
