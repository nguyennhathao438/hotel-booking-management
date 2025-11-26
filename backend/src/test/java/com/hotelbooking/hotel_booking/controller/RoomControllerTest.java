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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class RoomControllerTest {

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

    @Test
    @Rollback
    @Transactional
    @DisplayName("Tạo phòng thành công")
    void createRoom_Success() throws Exception {

        String roomJson = """
        {
            "roomName": "Room Test",
            "roomType": "Standard",
            "roomPrice": 100,
            "roomCapacity": 2,
            "bedCount": 2,
            "bedRoomCount": 1,
            "hotelID": %d,
            "roomArea": 30.0
        }
        """.formatted(testHotelId);

        mockMvc.perform(post("/api/rooms/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(roomJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.roomName").value("Room Test"))
                .andExpect(jsonPath("$.result.hotel.hotelId").value(testHotelId));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Tạo phòng thất bại do hotel không tồn tại")
    void createRoom_Fail_HotelNotFound() throws Exception {

        String roomJson = """
        {
            "roomName": "Test Room Fail",
            "roomType": "Standard",
            "roomPrice": 100,
            "roomCapacity": 2,
            "bedCount": 2,
            "bedRoomCount": 1,
            "hotelID": 999999,
            "roomArea": 30.0
        }
        """;

        mockMvc.perform(post("/api/rooms/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(roomJson))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Cập nhật phòng thành công")
    void updateRoom_Success() throws Exception {

        int roomId = createTestRoom();

        String updateJson = """
        {
            "roomName": "Updated Room",
            "roomType": "Deluxe",
            "roomPrice": 150,
            "roomCapacity": 3,
            "bedCount": 2,
            "bedRoomCount": 1,
            "hotelID": %d,
            "roomArea": 35.0
        }
        """.formatted(testHotelId);

        mockMvc.perform(put("/api/rooms/{roomID}", roomId)
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.roomName").value("Updated Room"))
                .andExpect(jsonPath("$.result.roomType").value("Deluxe"));
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Lấy phòng theo ID")
    void getRoomById_Success() throws Exception {
        int roomId = createTestRoom();

        mockMvc.perform(get("/api/rooms/{roomID}", roomId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.roomId").value(roomId));
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Lấy tất cả phòng")
    void getAllRooms_Success() throws Exception {
        createTestRoom();

        mockMvc.perform(get("/api/rooms/all")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").isArray());
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Lấy phòng theo hotelId")
    void getRoomsByHotelId_Success() throws Exception {
        createTestRoom();

        mockMvc.perform(get("/api/rooms/hotel/{hotelId}", testHotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").isArray());
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Xóa phòng thành công")
    void deleteRoom_Success() throws Exception {
        int roomId = createTestRoom();

        mockMvc.perform(delete("/api/rooms/delete/{roomID}", roomId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Xóa phòng thành công"));
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Lấy phòng trống theo ngày")
    void getAvailableRooms_Success() throws Exception {
        createTestRoom();
        LocalDate start = LocalDate.now().plusDays(1);
        LocalDate end = LocalDate.now().plusDays(2);

        mockMvc.perform(get("/api/rooms/available")
                        .param("startDate", start.toString())
                        .param("endDate", end.toString())
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Đếm phòng trống theo ngày")
    void countAvailableRooms_Success() throws Exception {
        createTestRoom();
        LocalDate start = LocalDate.now().plusDays(1);
        LocalDate end = LocalDate.now().plusDays(2);

        mockMvc.perform(get("/api/rooms/available/count")
                        .param("startDate", start.toString())
                        .param("endDate", end.toString())
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").exists());
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("getRoomsByHotelId2 thành công")
    void getRoomsByHotelId2_Success() throws Exception {
        createTestRoom();

        mockMvc.perform(get("/api/rooms/room2/{hotelId}", testHotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").isArray());
    }
    @Test
    @Transactional
    @Rollback
    @DisplayName("Lấy danh sách phòng theo loại phòng và hotelId")
    void findByRoomType_Success() throws Exception {
        int roomId = createTestRoom();

        mockMvc.perform(get("/api/rooms/hotel/{hotelId}/{roomType}", testHotelId, "Standard")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Lấy danh sách phòng theo loại phòng thành công"))
                .andExpect(jsonPath("$.result[0].roomId").value(roomId));
    }

    @Test
    @Transactional
    @Rollback
    @DisplayName("Lấy phòng có giá min theo hotelId")
    void findMinPriceByHotel_Success() throws Exception {
        int roomId = createTestRoom();

        mockMvc.perform(get("/api/rooms/hotel/{hotelId}/min-price", testHotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Lấy phòng có giá min thành công"))
                .andExpect(jsonPath("$.result.roomId").exists());
    }



    @Test
    @Transactional
    @Rollback
    @DisplayName("Cập nhật trạng thái phòng thành công")
    void setStatusRoom_Success() throws Exception {
        int roomId = createTestRoom();

        String statusJson = """
        {"status": 0}
    """;

        mockMvc.perform(put("/api/rooms/status/{roomId}", roomId)
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(statusJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Cập nhật trạng thái thành công cho hóa đơn " + roomId))
                .andExpect(jsonPath("$.result").value("Success"));
    }


}
