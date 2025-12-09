package iuh.fit.hotel_booking_backend.repository;
import iuh.fit.hotel_booking_backend.dto.FeedbackDTO;
import iuh.fit.hotel_booking_backend.entity.DanhGia;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import iuh.fit.hotel_booking_backend.dto.DanhGiaRespone;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGia, String> {
    @Query("SELECT d " +
            "FROM DanhGia d " +
            "JOIN d.donDatPhong ddp " +
            "JOIN ddp.khachHang kh " +
            "WHERE d.loaiPhong.maLoaiPhong = :maLoaiPhong")
    Page<DanhGia> findByLoaiPhongPagable(String maLoaiPhong, Pageable pageable);

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

    DanhGia findTopByOrderByMaDanhGiaDesc();

    @Query("""
       SELECT new iuh.fit.hotel_booking_backend.dto.DanhGiaRespone(d,kh,ddp,p,d.loaiPhong) from DanhGia d join DonDatPhong  ddp on d.maDanhGia = ddp.danhGia.maDanhGia
      join KhachHang kh on ddp.khachHang.maKhachHang = kh.maKhachHang
      join Phong p on ddp.phong.maPhong = p.maPhong
       WHERE (:maLoaiPhong IS NULL OR d.loaiPhong.maLoaiPhong = :maLoaiPhong)
       AND (:thang = 0 OR FUNCTION('month',d.thoiGianDanhGia) = :thang )
       AND (:nam = 0 OR FUNCTION('year',d.thoiGianDanhGia) = :nam )
       AND (:minDiem = 0 OR (d.diemCoSoVatChat + d.diemDichVu + d.diemSachSe)/3.0 <= :minDiem)
       AND (:maxDiem = 0 OR (d.diemCoSoVatChat + d.diemDichVu + d.diemSachSe)/3.0 >= :maxDiem)
       """)
    Page<DanhGiaRespone> searchDanhGia(
            @Param("maLoaiPhong") String maLoaiPhong,
            @Param("minDiem") int minDiem,
            @Param("maxDiem") int maxDiem,
            @Param("thang") int thang,
            @Param("nam") int nam,
            Pageable pageable
    );

    @Query(
      """
      select new iuh.fit.hotel_booking_backend.dto.DanhGiaRespone(d,kh,ddp,p,d.loaiPhong) from DanhGia d join DonDatPhong  ddp on d.maDanhGia = ddp.danhGia.maDanhGia
      join KhachHang kh on ddp.khachHang.maKhachHang = kh.maKhachHang
      join Phong p on ddp.phong.maPhong = p.maPhong
      """
    )
    Page<DanhGiaRespone> getAllByDanhGia(Pageable pageable);

    @Query("select distinct YEAR(d.thoiGianDanhGia) from DanhGia d order by YEAR(d.thoiGianDanhGia) desc")
    List<Integer> findDistinctYears();

    @Query("SELECT new iuh.fit.hotel_booking_backend.dto.FeedbackDTO(" +
            "dg.maDanhGia, dg.diemSachSe, dg.diemDichVu, dg.diemCoSoVatChat, " +
            "dg.binhLuan, dg.loaiPhong.tenLoaiPhong, dg.thoiGianDanhGia) " +
            "FROM DanhGia dg ORDER BY dg.thoiGianDanhGia DESC")
    List<FeedbackDTO> findRecentFeedbacks(Pageable pageable);

}