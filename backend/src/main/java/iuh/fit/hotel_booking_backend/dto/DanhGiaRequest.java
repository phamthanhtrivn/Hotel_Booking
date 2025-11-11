package iuh.fit.hotel_booking_backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DanhGiaRequest {
    private int diemSachSe;
    private int diemDichVu;
    private int diemCoSoVatChat;
    private String binhLuan;
    private String maLoaiPhong;
    private String maDatPhong;
}
