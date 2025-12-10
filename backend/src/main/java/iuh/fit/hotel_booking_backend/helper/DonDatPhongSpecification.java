package iuh.fit.hotel_booking_backend.helper;

import iuh.fit.hotel_booking_backend.dto.DonDatPhongSearchRequest;
import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class DonDatPhongSpecification {
    public static Specification<DonDatPhong> build(DonDatPhongSearchRequest req) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (req.getKeyword() != null && !req.getKeyword().isEmpty()) {
                String kw = "%" + req.getKeyword().toLowerCase() + "%";
                Predicate byHoTen = cb.like(cb.lower(root.get("hoTenKhachHang")), kw);
                Predicate byEmail = cb.like(cb.lower(root.get("email")), kw);
                Predicate bySoDienThoai = cb.like(root.get("soDienThoai"), kw);
                predicates.add(cb.or(byHoTen, byEmail, bySoDienThoai));
            }

            if (req.getHoTenKhachHang() != null && !req.getHoTenKhachHang().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("hoTenKhachHang")), "%" + req.getHoTenKhachHang().toLowerCase() + "%"));
            }
            if (req.getSoDienThoai() != null && !req.getSoDienThoai().isEmpty()) {
                predicates.add(cb.equal(root.get("soDienThoai"), req.getSoDienThoai()));
            }
            if (req.getEmail() != null && !req.getEmail().isEmpty()) {
                predicates.add(cb.equal(cb.lower(root.get("email")), req.getEmail().toLowerCase()));
            }
            if (req.getMaKhachHang() != null && !req.getMaKhachHang().isEmpty()) {
                predicates.add(cb.equal(root.get("khachHang").get("maKhachHang"), req.getMaKhachHang()));
            }
            if (req.getMaPhong() != null && !req.getMaPhong().isEmpty()) {
                predicates.add(cb.equal(root.get("phong").get("maPhong"), req.getMaPhong()));
            }
            if (req.getTrangThai() != null) {
                predicates.add(cb.equal(root.get("trangThai"), req.getTrangThai()));
            }
            if (req.getCheckIn() != null && req.getCheckOut() != null) {
                predicates.add(cb.lessThan(root.get("checkIn"), req.getCheckOut()));
                predicates.add(cb.greaterThan(root.get("checkOut"), req.getCheckIn()));
            } else {
                if (req.getCheckIn() != null) {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("checkIn"), req.getCheckIn()));
                }
                if (req.getCheckOut() != null) {
                    predicates.add(cb.lessThanOrEqualTo(root.get("checkOut"), req.getCheckOut()));
                }
            }
            if (req.getMinTongTien() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("tongTien"), req.getMinTongTien()));
            }
            if (req.getMaxTongTien() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("tongTien"), req.getMaxTongTien()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
