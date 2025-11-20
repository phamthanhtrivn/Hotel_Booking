package iuh.fit.hotel_booking_backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // --- 1. Xác nhận đặt phòng (chưa thanh toán) ---
    public void sendBookingConfirmationWithPaymentInfo(String toEmail, String maDatPhong, double tongTienTT) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String subject = "Xác nhận đặt phòng - Mã: " + maDatPhong;
            String content = "<p>Cảm ơn bạn đã đặt phòng!</p>"
                    + "<p>Mã đặt phòng: <b>" + maDatPhong + "</b></p>"
                    + "<p>Tổng tiền cần thanh toán: <b>" + String.format("%,.0f VNĐ", tongTienTT) + "</b></p>"
                    + "<p>Vui lòng thanh toán trong vòng 15 phút, nếu không đơn đặt phòng sẽ bị hủy.</p>"
                    + "<p>Chúc bạn có một kỳ nghỉ tuyệt vời!</p>";

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(content, true);
            helper.setFrom("your-email@gmail.com");

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    // --- 2. Thông báo hủy đơn ---
    public void sendBookingCanceledEmail(String toEmail, String maDatPhong) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String subject = "Đơn đặt phòng đã bị hủy - Mã: " + maDatPhong;
            String content = "<p>Đơn đặt phòng của bạn với mã <b>" + maDatPhong + "</b> đã bị hủy do chưa thanh toán trong 15 phút.</p>"
                    + "<p>Nếu bạn muốn đặt lại, vui lòng thực hiện đặt phòng mới.</p>";

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(content, true);
            helper.setFrom("your-email@gmail.com");

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    // --- 3. Xác nhận thanh toán thành công ---
    public void sendBookingPaidEmail(String toEmail, String maDatPhong) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String subject = "Thanh toán thành công - Mã: " + maDatPhong;
            String content = "<p>Cảm ơn bạn đã thanh toán đơn đặt phòng!</p>"
                    + "<p>Mã đặt phòng: <b>" + maDatPhong + "</b></p>"
                    + "<p>Chúc bạn có một kỳ nghỉ tuyệt vời!</p>";

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(content, true);
            helper.setFrom("your-email@gmail.com");

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
