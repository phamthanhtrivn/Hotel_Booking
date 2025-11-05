package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoaiPhongRepository extends JpaRepository<LoaiPhong, String> {
//    Tìm kiếm các laoij phòng có phòng trống trong một khoảng thời gian nhất định

    @Query("""
        select new iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO(lp, count(p.maPhong)) 
        from LoaiPhong lp join Phong p on lp.maLoaiPhong = p.loaiPhong.maLoaiPhong 
        where p.maPhong not in (
            select ddp.phong.maPhong
            from DonDatPhong ddp
            where (ddp.checkIn < :checkOut and ddp.checkOut > :checkIn)
                and ddp.trangThai in ("DA_THANH_TOAN", "DA_HUY")
        group by lp
        having count(p.maPhong) > 0
        )        
    """)
    List<LoaiPhongDTO> findAvailableRoomTypes(
            @Param("checkIn") LocalDateTime checkIn,
            @Param("checkOut") LocalDateTime checkOut
            );
}
