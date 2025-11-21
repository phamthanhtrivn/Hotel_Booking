package iuh.fit.hotel_booking_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaymentService {

    @Value("${vnpay.tmnCode}")
    private String vnpTmnCode;

    @Value("${vnpay.hashSecret}")
    private String vnpHashSecret;

    @Value("${vnpay.paymentUrl}")
    private String vnpPaymentUrl;

    @Value("${vnpay.returnUrl}")
    private String vnpReturnUrl;

    @Value("${vnpay.ipnUrl}")
    private String vnpIpnUrl;

    public String createPaymentUrl(long amountVnd, String orderId, String orderInfo, String clientIp) throws Exception {
        Map<String, String> vnpParams = new HashMap<>();

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_Locale = "vn";
        String vnp_CurrCode = "VND";

        String createDate = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

        vnpParams.put("vnp_Version", vnp_Version);
        vnpParams.put("vnp_Command", vnp_Command);
        vnpParams.put("vnp_TmnCode", vnpTmnCode);
        vnpParams.put("vnp_Amount", String.valueOf(amountVnd * 100L)); // multiply by 100 (VNPAY expects amount in cents)
        vnpParams.put("vnp_CurrCode", vnp_CurrCode);
        vnpParams.put("vnp_TxnRef", orderId);
        vnpParams.put("vnp_OrderInfo", orderInfo);
        vnpParams.put("vnp_OrderType", "other");
        vnpParams.put("vnp_Locale", vnp_Locale);
        vnpParams.put("vnp_ReturnUrl", vnpReturnUrl);
        vnpParams.put("vnp_IpAddr", clientIp);
        vnpParams.put("vnp_CreateDate", createDate);

        // optional: vnp_BankCode etc.

        // sort keys
        List<String> fieldNames = new ArrayList<>(vnpParams.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (String name : fieldNames) {
            String value = vnpParams.get(name);
            if (value == null || value.length() == 0) continue;
            // build hash data string (no encoding)
            if (hashData.length() > 0) hashData.append('&');
            hashData.append(name).append('=').append(value);

            // build query string (url-encoded)
            if (query.length() > 0) query.append('&');
            query.append(URLEncoder.encode(name, StandardCharsets.UTF_8.name()))
                    .append('=')
                    .append(URLEncoder.encode(value, StandardCharsets.UTF_8.name()));
        }

        // compute secure hash with HMAC SHA512
        String secureHash = hmacSHA512(vnpHashSecret, hashData.toString());
        query.append("&").append(URLEncoder.encode("vnp_SecureHash", StandardCharsets.UTF_8.name()))
                .append('=').append(URLEncoder.encode(secureHash, StandardCharsets.UTF_8.name()));

        return vnpPaymentUrl + "?" + query.toString();
    }

    public boolean validateResponse(Map<String, String> params) throws Exception {
        // params: all query params returned by VNPAY
        // get secure hash from params then compute our own from the other params
        String receivedHash = params.get("vnp_SecureHash");
        if (receivedHash == null) return false;

        // exclude secure hash keys
        Map<String, String> filtered = new HashMap<>();
        for (Map.Entry<String, String> e : params.entrySet()) {
            String k = e.getKey();
            if (k.equals("vnp_SecureHash") || k.equals("vnp_SecureHashType")) continue;
            filtered.put(k, e.getValue());
        }

        List<String> fieldNames = new ArrayList<>(filtered.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        for (String name : fieldNames) {
            String value = filtered.get(name);
            if (value == null || value.length() == 0) continue;
            if (hashData.length() > 0) hashData.append('&');
            hashData.append(name).append('=').append(value);
        }

        String calculatedHash = hmacSHA512(vnpHashSecret, hashData.toString());
        return calculatedHash.equalsIgnoreCase(receivedHash);
    }

    private String hmacSHA512(String key, String data) throws Exception {
        Mac hmac512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmac512.init(secretKey);
        byte[] bytes = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));
        // convert to hex
        StringBuilder hash = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(b & 0xff);
            if (hex.length() == 1) hash.append('0');
            hash.append(hex);
        }
        return hash.toString();
    }
}

