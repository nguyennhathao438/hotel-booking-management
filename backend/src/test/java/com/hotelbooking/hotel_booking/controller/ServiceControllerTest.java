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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ServiceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String accessToken;
    private int testHotelId;

    @BeforeEach
    void setUp() throws Exception {

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
    }


    private int createTestService() throws Exception {
        String serviceJson = """
        {
            "serviceName": "Spa",
            "description": "Relaxing spa service",
            "price": 100.0,
            "icon": "spa-icon.png",
            "hotelID": %d
        }
        """.formatted(testHotelId);

        String response = mockMvc.perform(post("/api/service/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(serviceJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        return objectMapper.readTree(response).get("result").get("serviceId").asInt();
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Tạo dịch vụ thành công")
    void createService_Success() throws Exception {
        String serviceJson = """
        {
            "hotelID": %d,
            "serviceName": "Spa",
            "description": "Relaxing spa service",
            "price": 100.0,
            "icon": "spa-icon.png"
        }
        """.formatted(testHotelId);

        mockMvc.perform(post("/api/service/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(serviceJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.serviceName").value("Spa"))
                .andExpect(jsonPath("$.result.hotel.hotelId").value(testHotelId));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy danh sách dịch vụ theo hotelId")
    void getServicesByHotelId_Success() throws Exception {
        createTestService();

        mockMvc.perform(get("/api/service/hotel/{hotelId}", testHotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").isArray())
                .andExpect(jsonPath("$.result[0].serviceName").value("Spa"));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Xóa dịch vụ thành công")
    void deleteService_Success() throws Exception {
        int serviceId = createTestService();

        mockMvc.perform(delete("/api/service/{serviceId}", serviceId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Xóa dịch vụ thành công"));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Xóa dịch vụ thất bại khi id không tồn tại")
    void deleteService_NotFound() throws Exception {
        mockMvc.perform(delete("/api/service/{serviceId}", 999999)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Tạo service thất bại khi hotel không tồn tại")
    void createService_HotelNotFound() throws Exception {
        String serviceJson = """
            {
              "hotelID": 999999,
              "serviceName": "Spa",
              "description": "Relaxing spa service",
              "price": 100.0,
              "icon": "spa-icon.png"
            }
    """;

        mockMvc.perform(post("/api/service/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(serviceJson))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Tạo service thất bại khi serviceName null hoặc rỗng")
    void createService_InvalidName() throws Exception {

            String serviceJson = """
                {
                  "hotelID": %d,
                  "serviceName": "",
                  "description": "Desc",
                  "price": 100.0,
                  "icon": "icon.png"
                }
                """.formatted(testHotelId);

            mockMvc.perform(post("/api/service/create")
                            .contentType(MediaType.APPLICATION_JSON)
                            .header("Authorization", "Bearer " + accessToken)
                            .content(serviceJson))
                    .andExpect(status().is4xxClientError());

    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Tạo service thất bại khi price null hoặc âm")
    void createService_InvalidPrice() throws Exception {
        String[] invalidPrices = {null, "-50.0"};

        for (String price : invalidPrices) {
            String serviceJson = """
                {
                  "hotelID": %d,
                  "serviceName": "Valid Name",
                  "description": "Desc",
                  "price": %s,
                  "icon": "icon.png"
                }
                """.formatted(testHotelId, price);

            mockMvc.perform(post("/api/service/create")
                            .contentType(MediaType.APPLICATION_JSON)
                            .header("Authorization", "Bearer " + accessToken)
                            .content(serviceJson))
                    .andExpect(status().is4xxClientError());
        }
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Tạo service với icon hoặc description null hoặc rỗng")
    void createService_NullOrEmptyOptionalFields() throws Exception {
        String[][] testCases = {
                {null, "icon.png"},
                {"Description", null},
                {"", ""}
        };

        for (String[] fields : testCases) {
            String description = fields[0] == null ? "null" : "\"" + fields[0] + "\"";
            String icon = fields[1] == null ? "null" : "\"" + fields[1] + "\"";

            String serviceJson = """
                {
                  "hotelID": %d,
                  "serviceName": "Valid Name",
                  "description": %s,
                  "price": 100.0,
                  "icon": %s
                }
                """.formatted(testHotelId, description, icon);

            mockMvc.perform(post("/api/service/create")
                            .contentType(MediaType.APPLICATION_JSON)
                            .header("Authorization", "Bearer " + accessToken)
                            .content(serviceJson))
                    .andExpect(status().isOk());
        }
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy service thất bại khi hotelId không tồn tại")
    void getServicesByHotelId_NotFound() throws Exception {
        mockMvc.perform(get("/api/service/hotel/{hotelId}", 999999)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().is4xxClientError());
    }

}
