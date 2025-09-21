package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.PermissionRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.PermissionResponse;
import com.hotelbooking.hotel_booking.service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permission")
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class PermissionController {
    PermissionService permissionService;
    @PostMapping
    ResponseEntity<ApiResponse<PermissionResponse>> createPermission(@RequestBody PermissionRequest request){
        return ResponseEntity.ok(ApiResponse.<PermissionResponse>builder()
                        .message("Success")
                        .result(permissionService.createPermission(request))
                .build());
    }
    @GetMapping
    ResponseEntity<ApiResponse<List<PermissionResponse>>> getAllPermission(){
        return ResponseEntity.ok(ApiResponse.<List<PermissionResponse>>builder()
                .message("Success")
                .result(permissionService.getAll())
                .build());
    }
}
