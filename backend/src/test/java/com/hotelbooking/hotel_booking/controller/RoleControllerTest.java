package com.hotelbooking.hotel_booking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.dto.request.RoleRequest;
import com.hotelbooking.hotel_booking.dto.response.RoleResponse;
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
import java.util.Collections;
import java.util.ArrayList;
import java.util.List;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
        request.setPermission(Collections.emptySet());

        mockMvc.perform(post("/api/role")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk());
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
    @Test
    @DisplayName("Tạo role rồi xóa thành công")
    void createThenDeleteRole_Success() throws Exception {
        RoleRequest createRequest = new RoleRequest();
        createRequest.setName("TEMP_ROLE");
        createRequest.setDescription("Temporary role");
        createRequest.setPermission(Collections.emptySet());

        String createResponse = mockMvc.perform(post("/api/role")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"))
                .andExpect(jsonPath("$.result.name").value("TEMP_ROLE"))
                .andExpect(jsonPath("$.result.description").value("Temporary role"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        String roleName = objectMapper.readTree(createResponse).get("result").get("name").asText();

        mockMvc.perform(delete("/api/role/{roleId}", roleName)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"));

        assertFalse(roleRepository.findById(roleName).isPresent());
    }

    @Test
    @DisplayName("Cập nhật role thành công")
    void updateRole_Success() throws Exception {
        RoleRequest createRequest = new RoleRequest();
        createRequest.setName("TEMP_ROLE");
        createRequest.setDescription("Temporary role");
        createRequest.setPermission(Collections.emptySet());

        mockMvc.perform(post("/api/role")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"));

        RoleRequest updateRequest = new RoleRequest();
        updateRequest.setName("TEMP_ROLE");
        updateRequest.setDescription("Updated description");
        updateRequest.setPermission(Collections.emptySet());

        mockMvc.perform(put("/api/role/{roleId}", "TEMP_ROLE")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"))
                .andExpect(jsonPath("$.result.name").value("TEMP_ROLE"))
                .andExpect(jsonPath("$.result.description").value("Updated description"));

        assert(roleRepository.findById("TEMP_ROLE").isPresent());
    }



}
