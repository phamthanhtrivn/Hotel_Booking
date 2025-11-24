package iuh.fit.hotel_booking_backend.repository;

import iuh.fit.hotel_booking_backend.entity.KhachHang;
import iuh.fit.hotel_booking_backend.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, String> {
    KhachHang findKhachHangBySoDienThoai(String soDienThoai);
    @Query("SELECT k FROM KhachHang k " +
            "WHERE LOWER(k.hoTenKH) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(k.soDienThoai) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<KhachHang> searchByKeyword(String keyword);


    @Query("""
    select k.taiKhoan 
    from KhachHang k 
    where k.maKhachHang = :maKhachHang
    """)
    TaiKhoan findTaiKhoanByMaKhachHang(String maKhachHang);


    @Query("""
        SELECT tk FROM TaiKhoan tk
        JOIN tk.khachHang k
        WHERE (
            :keyword IS NULL 
            OR :keyword = '' 
            OR LOWER(k.hoTenKH) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(k.soDienThoai) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(tk.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
        )
        AND (:trangThai IS NULL OR tk.tinhTrang = :trangThai)
    """)
    Page<TaiKhoan> searchTaiKhoan(
            @Param("keyword") String keyword,
            @Param("trangThai") Boolean trangThai,
            Pageable pageable
    );

}
