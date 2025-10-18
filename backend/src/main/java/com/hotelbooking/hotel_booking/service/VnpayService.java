//package com.hotelbooking.hotel_booking.service;
//
//import com.hotelbooking.hotel_booking.config.VnpayConfig;
//import com.hotelbooking.hotel_booking.dto.response.VnpayResponse;
//import com.hotelbooking.hotel_booking.util.VnpayUtil;
//import jakarta.servlet.http.HttpServletRequest;
//
//import java.util.Map;
//
//import com.hotelbooking.hotel_booking.config.VnpayConfig;
//import com.hotelbooking.hotel_booking.util.VnpayUtil;
//import jakarta.servlet.http.HttpServletRequest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.*;
//@Service
//@RequiredArgsConstructor
//public class VnpayService {
//    @Autowired
//    private final VnpayConfig vnPayConfig;
//    public VnpayResponse createVnPayPayment(HttpServletRequest request) {
//        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
//        String bankCode = request.getParameter("bankCode");
//        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
//        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
//        if (bankCode != null && !bankCode.isEmpty()) {
//            vnpParamsMap.put("vnp_BankCode", bankCode);
//        }
//        vnpParamsMap.put("vnp_IpAddr", VnpayUtil.getIpAddress(request));
//        //build query url
//        String queryUrl = VnpayUtil.getPaymentURL(vnpParamsMap, true);
//        String hashData = VnpayUtil.getPaymentURL(vnpParamsMap, false);
//        String vnpSecureHash = VnpayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
//        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
//        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
//        return VnpayResponse.builder()
//                .code("ok")
//                .message("success")
//                .paymentUrl(paymentUrl).build();
//    }
//}

package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.config.VnpayConfig;
import com.hotelbooking.hotel_booking.dto.response.VnpayResponse;
import com.hotelbooking.hotel_booking.util.VnpayUtil;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

import com.hotelbooking.hotel_booking.config.VnpayConfig;
import com.hotelbooking.hotel_booking.util.VnpayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
@RequiredArgsConstructor
public class VnpayService {
    private final VnpayConfig vnPayConfig;

    public VnpayResponse createVnPayPayment(HttpServletRequest request) {
        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");

        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();

        // ✅ Sinh mã giao dịch ngẫu nhiên cho mỗi lần thanh toán
        String vnpTxnRef = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        vnpParamsMap.put("vnp_TxnRef", vnpTxnRef);

        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        vnpParamsMap.put("vnp_IpAddr", VnpayUtil.getIpAddress(request));

        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }

        // ✅ Thêm thời gian hết hạn giao dịch (sau 15 phút)
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        cld.add(Calendar.MINUTE, 15);
        String expireDate = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(cld.getTime());
        vnpParamsMap.put("vnp_ExpireDate", expireDate);

        // ✅ Build URL
        String queryUrl = VnpayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VnpayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VnpayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;

        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

        return VnpayResponse.builder()
                .code("00")
                .message("Success")
                .paymentUrl(paymentUrl)
                .build();
    }
}

