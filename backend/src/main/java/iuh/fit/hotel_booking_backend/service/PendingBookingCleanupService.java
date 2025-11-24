package iuh.fit.hotel_booking_backend.service;

import iuh.fit.hotel_booking_backend.entity.DonDatPhong;
import iuh.fit.hotel_booking_backend.entity.TrangThaiDon;
import iuh.fit.hotel_booking_backend.repository.DonDatPhongRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class PendingBookingCleanupService {

    @Autowired
    private DonDatPhongRepository donDatPhongRepo;

    @Autowired
    private EmailService emailService;

    // Chạy mỗi phút để kiểm tra đơn quá hạn
    @Scheduled(fixedRate = 60000) // 1 phút
    @Transactional
    public void cancelExpiredBookings() {
        LocalDateTime expiredTime = LocalDateTime.now().minusMinutes(5);

        List<DonDatPhong> expiredBookings = donDatPhongRepo
                .findByTrangThaiAndNgayTaoBefore(
                        TrangThaiDon.CHUA_THANH_TOAN,
                        expiredTime
                );

        for (DonDatPhong booking : expiredBookings) {
            try {
                booking.setTrangThai(TrangThaiDon.DA_HUY);
                donDatPhongRepo.save(booking);

                log.info("Đã hủy đơn quá hạn: {}", booking.getMaDatPhong());

                // Gửi email thông báo
                if (booking.getEmail() != null) {
                    emailService.sendBookingCanceledEmail(
                            booking.getEmail(),
                            booking.getMaDatPhong()
                    );
                }
            } catch (Exception e) {
                log.error("Lỗi khi hủy đơn: {}", booking.getMaDatPhong(), e);
            }
        }
    }
}
