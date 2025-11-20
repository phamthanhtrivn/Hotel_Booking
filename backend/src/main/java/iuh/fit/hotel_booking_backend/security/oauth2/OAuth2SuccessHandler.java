package iuh.fit.hotel_booking_backend.security.oauth2;

import io.github.cdimascio.dotenv.Dotenv;
import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.dto.LoginResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final OAuthService oAuthService;
    private final String frontendUrl = Dotenv.load().get("FRONTEND_URL");

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = (String) oAuth2User.getAttributes().get("email");
        String name = (String) oAuth2User.getAttributes().get("name");

        APIResponse<LoginResponse> api = oAuthService.processOAuthPostLogin(email, name);

        String redirectUrl = frontendUrl + "/oauth2/success?token=" +
                URLEncoder.encode(api.getData().getToken(), StandardCharsets.UTF_8);

        response.sendRedirect(redirectUrl);
    }
}
