package com.hotelbooking.hotel_booking.service;


import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest(properties = {
        "jwt.signerKey=mySecretSignerKey",
        "jwt.refreshKey=mySecretRefreshKey"
})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;



    @InjectMocks
    private AuthenticationService authenticationService;

    private User testUser;

    @BeforeEach
    void setup() {
        testUser = User.builder()
                .id(1)
                .email("user@test.com")
                .password(new BCryptPasswordEncoder().encode("123456"))
                .roles(Set.of(Role.builder()
                        .name("USER")
                        .description("User role")
                        .build()))
                .build();


    }


    @Test
    void authenticate_invalidPassword() {
        when(userRepository.findByEmail("user@test.com")).thenReturn(Optional.of(testUser));

        var request = new com.hotelbooking.hotel_booking.dto.request.AuthenticationRequest();
        request.setEmail("user@test.com");
        request.setPassword("wrongpassword");

        AppException ex = assertThrows(AppException.class,
                () -> authenticationService.authenticate(request));

        assertThat(ex.getErrorCode()).isNotNull();
    }
}
