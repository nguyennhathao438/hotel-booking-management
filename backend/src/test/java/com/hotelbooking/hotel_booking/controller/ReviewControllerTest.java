package com.hotelbooking.hotel_booking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String accessToken;
    private int testHotelId;
    private int testRoomId;
    private int testInvoiceId;

    @BeforeEach
    void setUp() throws Exception {
        // 1️⃣ Login admin
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

        JsonNode loginNode = objectMapper.readTree(loginResponse).get("result");
        accessToken = loginNode.get("accessToken").asText();

        // 2️⃣ Tạo hotel
        String hotelJson = """
                {
                    "hotelName": "Hotel Test",
                    "hotelAddress": "Hanoi",
                    "hotelPhone": "0123456789",
                    "hotelRating": 4.5,
                    "hotelTotalRoom": 50,
                    "hotelCost": 200,
                    "status": 1,
                    "hotelDescription": "Khách sạn đẹp"
                }
                """;

        String hotelResponse = mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        testHotelId = objectMapper.readTree(hotelResponse)
                .get("result")
                .get("hotelId").asInt();

        // 3️⃣ Tạo room
        testRoomId = createTestRoom();

        // 4️⃣ Tạo invoice
        testInvoiceId = createTestInvoice(testRoomId);
    }

    private int createTestRoom() throws Exception {
        String roomJson = """
        {
            "roomName": "Temp Room",
            "roomType": "Standard",
            "roomPrice": 100,
            "roomCapacity": 2,
            "bedCount": 2,
            "bedRoomCount": 1,
            "hotelID": %d,
            "roomArea": 30.0
        }
        """.formatted(testHotelId);

        String response = mockMvc.perform(post("/api/rooms/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(roomJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        return objectMapper.readTree(response).get("result").get("roomId").asInt();
    }

    private int createTestInvoice(int roomId) throws Exception {
        String invoiceJson = """
                {
                    "userId": 1,
                    "payment": 1,
                    "checkInDate": "%s",
                    "checkOutDate": "%s",
                    "totalPrice": 200
                }
                """.formatted(LocalDate.now().plusDays(1), LocalDate.now().plusDays(2));

        String response = mockMvc.perform(post("/api/invoice/room/%d/create".formatted(roomId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(invoiceJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode node = objectMapper.readTree(response).get("result");
        return node.get("id").asInt();
    }

    private String buildReviewJson(int invoiceId, int rating, String comment) throws Exception {
        Map<String, Object> map = Map.of(
                "invoiceId", invoiceId,
                "rating", rating,
                "comment", comment
        );
        return objectMapper.writeValueAsString(map);
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Tạo review thành công")
    void createReview_Success() throws Exception {
        String reviewJson = buildReviewJson(testInvoiceId, 5, "Rất tốt");

        mockMvc.perform(post("/api/review/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(reviewJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Thêm feedback thành công"))
                .andExpect(jsonPath("$.result.rating").value(5));
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Lấy review theo invoice ID")
    void getReviewByInvoice_Success() throws Exception {
        String reviewJson = buildReviewJson(testInvoiceId, 4, "Good");
        mockMvc.perform(post("/api/review/create")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken)
                .content(reviewJson));

        mockMvc.perform(get("/api/review/invoice/{invoiceId}", testInvoiceId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lấy danh sách feedback theo id invoice thành công"))
                .andExpect(jsonPath("$.result.rating").value(4));
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Lấy review theo hotel ID (Review entity)")
    void getReviewByHotelEntity_Success() throws Exception {
        mockMvc.perform(get("/api/review/oop/{hotelId}", testHotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"))
                .andExpect(jsonPath("$.result").isArray());
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Lấy review theo hotel ID (ReviewResponse DTO)")
    void getReviewByHotelResponse_Success() throws Exception {
        mockMvc.perform(get("/api/review/hotel/{hotelId}", testHotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lấy danh sách feedback theo id hotel thành công"))
                .andExpect(jsonPath("$.result").isArray());
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Lấy tất cả review")
    void getAllReviews_Success() throws Exception {
        mockMvc.perform(get("/api/review/all")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lấy danh sách feedback thành công"))
                .andExpect(jsonPath("$.result").isArray());
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Cập nhật review thành công")
    void updateReview_Success() throws Exception {
        String reviewJson = buildReviewJson(testInvoiceId, 3, "Ok");
        String response = mockMvc.perform(post("/api/review/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(reviewJson))
                .andReturn().getResponse().getContentAsString();

        int reviewId = objectMapper.readTree(response).get("result").get("id").asInt();

        String updateJson = buildReviewJson(testInvoiceId, 5, "Excellent");

        mockMvc.perform(put("/api/review/update/{id}", reviewId)
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Cập nhật feedback thành công"))
                .andExpect(jsonPath("$.result.rating").value(5))
                .andExpect(jsonPath("$.result.comment").value("Excellent"));
    }
}
