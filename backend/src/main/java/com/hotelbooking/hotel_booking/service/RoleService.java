package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.RoleRequest;
import com.hotelbooking.hotel_booking.dto.response.PermissionResponse;
import com.hotelbooking.hotel_booking.dto.response.RoleResponse;
import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.PermissionRepository;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
        RoleRepository roleRepository;
        PermissionRepository permissionRepository;
        UserRepository userRepository;
        String ROLE_SYSTEM[] = {"ADMIN","CUSTOMER","USER","CHAT","HOTEL","INVOICE","INVOICE_(2)","ROLE","ROOM"};
        @PreAuthorize("hasAuthority('ADD_ROLE')")
        public RoleResponse createRole(RoleRequest request) {

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
        public Page<RoleResponse> getAllRole(Pageable pageable) {
               Page<Role> roles = roleRepository.findAll(pageable);
                return roles.map(
                                role -> RoleResponse.builder()
                                                .name(role.getName())
                                                .description(role.getDescription())
                                                .permissions(role.getPermissions().stream().map(
                                                                p -> PermissionResponse.builder()
                                                                                .name(p.getName())
                                                                                .description(p.getDescription())
                                                                                .build())
                                                                .collect(Collectors.toSet()))
                                                .build());
        }

        @PreAuthorize("hasAuthority('UPDATE_ROLE')")
        public RoleResponse updateRole(String roleId, RoleRequest request) {
                Role role = roleRepository.findById(roleId)
                                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));
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

        public void deleteRole(String roleId){
                for(String role: ROLE_SYSTEM){
                    if(roleId.equals(role)){
                        throw new AppException(ErrorCode.ROLE_NOT_DELETE);
                    }
                }
                Role role = roleRepository.findById(roleId).orElseThrow(()-> new AppException(ErrorCode.ROLE_NOT_EXISTED));
                if(userRepository.existsByRolesContains(role)){
                    throw new AppException(ErrorCode.ROLE_IS_USED);
                }
                roleRepository.delete(role);
        }
}
