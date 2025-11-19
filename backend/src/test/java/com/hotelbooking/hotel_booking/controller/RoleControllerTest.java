package com.hotelbooking.hotel_booking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.dto.request.RoleRequest;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
/// chua cap quyen duoc
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class RoleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String accessToken;
    private Long userId;
    private List<String> roles;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

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

        JsonNode resultNode = objectMapper.readTree(loginResponse).get("result");
        accessToken = resultNode.get("accessToken").asText();
        userId = resultNode.get("userId").asLong();

        JsonNode rolesNode = resultNode.get("roles");
        roles = new ArrayList<>();
        if (rolesNode != null && rolesNode.isArray()) {
            rolesNode.forEach(r -> roles.add(r.asText()));
        }
        System.out.println("Roles from login: " + roles);
    }

    @Test
    @DisplayName("Tạo role thành công")
    void createRole_Success() throws Exception {
        RoleRequest request = new RoleRequest();
        request.setName("ADMIN");
        request.setDescription("Admin role");

        mockMvc.perform(post("/api/role")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"))
                .andExpect(jsonPath("$.result.name").value("ADMIN"))
                .andExpect(jsonPath("$.result.description").value("Admin role"));
    }

    @Test
    @DisplayName("Lấy danh sách role phân trang")
    void getAllRole_Success() throws Exception {
        mockMvc.perform(get("/api/role?page=0&size=5")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"))
                .andExpect(jsonPath("$.result.content").exists());
    }

//    @Test
//    @DisplayName("Cập nhật role thành công")
//    void updateRole_Success() throws Exception {
//        RoleRequest createRequest = new RoleRequest();
//        createRequest.setName("USER");
//        createRequest.setDescription("User role");
//
//        String createResponse = mockMvc.perform(post("/api/role")
//                        .header("Authorization", "Bearer " + accessToken)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(createRequest)))
//                .andReturn()
//                .getResponse()
//                .getContentAsString();
//
//        Long roleId = objectMapper.readTree(createResponse).get("result").get("roleId").asLong();
//
//        RoleRequest updateRequest = new RoleRequest();
//        updateRequest.setName("USER_UPDATED");
//        updateRequest.setDescription("Updated description");
//
//        mockMvc.perform(put("/api/role/" + roleId)
//                        .header("Authorization", "Bearer " + accessToken)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(updateRequest)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.message").value("Success"))
//                .andExpect(jsonPath("$.result.name").value("USER_UPDATED"))
//                .andExpect(jsonPath("$.result.description").value("Updated description"));
//    }

//    @Test
//    @DisplayName("Xóa role thành công")
//    void deleteRole_Success() throws Exception {
//        RoleRequest request = new RoleRequest();
//        request.setName("TEMP_ROLE");
//        request.setDescription("Temporary role");
//
//        String createResponse = mockMvc.perform(post("/api/role")
//                        .header("Authorization", "Bearer " + accessToken)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andReturn()
//                .getResponse()
//                .getContentAsString();
//
//        Long roleId = objectMapper.readTree(createResponse).get("result").get("roleId").asLong();
//
//        mockMvc.perform(delete("/api/role/" + roleId)
//                        .header("Authorization", "Bearer " + accessToken))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.message").value("Success"));
//    }
}
