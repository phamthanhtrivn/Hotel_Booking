package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.LoaiGiuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoaiGiuongRepository extends JpaRepository<LoaiGiuong, String> {
}
