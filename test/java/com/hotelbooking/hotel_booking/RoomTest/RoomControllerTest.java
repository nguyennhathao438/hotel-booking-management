package com.hotelbooking.hotel_booking.RoomTest;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.dto.request.RoomRequest;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    private User testUser;
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
    public void testCreateRoomWithRealToken() throws Exception {
        String roomJson = """
    {
        "roomName": "Deluxe Room 45",
        "roomType": "Deluxe",
        "roomCapacity": 2,
        "bedCount": 1,
        "roomPrice": 1500000.0,
        "hotelID": 152
    }
    """;

        mockMvc.perform(post("/api/room/create")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(roomJson))
                .andExpect(status().isOk());
    }
    @Test
    public void testUpdateRoom() throws Exception {
        int roomId = 1;

        RoomRequest updateRequest = new RoomRequest();
        updateRequest.setRoomName("Deluxe Room Updated");
        updateRequest.setRoomType("Suite");
        updateRequest.setRoomCapacity(3);
        updateRequest.setBedCount(2);
        updateRequest.setRoomPrice(2000000.0);
        updateRequest.setHotelID(152);

        String updateJson = objectMapper.writeValueAsString(updateRequest);

        mockMvc.perform(put("/api/room/" + roomId)
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isOk());
    }

}
