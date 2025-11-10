package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.UserRegisterRequest;
import com.hotelbooking.hotel_booking.dto.response.UserResponse;
import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class UserServiceTest {
    @Autowired
    private UserSevice userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder pwdEncoder;

    @BeforeEach
    void setup() {
        if (!roleRepository.existsById("USER")) {
            Role role = Role.builder()
                    .name("USER")
                    .description("Người dùng")
                    .build();
            roleRepository.save(role);
        }
    }

    @Test
    @DisplayName("Đăng ký thành công khi mật khẩu khớp và email chưa tồn tại")
    void registerUser_Success() {
        // Given
        UserRegisterRequest req = new UserRegisterRequest();
        req.setEmail("test@example.com");
        req.setPassword("123456");
        req.setPassword2("123456");
        req.setFirstName("Hao");
        req.setLastName("Nguyen");

        // When
        UserResponse response = userService.registerUser(req);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getEmail()).isEqualTo("test@example.com");

        Optional<User> savedUser = userRepository.findByEmail("test@example.com");
        assertThat(savedUser).isPresent();

        User user = savedUser.get();
        assertThat(pwdEncoder.matches("123456", user.getPassword())).isTrue();
    }

    @Test
    @DisplayName(" Đăng ký thất bại khi mật khẩu không khớp")
    void registerUser_InvalidPassword() {
        // Given
        UserRegisterRequest req = new UserRegisterRequest();
        req.setEmail("fail@example.com");
        req.setPassword("123456");
        req.setPassword2("654321"); // khác nhau
        req.setFirstName("A");
        req.setLastName("B");

        // When + Then
        AppException ex = assertThrows(AppException.class, () -> userService.registerUser(req));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.INVALID_PASSWORD);
    }

    @Test
    @DisplayName("Đăng ký thất bại khi email đã tồn tại")
    void registerUser_EmailExisted() {
        // Given: tạo user có sẵn
        User existing = User.builder()
                .email("exists@example.com")
                .password(pwdEncoder.encode("123456"))
                .roles(Set.of())
                .build();
        userRepository.save(existing);

        UserRegisterRequest req = new UserRegisterRequest();
        req.setEmail("exists@example.com"); // trùng
        req.setPassword("123456");
        req.setPassword2("123456");
        req.setFirstName("A");
        req.setLastName("B");

        // When + Then
        AppException ex = assertThrows(AppException.class, () -> userService.registerUser(req));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.EMAIL_EXISTED);
    }
}
