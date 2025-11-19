package com.hotelbooking.hotel_booking.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.dto.request.UpdatePasswordRequest;
import com.hotelbooking.hotel_booking.dto.request.UserRegisterRequest;
import com.hotelbooking.hotel_booking.dto.request.UserUpdateRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = true)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String adminToken;

    @BeforeEach
    void setUp() throws Exception {
        // Login lấy token admin
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

        adminToken = objectMapper.readTree(loginResponse)
                .get("result")
                .get("accessToken")
                .asText();
    }

    @Test
    @DisplayName("Đăng ký user thành công")
    void registerUser_Success() throws Exception {
        UserRegisterRequest request = new UserRegisterRequest();
        request.setEmail("testuser@gmail.com");
        request.setPassword("123456789");
        request.setPassword2("123456789");
        request.setFirstName("Test");
        request.setLastName("User");

        mockMvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"))
                .andExpect(jsonPath("$.result.email").value("testuser@gmail.com"));
    }

    @Test
    @DisplayName("Lấy tất cả user với ADMIN token")
    void getAllUser_Success() throws Exception {
        mockMvc.perform(get("/api/users")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"))
                .andExpect(jsonPath("$.result").isArray());
    }

    @Test
    @DisplayName("Cập nhật thông tin user")
    void updateUser_Success() throws Exception {
        UserUpdateRequest request = new UserUpdateRequest();
        request.setFirstName("Updated");
        request.setLastName("Name");

        mockMvc.perform(put("/api/users/1")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"))
                .andExpect(jsonPath("$.result.firstName").value("Updated"));
    }

    @Test
    @WithMockUser(username = "admin@gmail.com")
    @DisplayName("Cập nhật mật khẩu user")
    void updatePassword_Success() throws Exception {
        UpdatePasswordRequest request = new UpdatePasswordRequest();
        request.setPassword("123456");
        request.setPasswordnew1("987654321");
        request.setPasswordnew2("987654321");

        mockMvc.perform(put("/api/users/pwd/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.message").value("Success"))
                .andExpect(jsonPath("$.result.email").value("admin@gmail.com"));
    }

    @Test
    @DisplayName("Xóa user")
    void deleteUser_Success() throws Exception {
        mockMvc.perform(delete("/api/users/1")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"));
    }

    @Test
    @WithMockUser(username = "admin@gmail.com")
    @DisplayName("Lấy thông tin user với PostAuthorize")
    void getMyInfo_WithPostAuthorize() throws Exception {
        mockMvc.perform(get("/api/users/myInfo")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.email").value("admin@gmail.com"));
    }
}
