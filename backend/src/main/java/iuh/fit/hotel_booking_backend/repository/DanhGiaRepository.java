package iuh.fit.hotel_booking_backend.repository;
import iuh.fit.hotel_booking_backend.entity.DanhGia;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGia, String> {
    @Query("SELECT d " +
            "FROM DanhGia d " +
            "JOIN d.donDatPhong ddp " +
            "JOIN ddp.khachHang kh " +
            "WHERE d.loaiPhong.maLoaiPhong = :maLoaiPhong")
    List<DanhGia> findByLoaiPhong(String maLoaiPhong);

    @Query("""
    SELECT d 
    FROM DanhGia d
    WHERE d.tinhTrang = true
    ORDER BY 
        (d.diemSachSe + d.diemDichVu + d.diemCoSoVatChat) DESC,
        d.thoiGianDanhGia DESC
    """)
    List<DanhGia> findTop3ByLoaiPhongOrderByRatingDesc(Pageable pageable);
}
