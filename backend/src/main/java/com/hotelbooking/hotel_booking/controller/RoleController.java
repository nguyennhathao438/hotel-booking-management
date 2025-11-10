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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    ResponseEntity<ApiResponse<Page<RoleResponse>>> getAllRole(@RequestParam(defaultValue = "0")int page,
                                                               @RequestParam(defaultValue = "7")int size){
        Pageable pageable = PageRequest.of(page,size);
        return ResponseEntity.ok(ApiResponse.<Page<RoleResponse>>builder()
                .message("Success")
                .result(roleService.getAllRole(pageable))
                .build());
    }
    @PutMapping("/{roleId}")
    ResponseEntity<ApiResponse<RoleResponse>> updateRole(@RequestBody RoleRequest request,@PathVariable String roleId){
        return ResponseEntity.ok(ApiResponse.<RoleResponse>builder()
                .message("Success")
                .result(roleService.updateRole(roleId,request))
                .build());
    }
    @DeleteMapping("/{roleId}")
    ResponseEntity<ApiResponse<Void>> deleteRole(@PathVariable String roleId){
        roleService.deleteRole(roleId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Success")
                .build());
    }
}
