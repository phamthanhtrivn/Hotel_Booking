package iuh.fit.hotel_booking_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HotelBookingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HotelBookingBackendApplication.class, args);
    }

}
