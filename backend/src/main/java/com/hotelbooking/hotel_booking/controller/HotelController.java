package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.HotelRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.HotelResponse;
import com.hotelbooking.hotel_booking.service.HotelService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {
    @Autowired
    HotelService hotelService;
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<HotelResponse>> createHotel(@RequestBody @Valid HotelRequest request) {
        HotelResponse hotelResponse = hotelService.createHotel(request);
        return ResponseEntity.ok(ApiResponse.<HotelResponse>builder()
                .message("Tạo khách sạn thành công")
                .result(hotelResponse)
                .build()
        );
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<HotelResponse>>> getAllHotels() {
        List<HotelResponse> hotelList = hotelService.getAllHotels();
        return ResponseEntity.ok(ApiResponse.<List<HotelResponse>>builder()
                .message("Danh sách khách sạn")
                .result(hotelList)
                .build()
        );
    }

    @GetMapping("/{hotelID}")
    public ResponseEntity<ApiResponse<HotelResponse>> getHotelById(@PathVariable int hotelID) {
        HotelResponse hotelResponse = hotelService.getHotelById(hotelID);
        return ResponseEntity.ok(ApiResponse.<HotelResponse>builder()
                .message("Thông tin khách sạn")
                .result(hotelResponse)
                .build()
        );
    }

    @PutMapping("/update/{hotelID}")
    public ResponseEntity<ApiResponse<HotelResponse>> updateHotel(@PathVariable int hotelID, @RequestBody @Valid HotelRequest request) {
        HotelResponse hotelResponse = hotelService.updateHotel(hotelID, request);
        return ResponseEntity.ok(ApiResponse.<HotelResponse>builder()
                .message("Cập nhật khách sạn thành công")
                .result(hotelResponse)
                .build()
        );
    }
}
