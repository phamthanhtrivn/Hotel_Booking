package iuh.fit.hotel_booking_backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import iuh.fit.hotel_booking_backend.entity.ChiTietLoaiGiuong;
import iuh.fit.hotel_booking_backend.entity.LoaiPhong;
import iuh.fit.hotel_booking_backend.entity.Phong;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoaiPhongDTO {
    private String maLoaiPhong;
    private String tenLoaiPhong;
    private double dienTich;
    private int soKhach;
    private double gia;
    private List<String> hinhAnh;
    private String moTa;
    private boolean tinhTrang;
    private long soPhongTrong;
    private boolean canDelete;
}
