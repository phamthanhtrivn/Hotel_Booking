package iuh.fit.hotel_booking_backend.exception;

import iuh.fit.hotel_booking_backend.dto.APIResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<APIResponse<Object>> handleValidationException(MethodArgumentNotValidException ex) {
        APIResponse<Object> apiResponse = new APIResponse<>();

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err ->
                errors.put(err.getField(), err.getDefaultMessage())
        );

        apiResponse.setMessage("Dữ liệu không hợp lệ");
        apiResponse.setData(errors);

        return ResponseEntity.badRequest().body(apiResponse);
    }

}
