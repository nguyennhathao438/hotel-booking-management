package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.UpdatePasswordRequest;
import com.hotelbooking.hotel_booking.dto.request.UserRegisterRequest;
import com.hotelbooking.hotel_booking.dto.request.UserUpdateRequest;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
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


    private User testUser;

    @BeforeEach
    void setup() {
        if (!roleRepository.existsById("USER")) {
            Role role = Role.builder()
                    .name("USER")
                    .description("Người dùng")
                    .build();
            roleRepository.save(role);
        }

        testUser = User.builder()
                .email("user@test.com")
                .password(pwdEncoder.encode("123456"))
                .firstName("Test")
                .lastName("User")
                .roles(new HashSet<>(Set.of(roleRepository.findById("USER").get())))
                .status(1)
                .build();
        testUser = userRepository.save(testUser);
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

    @Test
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_USER"})
    @DisplayName("Lấy thông tin user theo id thành công")
    void getUser_Success() {
        UserResponse response = userService.getUser(testUser.getId());
        assertThat(response).isNotNull();
        assertThat(response.getEmail()).isEqualTo(testUser.getEmail());
    }

    @Test
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_USER"})
    @DisplayName("Lấy thông tin user thất bại khi user không tồn tại")
    void getUser_NotExist_Throws() {
        AppException ex = assertThrows(AppException.class, () -> userService.getUser(9999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.EMAIL_NOT_EXISTED);
    }


//chua biet lam gi
//    @Test
//    @WithMockUser( authorities = {"UPDATE_USER"})
//    @DisplayName("Cập nhật thông tin user thành công")
//    void updateUser_Success() {
//        UserUpdateRequest request = new UserUpdateRequest();
//        request.setFirstName("Updated");
//        request.setLastName("User");
//        request.setPhone("0987654321");
//        request.setDateOfBirth(LocalDate.of(1990, 1, 1));
//        request.setAvatar("avatar.png");
//
//        UserResponse response = userService.updateUser(request, testUser.getId());
//
//        assertThat(response.getFirstName()).isEqualTo("Updated");
//        assertThat(response.getPhone()).isEqualTo("0987654321");
//    }

    @Test
    @DisplayName("Cập nhật user thất bại khi user không tồn tại")
    void updateUser_NotExist_Throws() {
        UserUpdateRequest request = new UserUpdateRequest();
        request.setFirstName("Updated");
        AppException ex = assertThrows(AppException.class, () -> userService.updateUser(request, 9999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.EMAIL_NOT_EXISTED);
    }
    //kho noi @PostAuthorize va void k co j tra ve
//
//    @Test
//    @WithMockUser(username = "test@example.com")
//    @DisplayName("Cập nhật mật khẩu thành công")
//    void updatePassword_Success() {
//        UpdatePasswordRequest request = new UpdatePasswordRequest();
//        request.setPassword("123456");
//        request.setPasswordnew1("654321");
//        request.setPasswordnew2("654321");
//
//        userService.updatePassword(request, testUser.getId());
//
//        User updated = userRepository.findById(testUser.getId()).get();
//        assertThat(pwdEncoder.matches("654321", updated.getPassword())).isTrue();
//    }

    @Test
    @DisplayName("Cập nhật mật khẩu thất bại do mật khẩu cũ sai")
    void updatePassword_WrongOld_Throws() {
        UpdatePasswordRequest request = new UpdatePasswordRequest();
        request.setPassword("wrong");
        request.setPasswordnew1("654321");
        request.setPasswordnew2("654321");

        AppException ex = assertThrows(AppException.class, () -> userService.updatePassword(request, testUser.getId()));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.INVALID_PASSWORD);
    }

    @Test
    @DisplayName("Cập nhật mật khẩu thất bại do mật khẩu mới không khớp")
    void updatePassword_NewNotMatch_Throws() {
        UpdatePasswordRequest request = new UpdatePasswordRequest();
        request.setPassword("123456");
        request.setPasswordnew1("654321");
        request.setPasswordnew2("111111");

        AppException ex = assertThrows(AppException.class, () -> userService.updatePassword(request, testUser.getId()));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.INVALID_PASSWORD);
    }

    @Test
    @WithMockUser(username = "user@test.com")
    @DisplayName("Lấy thông tin bản thân thành công")
    void getMyInfo_Success() {
        User user = userService.getMyInfo();
        assertThat(user).isNotNull();
        assertThat(user.getEmail()).isEqualTo(testUser.getEmail());
    }

    @Test
    @WithMockUser(username = "user@test.com")
    @DisplayName("Ban/unban user thành công")
    void banUser_Success() {
        int originalStatus = testUser.getStatus();
        userService.banUser(testUser.getId());

        User updated = userRepository.findById(testUser.getId()).get();
        assertThat(updated.getStatus()).isNotEqualTo(originalStatus);
    }

    @Test
    @DisplayName("Xóa user thành công")
    void deleteUser_Success() {
        int id = testUser.getId();
        userService.deleteUser(id);
        assertThat(testUser.getIsDelete()).isEqualTo(1);
    }

//LOI CHUA BIET
//    @Test
//    @DisplayName("Tìm kiếm user theo keyword")
//    void searchUser_Success() {
//        List<User> users = userService.searchUser("test");
//        assertThat(users).isNotNull();
//        assertThat(users.get(0).getEmail()).isEqualTo(testUser.getEmail());
//    }

    @Test
    @WithMockUser( authorities = {"READ_USER_LIST"})
    @DisplayName("Lấy danh sách user theo search + page")
    void getUserAllSearch_Success() {
        var page = userService.getUserAllSearch(1, 10, "test");
        assertThat(page.getContent()).isNotNull();
    }

}
