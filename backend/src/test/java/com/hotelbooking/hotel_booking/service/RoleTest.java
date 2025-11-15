package com.hotelbooking.hotel_booking.service;


import com.hotelbooking.hotel_booking.dto.request.RoleRequest;
import com.hotelbooking.hotel_booking.dto.response.PermissionResponse;
import com.hotelbooking.hotel_booking.dto.response.RoleResponse;
import com.hotelbooking.hotel_booking.entity.Permission;
import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.PermissionRepository;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class RoleTest {

    @Autowired
    private RoleService roleService;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    private Role role;
    private Permission permission;
    private User user;

    @BeforeEach
    void setUp() {

        permission = new Permission();
        permission.setName("ADD_USER");
        permission.setDescription("Add user");
        permission = permissionRepository.save(permission);

        role = Role.builder()
                .name("ADMIN")
                .description("Default role")
                .build();
        role = roleRepository.save(role);

        user = User.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@test.com")
                .phone("0123456789")
                .roles(Set.of(role))
                .build();
        user = userRepository.save(user);


    }

    @Test
    @WithMockUser(authorities = "ADD_ROLE")
    @DisplayName("Tạo role thành công")
    void createRole_Success() {
        RoleRequest roleRequest = new RoleRequest();
        roleRequest.setDescription("test");
        roleRequest.setName("TEST_ROLE");
        roleRequest.setPermission(Set.of(permission.getName()));

        RoleResponse response = roleService.createRole(roleRequest);

        assertThat(response).isNotNull();
        assertThat(response.getName()).isEqualTo("TEST_ROLE");
        assertThat(response.getPermissions()
                .stream()
                .map(PermissionResponse::getName)
                .toList())
                .contains("ADD_USER");
        assertThat(response.getPermissions()).hasSize(1);

    }

    @Test
    @WithMockUser(authorities = "UPDATE_ROLE")
    @DisplayName("Cập nhật role thành công")
    void updateRole_Success() {
        Role role = Role.builder()
                .name("EMPLOYEE")
                .description("old")
                .permissions(Set.of(permission))
                .build();
        roleRepository.save(role);

        RoleRequest req = new RoleRequest();
        req.setDescription("updated desc");
        req.setPermission(Set.of(permission.getName()));

        RoleResponse updated = roleService.updateRole("EMPLOYEE", req);

        assertThat(updated.getDescription()).isEqualTo("updated desc");
        assertThat(updated.getPermissions()).hasSize(1);
    }

    @Test
    @WithMockUser(authorities = "UPDATE_ROLE")
    @DisplayName("Cập nhật role thất bại khi role không tồn tại")
    void updateRole_NotExist_Throws() {

        RoleRequest req = new RoleRequest();
        req.setDescription("test");
        req.setPermission(Set.of(permission.getName()));

        AppException ex = assertThrows(AppException.class,
                () -> roleService.updateRole("NOT_FOUND", req));

        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROLE_NOT_EXISTED);
    }

    @Test
    @DisplayName("Xoá role thất bại vì là role hệ thống")
    void deleteRole_SystemRole_Throws() {

        AppException ex = assertThrows(AppException.class,
                () -> roleService.deleteRole("ADMIN"));

        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROLE_NOT_DELETE);
    }

    @Test
    @DisplayName("Xoá role thành công")
    void deleteRole_Success() {
        Role role = Role.builder()
                .name("delete")
                .build();
        roleRepository.save(role);

        Optional<Role> found = roleRepository.findById("delete");
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("delete");

        roleService.deleteRole("delete");

        assertThat(roleRepository.findById("delete")).isEmpty();
    }

    @Test
    @DisplayName("Xoá role thất bại vì đang có user sử dụng role")
    void deleteRole_RoleIsUsed_Throws() {
        AppException ex = assertThrows(AppException.class,
                () -> roleService.deleteRole(role.getName()));

        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROLE_IS_USED);
    }

    @Test
    @WithMockUser(authorities = "ADD_ROLE")
    @DisplayName("Tạo role thất bại khi permission không tồn tại")
    void createRole_PermissionNotExist_Throws() {
        RoleRequest req = new RoleRequest();
        req.setName("NEW_ROLE");
        req.setDescription("desc");
        req.setPermission(Set.of("INVALID_PERMISSION"));

        AppException ex = assertThrows(AppException.class,
                () -> roleService.createRole(req));

        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.PERMISSION_NOT_EXISTED);
    }
////loi quyen truy cap
//    @Test
//    @WithMockUser(username = "john@test.com", roles = {"ADMIN"})
//    @DisplayName("Lấy tất cả role thành công")
//    void getAllRole_Success() {
//        RoleRequest roleRequest = new RoleRequest();
//        roleRequest.setDescription("test");
//        roleRequest.setName("TEST_ROLE");
//        roleRequest.setPermission(Set.of(permission.getName()));
//
//        RoleResponse response = roleService.createRole(roleRequest);
//
//        var page = roleService.getAllRole(Pageable.ofSize(10));
//
//        assertThat(page).isNotEmpty();
//        assertThat(page.getContent().get(0).getName()).isEqualTo("TEST_ROLE");
//        assertThat(page.getContent().get(0).getPermissions())
//                .extracting(PermissionResponse::getName)
//                .contains("ADD_USER");
//    }

    @Test
    @DisplayName("Xoá role thất bại khi role không tồn tại")
    void deleteRole_NotExist_Throws() {
        AppException ex = assertThrows(AppException.class,
                () -> roleService.deleteRole("NOT_EXIST"));

        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROLE_NOT_EXISTED);
    }



}
