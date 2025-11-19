package com.hotelbooking.hotel_booking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.entity.ImgHotel;
import com.hotelbooking.hotel_booking.repository.ImgHotelRepository;
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
public class ImgHotelControllerTest {

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

        private int uploadTestImage() throws Exception {
            InputStream is = getClass().getResourceAsStream("/test-image.JPG");
            if (is == null) {
                throw new RuntimeException("File test-image.jpg không tìm thấy trong src/test/resources!");
            }

            MockMultipartFile file = new MockMultipartFile(
                    "files",
                    "test-image.JPG",
                    MediaType.IMAGE_JPEG_VALUE,
                    is
            );

            String response = mockMvc.perform(multipart("/api/images/upload")
                            .file(file)
                            .param("hotelId", String.valueOf(testHotelId))
                            .header("Authorization", "Bearer " + accessToken))
                    .andExpect(status().isOk())
                    .andReturn()
                    .getResponse()
                    .getContentAsString();

            JsonNode node = objectMapper.readTree(response).get("result").get(0);
            return node.get("imgHotelId").asInt();
        }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Upload ảnh khách sạn thành công")
    void uploadImages_Success() throws Exception {
        InputStream is = getClass().getResourceAsStream("/test-image.JPG");
        if (is == null) {
            throw new RuntimeException("File test-image.jpg không tìm thấy trong src/test/resources!");
        }

        MockMultipartFile file = new MockMultipartFile(
                "files",
                "test-image.JPG",
                MediaType.IMAGE_JPEG_VALUE,
                is
        );

        mockMvc.perform(multipart("/api/images/upload")
                        .file(file)
                        .param("hotelId", String.valueOf(testHotelId))
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Tạo ảnh khách sạn thành công"))
                .andExpect(jsonPath("$.result[0].imgUrl").exists());
    }

    @Autowired
    private ImgHotelRepository imgHotelRepository;

    @Test
    @Rollback
    @Transactional
    @DisplayName("Xóa ảnh khách sạn thành công")
    void deleteImage_Success() throws Exception {
        InputStream is = getClass().getResourceAsStream("/test-image.JPG");
        if (is == null) {
            throw new RuntimeException("File test-image.jpg không tìm thấy trong src/test/resources!");
        }

        MockMultipartFile file = new MockMultipartFile(
                "files",
                "test-image.JPG",
                MediaType.IMAGE_JPEG_VALUE,
                is
        );

        String response = mockMvc.perform(multipart("/api/images/upload")
                        .file(file)
                        .param("hotelId", String.valueOf(testHotelId))
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        int uploadedImageId=0;
        List<ImgHotel> images = imgHotelRepository.findImgHotelByHotel_HotelId(testHotelId);
        if (!images.isEmpty()) {
            uploadedImageId = images.get(0).getImgHotelId();
        }

        mockMvc.perform(delete("/api/images/delete/{imageId}", uploadedImageId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Xóa ảnh khách sạn thành công"))
                .andExpect(jsonPath("$.result").value("Đã xóa ảnh có ID: " + uploadedImageId));
    }


    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy ảnh theo hotelId thành công")
    void getImgHotelBy_HotelId_Success() throws Exception {
        InputStream is = getClass().getResourceAsStream("/test-image.JPG");
        if (is == null) {
            throw new RuntimeException("File test-image.jpg không tìm thấy trong src/test/resources!");
        }

        MockMultipartFile file = new MockMultipartFile(
                "files",
                "test-image.JPG",
                MediaType.IMAGE_JPEG_VALUE,
                is
        );

        String response = mockMvc.perform(multipart("/api/images/upload")
                        .file(file)
                        .param("hotelId", String.valueOf(testHotelId))
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        int uploadedImageId=0;
        List<ImgHotel> images = imgHotelRepository.findImgHotelByHotel_HotelId(testHotelId);
        if (!images.isEmpty()) {
            uploadedImageId = images.get(0).getImgHotelId();
        }

        mockMvc.perform(get("/api/images/hotel/{hotelId}", testHotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Lấy danh sách ảnh khách sạn thành công"))
                .andExpect(jsonPath("$.result[0].imgHotelId").value(uploadedImageId));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy ảnh theo ID thành công")
    void getImageById_Success() throws Exception {
        InputStream is = getClass().getResourceAsStream("/test-image.JPG");
        if (is == null) {
            throw new RuntimeException("File test-image.jpg không tìm thấy trong src/test/resources!");
        }

        MockMultipartFile file = new MockMultipartFile(
                "files",
                "test-image.JPG",
                MediaType.IMAGE_JPEG_VALUE,
                is
        );

        String response = mockMvc.perform(multipart("/api/images/upload")
                        .file(file)
                        .param("hotelId", String.valueOf(testHotelId))
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        int uploadedImageId=0;
        List<ImgHotel> images = imgHotelRepository.findImgHotelByHotel_HotelId(testHotelId);
        if (!images.isEmpty()) {
            uploadedImageId = images.get(0).getImgHotelId();
        }

        mockMvc.perform(get("/api/images/{id}", uploadedImageId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.imgHotelId").value(uploadedImageId));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy tất cả ảnh khách sạn thành công")
    void getAllImages_Success() throws Exception {
        uploadTestImage();

        mockMvc.perform(get("/api/images/all")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1))
                .andExpect(jsonPath("$.message").value("Lấy tất cả ảnh thành công"))
                .andExpect(jsonPath("$.result").isArray());
    }
}
