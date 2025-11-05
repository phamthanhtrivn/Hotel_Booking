package iuh.fit.hotel_booking_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "khach_hang")
public class KhachHang {
    @Id
    @Column(name = "ma_khach_hang")
    private String maKhachHang;
    @Column(name = "ho_ten_khach_hang")
    private String hoTenKH;
    @Column(name = "so_dien_thoai")
    private String soDienThoai;
    @Column(name = "diem_tich_luy")
    private int diemTichLuy;

}
