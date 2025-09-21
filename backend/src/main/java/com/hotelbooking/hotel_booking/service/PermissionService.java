package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.PermissionRequest;
import com.hotelbooking.hotel_booking.dto.response.PermissionResponse;
import com.hotelbooking.hotel_booking.entity.Permission;
import com.hotelbooking.hotel_booking.repository.PermissionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE ,makeFinal = true)
public class PermissionService {
    PermissionRepository permissionRepository;
    public PermissionResponse createPermission(PermissionRequest request){
        Permission permission = Permission.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

            permissionRepository.save(permission);

        return mapToPermissionResponse(permission);
    }
    PermissionResponse mapToPermissionResponse(Permission permission){
        return PermissionResponse.builder()
                .name(permission.getName())
                .description(permission.getDescription())
                .build();
    }
    public List<PermissionResponse> getAll(){
        var permissions = permissionRepository.findAll();
        return permissions.stream().map(permission -> PermissionResponse.builder()
                .name(permission.getName())
                .description(permission.getDescription())
                .build()
        ).toList();
    }
}
