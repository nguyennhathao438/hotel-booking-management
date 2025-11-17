package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.RoomRequest;
import com.hotelbooking.hotel_booking.dto.request.ServiceRequest;
import com.hotelbooking.hotel_booking.dto.response.RoomResponse;
import com.hotelbooking.hotel_booking.dto.response.ServiceResponse;
import com.hotelbooking.hotel_booking.service.dichvu;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/service")
public class ServiceController {
    @Autowired
    private dichvu dv;

    @PostMapping("/create")
    ResponseEntity<ApiResponse<ServiceResponse>> create(@Valid @RequestBody ServiceRequest rs) {
        ServiceResponse serviceResponse = dv.createService(rs);
        return ResponseEntity.ok(ApiResponse.<ServiceResponse>builder()
                .code(1)
                .message("Thêm dịch vụ thành công")
                .result(serviceResponse)
                .build());
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<ApiResponse<List<ServiceResponse>>> getServicesByHotelId(@PathVariable int hotelId) {
        List<ServiceResponse> services = dv.getServicesByHotelId(hotelId);
        return ResponseEntity.ok(ApiResponse.<List<ServiceResponse>>builder()
                .code(1)
                .message("Danh sách dịch vụ của khách sạn")
                .result(services)
                .build());
    }

    @DeleteMapping("/delete/{serviceId}")
    public ResponseEntity<ApiResponse<Void>> deleteService(@PathVariable int serviceId) {
        dv.deleteService(serviceId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(1)
                .message("Xóa dịch vụ thành công")
                .build());
    }
}

