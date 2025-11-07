package iuh.fit.hotel_booking_backend.util;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;

@Component
public class EnvUtil {
    private final Dotenv dotenv = Dotenv.load();

    public String getJwtSecret() {
        return dotenv.get("JWT_SECRET");
    }
}
