package iuh.fit.hotel_booking_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OverviewStatDTO {
    private String label;
    private long value;
}
