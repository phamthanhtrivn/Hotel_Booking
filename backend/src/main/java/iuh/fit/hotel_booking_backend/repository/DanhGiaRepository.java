package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.DanhGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGia, String> {
    public DanhGia findTopByOrderByMaDanhGiaDesc();

    @Query("""
       SELECT d from DanhGia d
       WHERE (:maLoaiPhong IS NULL OR d.loaiPhong.maLoaiPhong = :maLoaiPhong)
       AND (:thang = 0 OR FUNCTION('month',d.thoiGianDanhGia) = :thang )
       AND (:nam = 0 OR FUNCTION('year',d.thoiGianDanhGia) = :nam )
       AND (:minDiem = 0 OR (d.diemCoSoVatChat + d.diemDichVu + d.diemSachSe) <= :minDiem)
       AND (:maxDiem = 0 OR (d.diemCoSoVatChat + d.diemDichVu + d.diemSachSe) >= :maxDiem)
       """)
    public List<DanhGia> searchDanhGia(
            @Param("maLoaiPhong") String maLoaiPhong,
            @Param("minDiem") int minDiem,
            @Param("maxDiem") int maxDiem,
            @Param("thang") int thang,
            @Param("nam") int nam
    );
}
