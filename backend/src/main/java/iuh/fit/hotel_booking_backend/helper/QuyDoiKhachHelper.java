package iuh.fit.hotel_booking_backend.helper;

public class QuyDoiKhachHelper {
    public static int tinhSoKhachSauQuyDoi(Integer soKhach, Integer[] treEm) {
        if (treEm == null || treEm.length == 0) {
            return soKhach;
        }

        int count_1_2 = 0;
        int count_3_8 = 0;

        for (int age : treEm) {
            if (age >= 1 && age <= 2) {
                count_1_2++;
            } else if (age >= 3 && age <= 8) {
                count_3_8++;
            }
        }

        // Trẻ 3–8 tuổi: 2 trẻ = 1 người lớn
        int adultsFrom3to8 = count_3_8 / 2;

        // Trẻ 1–2 tuổi: quá 2 trẻ thì tính người lớn
        int adultsFrom1to2 = Math.max(0, count_1_2 - 2);

        int totalAdults = soKhach + adultsFrom3to8 + adultsFrom1to2;

        return totalAdults;
    }

}
