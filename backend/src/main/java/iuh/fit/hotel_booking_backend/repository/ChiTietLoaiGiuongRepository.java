package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuongId;


@Repository
public interface ChiTietLoaiGiuongRepository extends JpaRepository<ChiTietLoaiGiuong, ChiTietLoaiGiuongId> {
}
