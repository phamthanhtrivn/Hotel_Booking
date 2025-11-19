package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.CreatePaymentRequest;
import iuh.fit.hotel_booking_backend.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    // 1) Tạo payment URL và redirect (frontend có thể gọi API và redirect)
    @PostMapping("/create-payment")
    public Map<String, String> createPayment(@RequestBody CreatePaymentRequest req, HttpServletRequest request) throws Exception {
        String clientIp = request.getRemoteAddr();
        String url = paymentService.createPaymentUrl(req.getAmount(), req.getOrderId(), req.getOrderInfo(), clientIp);
        return Collections.singletonMap("paymentUrl", url);
    }

    // 2) ReturnUrl: user được chuyển về (GET request có params)
    @GetMapping("/return")
    public String vnpayReturn(@RequestParam Map<String,String> allParams) throws Exception {
        boolean valid = paymentService.validateResponse(allParams);
        // đọc vnp_ResponseCode (00 là thành công) và xử lý đơn hàng tương ứng
        String respCode = allParams.get("vnp_ResponseCode");
        String txnRef = allParams.get("vnp_TxnRef");

        if (valid && "00".equals(respCode)) {
            // mark booking as PAID
            return "Thanh toán thành công cho đơn " + txnRef;
        } else {
            // handle failure
            return "Thanh toán không thành công hoặc kiểm tra chữ ký thất bại.";
        }
    }

    // 3) IPN: VNPAY call this to notify (server-to-server). MUST return plain text "OK" when processed.
    @PostMapping("/ipn")
    public String vnpayIpn(@RequestParam Map<String,String> allParams) throws Exception {
        boolean valid = paymentService.validateResponse(allParams);
        String respCode = allParams.get("vnp_ResponseCode");
        String txnRef = allParams.get("vnp_TxnRef");

        if (valid) {
            if ("00".equals(respCode)) {
                // update order status to PAID if not already
                // return success message to VNPAY
                return "OK";
            } else {
                // payment failed or other state
                return "Failed";
            }
        } else {
            // signature invalid
            return "Invalid signature";
        }
    }
}
