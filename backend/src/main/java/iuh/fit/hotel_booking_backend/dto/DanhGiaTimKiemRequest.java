package iuh.fit.hotel_booking_backend.dto;


import lombok.*;
import org.springframework.data.util.Pair;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DanhGiaTimKiemRequest {
    private String maLoaiPhong;
    private MucDo danhGia;
    private int thang;
    private int nam;

    @Getter
    @Setter
    @ToString
    public static class MucDo {
        private String loai;
        private int diem;
    }
}
