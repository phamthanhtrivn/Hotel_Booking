package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.entity.TrangThaiDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface DonDatPhongRepository extends JpaRepository<DonDatPhong, String>, JpaSpecificationExecutor<DonDatPhong> {
    List<DonDatPhong> findByKhachHang_MaKhachHang(String maKhachHang);

    @Query("SELECT COUNT(d) FROM DonDatPhong d WHERE d.khachHang.maKhachHang = :maKhachHang")
    int countByKhachHangId(@Param("maKhachHang") String maKhachHang);

    List<DonDatPhong> findByTrangThaiAndNgayTaoBefore(
            TrangThaiDon trangThai,
            LocalDateTime ngayTao
    );

    boolean existsDonDatPhongByMaDatPhong(String maDatPhong);

    @Query("""
           SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END
           FROM DonDatPhong d
           JOIN d.phong p
           WHERE p.loaiPhong.maLoaiPhong = :maLoaiPhong
           """)
    boolean existsByLoaiPhongDaDuocDat(@Param("maLoaiPhong") String maLoaiPhong);

    //    Thống kê Overview
    @Query("SELECT COUNT(d) FROM DonDatPhong d WHERE d.checkIn >= :startOfDay AND d.checkIn < :endOfDay and d.trangThai <> 'DA_HUY'")
    long countCheckInToday(@Param("startOfDay") LocalDateTime start,  @Param("endOfDay") LocalDateTime end);

    @Query("SELECT COUNT(d) FROM DonDatPhong d WHERE d.checkOut >= :startOfDay AND d.checkOut < :endOfDay AND d.trangThai <> 'DA_HUY'")
    long countCheckOutToday(@Param("startOfDay") LocalDateTime start, @Param("endOfDay") LocalDateTime end);

    //    Đang ở
    @Query("SELECT count(d) from DonDatPhong d where d.checkIn <= :now and d.checkOut >= :now and d.trangThai = 'DA_THANH_TOAN'")
    long countTotalInHotel(@Param("now") LocalDateTime now);

    //    Thống kê từng loại phòng:  đếm số phòng đang có khách của loại đó
    @Query("""
        select p.loaiPhong.maLoaiPhong, count(d) 
        from DonDatPhong d join d.phong p 
        where d.checkIn <= :now and d.checkOut >= :now and d.trangThai <> 'DA_HUY'
        GROUP BY p.loaiPhong.maLoaiPhong
        """)
    List<Object[]> countOccupiedByRoomType(@Param("now") LocalDateTime now);

    // Thống kê Doanh thu theo tháng trong năm (Dựa vào check_out hoặc ngay_tao)
    @Query("SELECT MONTH(d.checkOut) as thang, SUM(d.tongTienTT) as doanhThu " +
            "FROM DonDatPhong d " +
            "WHERE YEAR(d.checkOut) = :year AND d.trangThai = 'DA_THANH_TOAN' " +
            "GROUP BY MONTH(d.checkOut) " +
            "ORDER BY MONTH(d.checkOut) ASC")
    List<Object[]> getMonthlyRevenueByYear(@Param("year") int year);

    // Đếm số deal (đơn có giảm giá) theo loại phòng
    @Query("SELECT p.loaiPhong.maLoaiPhong, COUNT(d) FROM DonDatPhong d JOIN d.phong p " +
            "WHERE d.giamGiaDiemTichLuy > 0 GROUP BY p.loaiPhong.maLoaiPhong")
    List<Object[]> countDealsByRoomType();

    // Tìm tất cả đơn đặt phòng có khoảng thời gian giao thoa với [startDate, endDate]
    // Logic: CheckIn < EndDate VÀ CheckOut > StartDate (và phải Đã thanh toán)
    @Query("SELECT d FROM DonDatPhong d WHERE d.checkIn < :endDate AND d.checkOut > :startDate AND d.trangThai = 'DA_THANH_TOAN'")
    List<DonDatPhong> findBookingsInDateRange(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
