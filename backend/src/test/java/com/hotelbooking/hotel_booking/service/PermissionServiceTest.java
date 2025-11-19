package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.PermissionRequest;
import com.hotelbooking.hotel_booking.dto.response.PermissionResponse;
import com.hotelbooking.hotel_booking.entity.Permission;
import com.hotelbooking.hotel_booking.repository.PermissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class PermissionServiceTest {

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private PermissionRepository permissionRepository;

    @BeforeEach
    void setup() {

    }

    @Test
    @DisplayName("Tạo permission thành công")
    void createPermission_Success() {
        PermissionRequest request = new PermissionRequest();
        request.setName("TEST");
        request.setDescription("Quyền xem danh sách người dùng");

        PermissionResponse response = permissionService.createPermission(request);

        assertThat(response).isNotNull();
        assertThat(response.getName()).isEqualTo("TEST");
        assertThat(response.getDescription()).isEqualTo("Quyền xem danh sách người dùng");

    }

    @Test
    @DisplayName("mapToPermissionResponse trả về đúng dữ liệu")
    void mapToPermissionResponse_Success() {
        Permission permission = Permission.builder()
                .name("WRITE_USERS")
                .description("Quyền tạo/sửa người dùng")
                .build();

        PermissionResponse response = permissionService.mapToPermissionResponse(permission);

        assertThat(response.getName()).isEqualTo("WRITE_USERS");
        assertThat(response.getDescription()).isEqualTo("Quyền tạo/sửa người dùng");
    }

    @Test
    @DisplayName("Lấy tất cả permission thành công")
    void getAll_Success() {
        PermissionRequest request = new PermissionRequest();
        request.setName("TEST");
        request.setDescription("Quyền xem danh sách người dùng");

       permissionService.createPermission(request);


        List<PermissionResponse> responses = permissionService.getAll();
        System.out.println("so hasSize" + responses.size());

        assertThat(responses).hasSize(11);
    }
}
