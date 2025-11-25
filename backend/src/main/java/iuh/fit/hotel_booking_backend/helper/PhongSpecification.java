package iuh.fit.hotel_booking_backend.helper;

import iuh.fit.hotel_booking_backend.dto.PhongFilter;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.entity.Phong;
import iuh.fit.hotel_booking_backend.entity.TrangThaiPhong;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class PhongSpecification {
    public static Specification<Phong> filter(PhongFilter f) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Lọc loại phòng
            if (f.getMaLoaiPhong() != null) {
                Join<Phong, LoaiPhong> joinLoai = root.join("loaiPhong", JoinType.INNER);
                predicates.add(cb.equal(joinLoai.get("maLoaiPhong"), f.getMaLoaiPhong()));
            }

            // Lọc vị trí
            if (f.getViTri() != null && !f.getViTri().equals("ALL")) {
                predicates.add(cb.equal(root.get("viTri"), f.getViTri()));
            }

            // Lọc trạng thái enum
            if (f.getTrangThai() != null && !f.getTrangThai().equals("ALL")) {
                predicates.add(cb.equal(root.get("trangThai"), TrangThaiPhong.valueOf(f.getTrangThai())));
            }

            // Lọc tình trạng (Boolean)
            if (f.getTinhTrang() != null) {
                predicates.add(cb.equal(root.get("tinhTrang"), f.getTinhTrang()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
