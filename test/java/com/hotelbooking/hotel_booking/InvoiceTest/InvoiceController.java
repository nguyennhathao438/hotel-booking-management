package com.hotelbooking.hotel_booking.InvoiceTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.dto.request.InvoiceRequest;
import com.hotelbooking.hotel_booking.repository.InvoiceRepository;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class InvoiceController {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    private String accessToken;

    @BeforeEach
    void setUp() throws Exception {
        // login lấy token
        String loginJson = """
        {
            "email": "admin@gmail.com",
            "password": "123456"
        }
        """;

        String loginResponse = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andReturn()
                .getResponse()
                .getContentAsString();
        var rootNode = objectMapper.readTree(loginResponse);
        var resultNode = rootNode.get("result");
        if (resultNode != null && resultNode.has("token")) {
            accessToken = resultNode.get("token").asText();
        } else {
            throw new RuntimeException("Login response không có token: " + loginResponse);
        }
    }

    @Test
    public void testCreateInvoiceWithRealToken() throws Exception {
        InvoiceRequest request = new InvoiceRequest();
        request.setRoomId(1);
        request.setUserId(1);
        request.setCheckInDate(LocalDate.now().plusDays(1));
        request.setCheckOutDate(LocalDate.now().plusDays(5));
        request.setTotalAmount(1500000.0);
        request.setPayment(1);
        request.setStatus(0);

        String invoiceJson = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/api/invoice/create")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invoiceJson))
                .andExpect(status().isOk());
    }
    @Test
    public void testUpdateInvoiceStatus() throws Exception {
        int invoiceId = 1;
        InvoiceRequest updateRequest = new InvoiceRequest();
        updateRequest.setStatus(1);

        String requestJson = objectMapper.writeValueAsString(updateRequest);

        mockMvc.perform(put("/api/invoice/" + invoiceId)
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk());
    }
}
