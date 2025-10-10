package com.hotelbooking.hotel_booking.controller;


import com.hotelbooking.hotel_booking.dto.request.UserRegisterRequest;
import com.hotelbooking.hotel_booking.dto.request.UserUpdateRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.UserResponse;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
import com.hotelbooking.hotel_booking.service.UserSevice;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Slf4j
public class UserController {
    @Autowired
    private UserSevice userService;
    @PostMapping("/register")
    ResponseEntity<ApiResponse<UserResponse>> createUser(@RequestBody @Valid UserRegisterRequest request) {
        UserResponse userResponse = userService.registerUser(request);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userResponse)
                .build());
    }
    @GetMapping
    ResponseEntity<ApiResponse<List<User>>> getAllUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Email :{}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));
        List<User> userList = userService.getAllUser();
        return ResponseEntity.ok(ApiResponse.<List<User>>builder()
                .message("Success")
                .result(userList)
                .build());
    }

    @GetMapping("/{userId}")
    ResponseEntity<ApiResponse<UserResponse>> getUser(@PathVariable int userId) {
        UserResponse userResponse = userService.getUser(userId);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userResponse)
                .build());
    }
    @GetMapping("/myInfo")
    ResponseEntity<ApiResponse<UserResponse>> getMyInfo(){
        UserResponse userResponse = userService.getMyInfo();
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userResponse)
                .build());
    }

    @PutMapping("/{userId}")
    ResponseEntity<ApiResponse<UserResponse>> updateUser(@RequestBody UserUpdateRequest request, @PathVariable int userId) {
        UserResponse userResponse = userService.updateUser(request, userId);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userResponse)
                .build());
    }

    @PutMapping("/delete/{userId}")
    ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable int userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
<<<<<<< HEAD
                        .message("Success")
=======
                .message("Success")
>>>>>>> origin/thanh
                .build());
    }
    @GetMapping("/search")
    ResponseEntity<ApiResponse<List<User>>> searchUser(@RequestParam String key){
        List<User> userList = userService.searchUser(key);
        return ResponseEntity.ok(
                ApiResponse.<List<User>>builder()
                        .message("Success")
                        .result(userList)
                        .build());
    }

}
