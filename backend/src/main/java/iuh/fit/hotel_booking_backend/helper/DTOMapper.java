package iuh.fit.hotel_booking_backend.helper;

import iuh.fit.hotel_booking_backend.dto.LoaiPhongDTO;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;

public class DTOMapper {
    public static LoaiPhongDTO loaiPhongMapToDTO(LoaiPhong lp) {
        LoaiPhongDTO dto = new LoaiPhongDTO();
        dto.setMaLoaiPhong(lp.getMaLoaiPhong());
        dto.setTenLoaiPhong(lp.getTenLoaiPhong());
        dto.setDienTich(lp.getDienTich());
        dto.setHinhAnh(lp.getHinhAnh());
        dto.setSoKhach(lp.getSoKhach());
        dto.setGia(lp.getGia());
        dto.setMoTa(lp.getMoTa());
        dto.setSoTreEm(lp.getSoTreEm());
        dto.setTinhTrang(lp.isTinhTrang());
        return dto;
    }

}
