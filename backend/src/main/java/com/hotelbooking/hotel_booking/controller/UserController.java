package com.hotelbooking.hotel_booking.controller;


import com.hotelbooking.hotel_booking.dto.request.MyInfoRequest;
import com.hotelbooking.hotel_booking.dto.request.UpdatePasswordRequest;
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
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    ResponseEntity<ApiResponse<User>> getMyInfo(){
        User userResponse = userService.getMyInfo();
        return ResponseEntity.ok(ApiResponse.<User>builder()
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
                        .message("Success")
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
    @PutMapping("/myInfo/{userId}")
    ResponseEntity<ApiResponse<UserResponse>> updateMyInfo(@ModelAttribute MyInfoRequest request,
                                                           @PathVariable int userId) throws IOException {
        UserResponse userResponse = userService.updateMyInfo(request,userId);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userResponse)
                .build());
    }

    @GetMapping("/get-page")
    public ResponseEntity<ApiResponse<Page<UserResponse>>> getAllUserSearch(@RequestParam(defaultValue = "1") int pageNo,
                                                                            @RequestParam(defaultValue = "8") int pageSize,
                                                                            @RequestParam(required = false) String keyword) {
        Page<UserResponse> users = userService.getUserAllSearch(pageNo,pageSize,keyword);
        return ResponseEntity.ok(ApiResponse.<Page<UserResponse>>builder()
                .message("Lấy danh sách người dùng thành công")
                .result(users)
                .build());
    }


    @PutMapping("/pwd/{userId}")
    ResponseEntity<ApiResponse<Void>> updatePassword(@RequestBody @Valid UpdatePasswordRequest request,
                                                           @PathVariable int userId){
        userService.updatePassword(request,userId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Success")
                .build());
    }
}
