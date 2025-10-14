package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.RoomRequest;
import com.hotelbooking.hotel_booking.dto.request.ServiceRequest;
import com.hotelbooking.hotel_booking.dto.response.RoomResponse;
import com.hotelbooking.hotel_booking.dto.response.ServiceResponse;
import com.hotelbooking.hotel_booking.service.dichvu;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
@RestController
@RequestMapping("/api/service")
public class ServiceController {
    @Autowired
    private dichvu dv;
    @PostMapping("/create")
    ResponseEntity<ApiResponse<ServiceResponse>> create(@Valid @RequestBody ServiceRequest rs) {
        ServiceResponse serviceResponse = dv.createService(rs);
        return ResponseEntity.ok(ApiResponse.<ServiceResponse>builder()
                .message("cc")
                .result(serviceResponse)
                .build());
    }
}
