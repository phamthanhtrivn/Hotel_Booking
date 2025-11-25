package iuh.fit.hotel_booking_backend.dto;

import iuh.fit.hotel_booking_backend.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DanhGiaRespone {
    private DanhGia danhGia;
    private KhachHang khachHang;
    private DonDatPhong donDatPhong;
    private Phong phong;
    private LoaiPhong loaiPhong;
}
