package com.hotelbooking.hotel_booking.HotelTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.dto.request.HotelRequest;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class HotelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    private String accessToken;

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

        var rootNode = objectMapper.readTree(loginResponse);
        var resultNode = rootNode.get("result");
        if (resultNode != null && resultNode.has("token")) {
            accessToken = resultNode.get("token").asText();
        } else {
            throw new RuntimeException("Login response không có token: " + loginResponse);
        }
    }

    @Test
    public void testCreateHotel() throws Exception {
        HotelRequest hotelRequest = new HotelRequest();
        hotelRequest.setHotelName("Khách sạn ABCDF");
        hotelRequest.setHotelAddress("123 Đường Lê Lợi, TP.HCM");
        hotelRequest.setHotelCost(1500000.0);
        hotelRequest.setHotelTotalRoom(50.0);
        hotelRequest.setHotelPhone("0123456789");
        hotelRequest.setHotelDescription("Khách sạn gần trung tâm");
        hotelRequest.setStatus(1); // tùy entity bạn định nghĩa

        String hotelJson = objectMapper.writeValueAsString(hotelRequest);

        mockMvc.perform(post("/api/hotel/create")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(hotelJson))
                .andExpect(status().isOk());
    }
    @Test
    public void testUpdateHotel() throws Exception {
        int hotelId = 102;

        HotelRequest updateRequest = new HotelRequest();
        updateRequest.setHotelName("Khách sạn XYZ Updated");
        updateRequest.setHotelAddress("456 Đường Nguyễn Huệ, TP.HCM");
        updateRequest.setHotelCost(2000000.0);
        updateRequest.setHotelTotalRoom(60.0);
        updateRequest.setHotelPhone("0987654321");
        updateRequest.setHotelDescription("Cập nhật thông tin khách sạn");
        updateRequest.setStatus(1);

        String updateJson = objectMapper.writeValueAsString(updateRequest);

        mockMvc.perform(put("/api/hotel/" + hotelId)
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isOk());
    }
}
