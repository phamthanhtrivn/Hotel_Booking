package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.Phong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhongRepository extends JpaRepository<Phong, String> {
}
