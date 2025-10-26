package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import iuh.fit.hotel_booking_backend.entity.ChiTietTienNghi.ChiTietTienNghiId;

@Repository
public interface ChiTietTienNghiRepository extends JpaRepository<ChiTietTienNghi, ChiTietTienNghiId> {
}
