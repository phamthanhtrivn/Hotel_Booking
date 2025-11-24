package iuh.fit.hotel_booking_backend.dto;

import lombok.Data;

@Data
public class CreatePaymentRequest {
    private long amount;
    private String orderId;
    private String orderInfo;
}
