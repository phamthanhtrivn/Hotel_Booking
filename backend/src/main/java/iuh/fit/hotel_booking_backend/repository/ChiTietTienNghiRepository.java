package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghi;
import iuh.fit.hotel_booking_backend.entity.TienNghi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghiId;

@Repository
public interface ChiTietTienNghiRepository extends JpaRepository<ChiTietTienNghi, ChiTietTienNghiId> {
    boolean existsByTienNghi_MaTienNghi(String tienNghiMaTienNghi);
}
