package com.hotelbooking.hotel_booking.UserTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotelbooking.hotel_booking.dto.request.UserRegisterRequest;
import com.hotelbooking.hotel_booking.dto.response.UserResponse;
import com.hotelbooking.hotel_booking.service.UserSevice;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.assertj.MockMvcTester;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Mock
    private UserSevice userSevice;
    private UserRegisterRequest request;
    private UserResponse response;
    @BeforeEach
    void initData(){
        request = UserRegisterRequest.builder()
                .email("hao@gmail.com")
                .firstName("Luka")
                .lastName("Ka")
                .password("12345678a")
                .password2("12345678a")
                .build();
        response = UserResponse.builder()
                .id(123)
                .email("hao@gmail.com")
                .firstName("Luka")
                .lastName("Ka")
                .build();
    }

    @Test
    void createUser_validRequest_success() throws Exception {
        //GIVEN
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(request);

        Mockito.when(userSevice.registerUser(ArgumentMatchers.any())).thenReturn(response);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("message").value("Success")
                )          ;


    }
}
