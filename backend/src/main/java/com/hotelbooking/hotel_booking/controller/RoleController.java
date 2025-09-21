package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.PermissionRequest;
import com.hotelbooking.hotel_booking.dto.request.RoleRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.PermissionResponse;
import com.hotelbooking.hotel_booking.dto.response.RoleResponse;
import com.hotelbooking.hotel_booking.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role")
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class RoleController {
    RoleService roleService;
    @PostMapping
    ResponseEntity<ApiResponse<RoleResponse>> createRole(@RequestBody RoleRequest request){
        return ResponseEntity.ok(ApiResponse.<RoleResponse>builder()
                .message("Success")
                .result(roleService.createRole(request))
                .build());
    }
    @GetMapping
    ResponseEntity<ApiResponse<List<RoleResponse>>> getAllRole(){
        return ResponseEntity.ok(ApiResponse.<List<RoleResponse>>builder()
                .message("Success")
                .result(roleService.getAllRole())
                .build());
    }
}
