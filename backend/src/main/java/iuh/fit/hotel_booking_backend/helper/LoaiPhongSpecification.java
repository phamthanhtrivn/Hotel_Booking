package iuh.fit.hotel_booking_backend.helper;

import iuh.fit.hotel_booking_backend.entity.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class LoaiPhongSpecification {

    public static Specification<LoaiPhong> tenLoaiPhongContains(String keyword){
        return (root, query, cb) -> {
            if(keyword == null || keyword.isBlank()) return null;
            return cb.like(cb.lower(root.get("tenLoaiPhong")), "%" + keyword.toLowerCase() + "%");
        };
    }

    public static Specification<LoaiPhong> soKhachGreaterOrEqual(Integer soKhach){
        return (root, query, cb) -> {
            if(soKhach == null) return null;
            return cb.greaterThanOrEqualTo(root.get("soKhach"), soKhach);
        };
    }

    public static Specification<LoaiPhong> giaBetween(Double min, Double max){
        return (root, query, cb) -> {
            if (min == null && max == null) return null;

            if(min != null && max != null){
                return cb.between(root.get("gia"), min, max);
            }

            if(min != null){
                return cb.greaterThanOrEqualTo(root.get("gia"), min);
            }

            return cb.lessThanOrEqualTo(root.get("gia"), max);
        };
    }

    public static Specification<LoaiPhong> dienTichBetween(Double min, Double max){
        return (root, query, cb) -> {
            if (min == null && max == null) return null;

            if (min != null && max != null)
                return cb.between(root.get("dienTich"), min, max);

            if (min != null)
                return cb.greaterThanOrEqualTo(root.get("dienTich"), min);

            return cb.lessThanOrEqualTo(root.get("dienTich"), max);
        };
    }

    public static Specification<LoaiPhong> loaiGiuong(String maGiuong) {
        return (root, query, cb) -> {
            if (maGiuong == null) return null;

            Join<LoaiPhong, ChiTietLoaiGiuong> ct = root.join("chiTietLoaiGiuongList", JoinType.LEFT);
            Join<ChiTietLoaiGiuong, LoaiGiuong> g = ct.join("loaiGiuong", JoinType.LEFT);

            return cb.equal(g.get("maGiuong"), maGiuong);
        };
    }

    public static Specification<LoaiPhong> phongTrong(LocalDateTime checkIn, LocalDateTime checkOut) {
        return (root, query, cb) -> {
            if (checkIn == null || checkOut == null) return null;

            Join<LoaiPhong, Phong> p = root.join("phongList", JoinType.LEFT);

            Subquery<String> sub = query.subquery(String.class);
            Root<DonDatPhong> ddp = sub.from(DonDatPhong.class);

            sub.select(ddp.get("phong").get("maPhong"))
                    .where(
                            cb.lessThan(ddp.get("checkIn"), checkOut),
                            cb.greaterThan(ddp.get("checkOut"), checkIn),
                            ddp.get("trangThai").in(
                                    TrangThaiDon.CHUA_THANH_TOAN,
                                    TrangThaiDon.DA_THANH_TOAN
                            )
                    );

            return cb.not(p.get("maPhong").in(sub));
        };
    }

}
