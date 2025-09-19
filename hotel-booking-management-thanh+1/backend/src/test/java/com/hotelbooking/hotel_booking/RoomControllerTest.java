package com.hotelbooking.hotel_booking;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testRegisterRoom() throws Exception {
        String json = """
                {
                  "roomName": "Suite 208",
                  "roomType": "Suite",
                  "capacity": 4,
                  "roomPrice": 2500000
                }
                """;

        mockMvc.perform(post("/api/room/register")
                        .contentType(MediaType.APPLICATION_JSON)   // ✅ dùng MediaType đúng
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.roomName").value("Suite 208"));
    }
}
