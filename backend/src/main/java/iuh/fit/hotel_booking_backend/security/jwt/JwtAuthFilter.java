package iuh.fit.hotel_booking_backend.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import iuh.fit.hotel_booking_backend.dto.APIResponse;
import iuh.fit.hotel_booking_backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String token;
        final String email;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        token = authHeader.substring(7);

        try {
            email = jwtUtil.extractEmail(token);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                if (jwtUtil.isTokenValid(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            // Token hết hạn
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Token đã hết hạn. Vui lòng đăng nhập lại.");
            return;
        } catch (io.jsonwebtoken.MalformedJwtException | io.jsonwebtoken.SignatureException e) {
            // Token sai định dạng hoặc không hợp lệ
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Token không hợp lệ.");
            return;
        } catch (Exception e) {
            // Các lỗi khác (ví dụ NullPointerException, v.v.)
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Lỗi xác thực token: " + e.getMessage());
            return;
        }

        filterChain.doFilter(request, response);
    }

    // Hàm hỗ trợ gửi phản hồi JSON lỗi
    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json;charset=UTF-8");

        APIResponse<Object> apiResponse = new APIResponse<>(
                false,
                message,
                null
        );

        // Dùng Jackson để convert sang JSON
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(apiResponse);

        response.getWriter().write(json);
    }

}
