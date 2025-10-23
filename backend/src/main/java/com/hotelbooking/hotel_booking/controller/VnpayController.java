package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.VnpayResponse;
import com.hotelbooking.hotel_booking.service.VnpayService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/payment")
@RequiredArgsConstructor
public class VnpayController {
    @Autowired
    private final VnpayService paymentService;
    @GetMapping("/vn-pay")
    public ResponseEntity<ApiResponse<VnpayResponse>> pay(HttpServletRequest request) {
        VnpayResponse vnpayResponse = paymentService.createVnPayPayment(request);
        return ResponseEntity.ok(ApiResponse.<VnpayResponse>builder()
                        .message("Get UrlVpn thành công")
                        .result(vnpayResponse)
                .build());
    }
    @GetMapping("/vn-pay-callback")
    public ResponseEntity<ApiResponse<VnpayResponse>> payCallbackHandler(HttpServletRequest request,
                                                                         @RequestParam String vnp_ResponseCode,
                                                                         HttpServletResponse response) throws Exception {
        String status = request.getParameter("vnp_ResponseCode");
        VnpayResponse vnpayResponse;
        String message;
        if ("00".equals(status)) {
            vnpayResponse = new VnpayResponse("00", "Success", "Thanh toán thành công");
            message = "VNPay callback - Thanh toán thành công";
            response.sendRedirect("http://localhost:5173/success-booking");

        } else {
            vnpayResponse = new VnpayResponse(status, "Failed", "Thanh toán thất bại hoặc bị hủy");
            message = "VNPay callback - Thanh toán thất bại";
            response.sendRedirect("http://localhost:5173/booking-fail");
        }
        return ResponseEntity.ok(ApiResponse.<VnpayResponse>builder()
                        .message(message)
                        .result(vnpayResponse)
                        .build());
    }

}
