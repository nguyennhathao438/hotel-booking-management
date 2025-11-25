package com.hotelbooking.hotel_booking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.dto.request.PermissionRequest;
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
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class PermissionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String accessToken;
    private Long userId;
    private List<String> roles;

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

        accessToken = resultNode.get("accessToken").asText();
        userId = resultNode.get("userId").asLong();

        roles = new ArrayList<>();
        JsonNode rolesNode = resultNode.get("roles");
        if (rolesNode != null && rolesNode.isArray()) {
            rolesNode.forEach(r -> roles.add(r.asText()));
        }
    }

    @Test
    @DisplayName("Tạo permission thành công")
    void createPermission_Success() throws Exception {
        PermissionRequest request = new PermissionRequest();
        request.setName("ADD_USER");
        request.setDescription("Add user permission");

        mockMvc.perform(post("/api/permission")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"))
                .andExpect(jsonPath("$.result.name").value("ADD_USER"))
                .andExpect(jsonPath("$.result.description").value("Add user permission"));
    }

    @Test
    @DisplayName("Lấy danh sách permission thành công")
    void getAllPermission_Success() throws Exception {
        mockMvc.perform(get("/api/permission")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success"));
    }
}
