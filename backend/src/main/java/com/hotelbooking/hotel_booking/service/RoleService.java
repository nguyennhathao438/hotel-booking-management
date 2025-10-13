package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.RoleRequest;
import com.hotelbooking.hotel_booking.dto.response.PermissionResponse;
import com.hotelbooking.hotel_booking.dto.response.RoleResponse;
import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.PermissionRepository;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE ,makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    @PreAuthorize("hasRole('ADMIN')")
    public RoleResponse createRole(RoleRequest request){

        var permissions = permissionRepository.findAllById(request.getPermission());
        Role role = Role.builder()
                .name(request.getName())
                .description(request.getDescription())
                .permissions(new HashSet<>(permissions))
                .build();

        roleRepository.save(role);
        Set<PermissionResponse> permissionResponse = permissions.stream().map(p -> PermissionResponse.builder()
                .name(p.getName())
                .description(p.getDescription())
                .build()).collect(Collectors.toSet());
        return RoleResponse.builder()
                .name(role.getName())
                .description(role.getDescription())
                .permissions(permissionResponse)
                .build();
    }
    @PreAuthorize("hasRole('ADMIN')")
    public List<RoleResponse> getAllRole() {
        var roles = roleRepository.findAll();
        return roles.stream().map(
                role -> RoleResponse.builder()
                        .name(role.getName())
                        .description(role.getDescription())
                        .permissions(role.getPermissions().stream().map(
                                p -> PermissionResponse.builder()
                                        .name(p.getName())
                                        .description(p.getDescription())
                                        .build()).collect(Collectors.toSet()))
                        .build()
        ).toList();
    }
    @PreAuthorize("hasRole('ADMIN')")
    public RoleResponse updateRole(String roleId,RoleRequest request){
        Role role = roleRepository.findById(roleId).orElseThrow(()-> new AppException(ErrorCode.ROLE_NOT_EXISTED));
        var permission = permissionRepository.findAllById(request.getPermission());
        role.setPermissions(new HashSet<>(permission));
        role.setDescription(request.getDescription());
        roleRepository.save(role);
        Set<PermissionResponse> permissionResponse = permission.stream().map(p -> PermissionResponse.builder()
                .name(p.getName())
                .description(p.getDescription())
                .build()).collect(Collectors.toSet());
        return RoleResponse.builder()
                .name(role.getName())
                .description(role.getDescription())
                .permissions(permissionResponse)
                .build();
    }
}
