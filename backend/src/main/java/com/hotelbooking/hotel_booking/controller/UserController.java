package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.UserRegisterRequest;
import com.hotelbooking.hotel_booking.dto.request.UserUpdateRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.service.UserSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserSevice userService;
    @PostMapping("/register")
    ApiResponse<User> createUser(@RequestBody @Valid UserRegisterRequest request){
        ApiResponse<User> apiResponse= new ApiResponse<>();
        apiResponse.setResult(userService.registerUser(request));
        return apiResponse;
    }
    @GetMapping
    List<User> getAllUser(){
        return userService.getAllUser();
    }
    @GetMapping("/{userId}")
    User getUser(@PathVariable("userId") int userId){
        return userService.getUser(userId);
    }
    @PutMapping("/{userId}")
    User updateUser(@RequestBody UserUpdateRequest request,@PathVariable int userId){
        return userService.updateUser(request,userId);
    }
}
