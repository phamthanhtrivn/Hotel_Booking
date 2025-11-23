package iuh.fit.hotel_booking_backend.service;

import io.github.cdimascio.dotenv.Dotenv;
import iuh.fit.hotel_booking_backend.config.VNPayConfig;
import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.PaymentRequest;
import iuh.fit.hotel_booking_backend.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final VNPayConfig vnPayConfig;
    private final DonDatPhongService donDatPhongService;
    private final String frontendUrl = Dotenv.load().get("FRONTEND_URL");

    public APIResponse<Object> createVnPayPayment(HttpServletRequest request, PaymentRequest paymentRequest) {
        APIResponse<Object> response = new APIResponse<>();
        response.setSuccess(false);

        long amount = paymentRequest.getAmount() * 100L;
        String bankCode = paymentRequest.getBankCode();
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig(paymentRequest.getBookingId());
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));

        System.out.println("VNPay Params: " + vnpParamsMap);

        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

        response.setSuccess(true);
        response.setMessage("Tạo URL thanh toán VNPay thành công");
        response.setData(paymentUrl);
        return response;
    }

    public void payCallbackHandler(HttpServletRequest request, HttpServletResponse response) {
        String responseCode = request.getParameter("vnp_ResponseCode");
        String bookingId = request.getParameter("vnp_TxnRef");
        try {
            if (responseCode.equals("00")) {
                donDatPhongService.updateStatusPaymentSuccess(bookingId);
                response.sendRedirect(frontendUrl + "/payment/success?bookingId=" + bookingId);
            } else {
                response.sendRedirect(frontendUrl + "/payment/failed?bookingId=" + bookingId);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
