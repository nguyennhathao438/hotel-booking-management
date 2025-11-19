package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.config.VnpayConfig;
import com.hotelbooking.hotel_booking.dto.response.VnpayResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class CreateVnPayPaymentTest {

    private VnpayService vnpayService;

    @Mock
    private VnpayConfig vnPayConfig;

    @Mock
    private HttpServletRequest request;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        vnpayService = new VnpayService(vnPayConfig);
    }

    @Test
    @DisplayName("Tạo thanh toán VNPay thành công với amount và bankCode hợp lệ")
    void testCreateVnPayPayment() {
        when(request.getParameter("amount")).thenReturn("1000");
        when(request.getParameter("bankCode")).thenReturn("NCB");

        Map<String, String> configMap = new HashMap<>();
        configMap.put("vnp_Version", "2.1.0");
        configMap.put("vnp_Command", "pay");
        when(vnPayConfig.getVNPayConfig()).thenReturn(configMap);
        when(vnPayConfig.getSecretKey()).thenReturn("dummy-secret");
        when(vnPayConfig.getVnp_PayUrl()).thenReturn("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html");


        VnpayResponse response = vnpayService.createVnPayPayment(request);

        assertNotNull(response);
        assertNotNull(response.getPaymentUrl());
        assertTrue(response.getPaymentUrl().contains("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"));
        assertTrue(response.getCode().equals("00"));
        assertTrue(response.getMessage().equals("Success"));

        verify(request, times(1)).getParameter("amount");
        verify(request, times(1)).getParameter("bankCode");
        verify(vnPayConfig, times(1)).getVNPayConfig();
    }

}
