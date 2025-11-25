package iuh.fit.hotel_booking_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableFeignClients(basePackages = "iuh.fit.hotel_booking_backend.client")
public class HotelBookingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HotelBookingBackendApplication.class, args);
    }

}
