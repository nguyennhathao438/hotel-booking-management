package com.hotelbooking.hotel_booking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.hotelbooking.hotel_booking.exception.ErrorCode.HOTEL_NOT_EXISTED;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class HotelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String accessToken;

    private List<String> roles;

    private Long userId;

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

        JsonNode rootNode = objectMapper.readTree(loginResponse);
        JsonNode resultNode = rootNode.get("result");

        if (resultNode == null) {
            throw new RuntimeException("Login response không có result: " + loginResponse);
        }

        if (resultNode.has("accessToken")) {
            accessToken = resultNode.get("accessToken").asText();
        } else {
            throw new RuntimeException("Login response không có accessToken: " + loginResponse);
        }

        if (resultNode.has("userId")) {
            userId = resultNode.get("userId").asLong();
        } else {
            throw new RuntimeException("Login response không có userId: " + loginResponse);
        }

        System.out.println("User ID: " + userId);

        roles = new ArrayList<>();
        JsonNode rolesNode = resultNode.get("roles");
        if (rolesNode != null && rolesNode.isArray()) {
            rolesNode.forEach(r -> roles.add(r.asText()));
        }
        System.out.println("Quyền của user: " + (roles.isEmpty() ? "Không có quyền nào" : roles));
    }

    @Test
    @DisplayName("Tạo khách sạn thành công")
    void createHotel_Success() throws Exception {
        String hotelJson = """
        {
            "hotelName": "Hotel Test",
            "hotelAddress": "Hanoi",
            "hotelPhone": "0123456789",
            "hotelRating": 4.5,
            "hotelTotalRoom": 50,
            "hotelCost": 200,
            "hotelDescription": "Khách sạn đẹp"
        }
        """;

        mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Tạo khách sạn thành công"))
                .andExpect(jsonPath("$.result.hotelName").value("Hotel Test"));
    }

    @Test
    @DisplayName("Lấy tất cả khách sạn")
    void getAllHotels_Success() throws Exception {
        mockMvc.perform(get("/api/hotels/all")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lấy danh sách khách sạn thành công"));
    }

    @Test
    @DisplayName("Tìm khách sạn theo tỉnh thành")
    void searchHotelByProvince_Success() throws Exception {
        mockMvc.perform(get("/api/hotels/search/Hanoi")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Tìm khách sạn theo tỉnh thành công"));
    }

    @Test
    @DisplayName("Lấy khách sạn theo ID")
    void getHotelById_Success() throws Exception {
        String hotelJson = """
        {
            "hotelName": "Hotel Test",
            "hotelAddress": "Hanoi",
            "hotelPhone": "0123456789",
            "hotelRating": 4.5,
            "hotelTotalRoom": 50,
            "hotelCost": 200,
            "hotelDescription": "Khách sạn đẹp"
        }
        """;
        String createResponse = mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(createResponse);
        Long hotelId = node.get("result").get("hotelId").asLong();

        mockMvc.perform(get("/api/hotels/" + hotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lấy khách sạn theo ID thành công"));
    }

    @Test
    @DisplayName("Duyệt khách sạn")
    void approveHotel_Success() throws Exception {

        String hotelJson = """
        {
            "hotelName": "Hotel Test",
            "hotelAddress": "Hanoi",
            "hotelPhone": "0123456789",
            "hotelRating": 4.5,
            "hotelTotalRoom": 50,
            "hotelCost": 200,
            "hotelDescription": "Khách sạn đẹp"
        }
        """;
        String createResponse = mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(createResponse);
        Long hotelId = node.get("result").get("hotelId").asLong();

        mockMvc.perform(put("/api/hotels/approve/" + hotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Duyệt khách sạn thành công"));
    }

    @Test
    @DisplayName("Cập nhật khách sạn")
    void updateHotel_Success() throws Exception {

        String hotelJson = """
        {
            "hotelName": "Hotel Test",
            "hotelAddress": "Hanoi",
            "hotelPhone": "0123456789",
            "hotelRating": 4.5,
            "hotelTotalRoom": 50,
            "hotelCost": 200,
            "hotelDescription": "Khách sạn đẹp"
        }
        """;
        String createResponse = mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(createResponse);
        Long hotelId = node.get("result").get("hotelId").asLong();

        String updateJson = """
        {
            "hotelName": "Hotel Updated",
            "hotelAddress": "Hanoi",
            "hotelPhone": "0987654321",
            "hotelRating": 4.0,
            "hotelTotalRoom": 60,
            "hotelCost": 250,
            "hotelDescription": "Updated description"
        }
        """;

        mockMvc.perform(put("/api/hotels/update/" + hotelId)
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Cập nhật khách sạn thành công"))
                .andExpect(jsonPath("$.result.hotelName").value("Hotel Updated"));
    }

    @Test
    @DisplayName("Lấy khách sạn theo userId")
    void getHotelsByUserId_Success() throws Exception {
        String hotelJson = """
        {
            "hotelName": "Hotel Test",
            "hotelAddress": "Hanoi",
            "hotelPhone": "0123456789",
            "hotelRating": 4.5,
            "hotelTotalRoom": 50,
            "hotelCost": 200,
            "hotelDescription": "Khách sạn đẹp"
        }
        """;
        mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/hotels/user/" + userId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Lấy danh sách khách sạn theo userId thành công"));
    }

    @Test
    @DisplayName("Xem thông tin khách sạn")
    void getHotelSee_Success() throws Exception {

        String hotelJson = """
        {
            "hotelName": "Hotel Test",
            "hotelAddress": "Hanoi",
            "hotelPhone": "0123456789",
            "hotelRating": 4.5,
            "hotelTotalRoom": 50,
            "hotelCost": 200,
            "hotelDescription": "Khách sạn đẹp"
        }
        """;
        String createResponse = mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(createResponse);
        Long hotelId = node.get("result").get("hotelId").asLong();

        mockMvc.perform(get("/api/hotels/see/" + hotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Thông tin khách sạn"));

    }

    @Test
    @DisplayName("Phân trang khách sạn")
    void getAllHotelsPaging_Success() throws Exception {

        mockMvc.perform(get("/api/hotels/all/get-page?pageNo=1&pageSize=5")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Danh sách Phân trang khách sạn"));
    }

    @Test
    @DisplayName("Tạo khách sạn khi đã có yêu cầu trước đó")
    void createHotel_AlreadyExists() throws Exception {
        String hotelJson1 = "{"
                + "\"hotelName\": \"Hotel Test 0\","
                + "\"hotelAddress\": \"Hanoi\","
                + "\"hotelPhone\": \"0123456789\","
                + "\"hotelRating\": 4.5,"
                + "\"hotelTotalRoom\": 50,"
                + "\"hotelCost\": 200,"
                + "\"hotelDescription\": \"Khách sạn đẹp\""
                + "}";

        mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Tạo khách sạn thành công"));


        String hotelJson2 = "{"
                + "\"hotelName\": \"Hotel Test 1\","
                + "\"hotelAddress\": \"Hanoi\","
                + "\"hotelPhone\": \"0123456789\","
                + "\"hotelRating\": 4.5,"
                + "\"hotelTotalRoom\": 50,"
                + "\"hotelCost\": 200,"
                + "\"hotelDescription\": \"Khách sạn đẹp\""
                + "}";

        mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson2))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value(1026))
                .andExpect(jsonPath("$.message").value("Bạn đã có yêu cầu tạo khách sạn rồi"));
    }

    @Test
    @DisplayName("Tạo khách sạn thất bại khi tên khách sạn đã tồn tại")
    void createHotel_Fail_NameExists() throws Exception {
        String hotelJson = """
    {
        "hotelName": "Hotel Duplicate",
        "hotelAddress": "Hanoi",
        "hotelPhone": "0123456789",
        "hotelRating": 4.5,
        "hotelTotalRoom": 50,
        "hotelCost": 200,
        "hotelDescription": "Khách sạn đẹp"
    }
    """;


        mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Tạo khách sạn thành công"));


        mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value(1007))
                .andExpect(jsonPath("$.message").value("Khách sạn đã tồn tại"));
    }

    @Test
    @DisplayName("Cập nhật khách sạn thất bại khi khách sạn không tồn tại")
    void updateHotel_NotExist() throws Exception {
        int invalidHotelId = 999999;
        String updateJson = """
    {
        "hotelName": "Hotel Updated",
        "hotelAddress": "Hanoi",
        "hotelPhone": "0987654321",
        "hotelRating": 4.0,
        "hotelTotalRoom": 60,
        "hotelCost": 250,
        "hotelDescription": "Updated description"
    }
    """;

        mockMvc.perform(put("/api/hotels/update/" + invalidHotelId)
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(HOTEL_NOT_EXISTED.getCode()))
                .andExpect(jsonPath("$.message").value(HOTEL_NOT_EXISTED.getMessage()));
    }

    @Test
    @DisplayName("Duyệt khách sạn thất bại khi khách sạn không tồn tại")
    void approveHotel_NotExist() throws Exception {
        int invalidHotelId = 999999;

        mockMvc.perform(put("/api/hotels/approve/" + invalidHotelId)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(HOTEL_NOT_EXISTED.getCode()))
                .andExpect(jsonPath("$.message").value(HOTEL_NOT_EXISTED.getMessage()));
    }




}
