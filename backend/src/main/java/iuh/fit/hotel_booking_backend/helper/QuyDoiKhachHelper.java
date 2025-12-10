package iuh.fit.hotel_booking_backend.helper;

public class QuyDoiKhachHelper {
    public static class KhachThucTe {
        public int soNguoiLon;
        public int soTreEm;
    }

    public static KhachThucTe tinhKhachThucTe(Integer soNguoiLon, Integer[] treEm) {

        KhachThucTe k = new KhachThucTe();

        int tre0_6 = 0;
        int tre7_11 = 0;
        int tre12_plus = 0;

        if (treEm != null) {
            for (int age : treEm) {
                if (age <= 6) {
                    tre0_6++;
                } else if (age <= 11) {
                    tre7_11++;
                } else {
                    tre12_plus++;
                }
            }
        }

        k.soNguoiLon = soNguoiLon + tre12_plus;
        k.soTreEm = tre0_6 + tre7_11;

        return k;
    }


}
