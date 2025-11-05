package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, String> {
    @Query("SELECT t FROM TaiKhoan t WHERE t.vaiTro = 'MEMBER'")
    List<TaiKhoan> findAllMembers();

    @Query("SELECT t FROM TaiKhoan t WHERE t.email = :email")
    TaiKhoan findTaiKhoanByEmail(@Param("email") String email);

}
