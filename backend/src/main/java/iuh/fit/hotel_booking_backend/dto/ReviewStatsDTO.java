package iuh.fit.hotel_booking_backend.dto;

import iuh.fit.hotel_booking_backend.entity.DanhGia;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewStatsDTO {
    private List<DanhGia> topReviews;
    private int numOfReviews;
    private String rating;
    private double avgService;
    private double avgClean;
    private double avgFacilities;
    private double avg;
}