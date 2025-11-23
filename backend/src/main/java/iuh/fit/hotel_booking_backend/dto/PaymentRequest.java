package iuh.fit.hotel_booking_backend.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private long amount;
    private String bankCode;
    private String bookingId;
}
