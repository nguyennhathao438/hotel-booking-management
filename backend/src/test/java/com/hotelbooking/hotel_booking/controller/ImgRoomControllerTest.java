package com.hotelbooking.hotel_booking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.entity.ImgRoom;
import com.hotelbooking.hotel_booking.repository.ImgRoomRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;

import java.io.InputStream;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ImgRoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ImgRoomRepository imgRoomRepository;

    private String accessToken;
    private int testHotelId;
    private int testRoomId;

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

        String roomResponse = mockMvc.perform(post("/api/rooms/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(roomJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        testRoomId = objectMapper.readTree(roomResponse).get("result").get("roomId").asInt();
    }

    private int uploadTestImage() throws Exception {
        InputStream is = getClass().getResourceAsStream("/test-image.JPG");
        if (is == null) {
            throw new RuntimeException("File test-image.JPG không tìm thấy trong src/test/resources!");
        }

        MockMultipartFile file = new MockMultipartFile(
                "files",
                "test-image.JPG",
                MediaType.IMAGE_JPEG_VALUE,
                is
        );

        String response = mockMvc.perform(multipart("/api/imageRoom/upload")
                        .file(file)
                        .param("roomId", String.valueOf(testRoomId))
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode node = objectMapper.readTree(response).get("result").get(0);
        int imgRoomId = node.get("id").asInt();
        return imgRoomId;
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Upload ảnh phòng thành công")
    void uploadRoomImage_Success() throws Exception {
        InputStream is = getClass().getResourceAsStream("/test-image.JPG");
        if (is == null) throw new RuntimeException("File test-image.JPG không tìm thấy!");

        MockMultipartFile file = new MockMultipartFile(
                "files",
                "test-image.JPG",
                MediaType.IMAGE_JPEG_VALUE,
                is
        );

        mockMvc.perform(multipart("/api/imageRoom/upload")
                        .file(file)
                        .param("roomId", String.valueOf(testRoomId))
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Tạo ảnh khách sạn thành công"))
                .andExpect(jsonPath("$.result[0].imgUrl").exists());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Xóa ảnh phòng thành công")
    void deleteRoomImage_Success() throws Exception {
        int uploadedImageId = uploadTestImage();

        mockMvc.perform(delete("/api/imageRoom/delete/{idImg}", uploadedImageId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Xoa anh thanh cong"))
                .andExpect(jsonPath("$.result").value("Xoa anh thanh cong"));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy ảnh đầu tiên của phòng thành công")
    void getFirstRoomImage_Success() throws Exception {
        int uploadedImageId = uploadTestImage();

        mockMvc.perform(get("/api/imageRoom/room/{roomId}/first", testRoomId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Lấy ảnh đầu tiên của phòng thành công"))
                .andExpect(jsonPath("$.result.id").value(uploadedImageId));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy danh sách ảnh phòng theo roomId thành công")
    void getRoomImagesByRoomId_Success() throws Exception {
        int uploadedImageId = uploadTestImage();

        mockMvc.perform(get("/api/imageRoom/room/{roomId}", testRoomId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Lay anh theo id phong thanh cong"))
                .andExpect(jsonPath("$.result[0].id").value(uploadedImageId));
    }
}
