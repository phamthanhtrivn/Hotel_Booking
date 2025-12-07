package iuh.fit.hotel_booking_backend.controller;

import iuh.fit.hotel_booking_backend.dto.MoMoResponse;
import iuh.fit.hotel_booking_backend.dto.PaymentRequest;
import iuh.fit.hotel_booking_backend.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/vn-pay")
    public ResponseEntity<?> pay(HttpServletRequest request, @RequestBody PaymentRequest paymentRequest) {
        return ResponseEntity.ok(paymentService.createVnPayPayment(request, paymentRequest));
    }

    @GetMapping("/vn-pay-callback")
    public void payCallbackHandler(HttpServletRequest request, HttpServletResponse response) {
        paymentService.payCallbackHandler(request, response);
    }

    @PostMapping("/momo")
    public MoMoResponse momo(@RequestBody PaymentRequest paymentRequest) {
        return paymentService.createMoMoPayment(paymentRequest);
    }

    @GetMapping("/momo-return")
    public void momoReturnHandler(HttpServletRequest request, HttpServletResponse response) throws IOException {
        paymentService.handleMoMoReturn(request, response);
    }
}
