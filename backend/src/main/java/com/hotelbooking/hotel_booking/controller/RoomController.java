package com.hotelbooking.hotel_booking.controller;


import com.hotelbooking.hotel_booking.dto.request.RoomRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.RoomResponse;
import com.hotelbooking.hotel_booking.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")

@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @PostMapping("/create")
    ResponseEntity<ApiResponse<RoomResponse>> createRoom(@RequestBody @Valid RoomRequest request) {
        RoomResponse roomResponse = roomService.createRoom(request);
        return ResponseEntity.ok(ApiResponse.<RoomResponse>builder()
                .message("Tạo phòng thành công")
                .result(roomResponse)
                .build());
    }
    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getRoomsByHotelId(@PathVariable int hotelId){
        List<RoomResponse> roomResponse = roomService.getRoomsByHotelId(hotelId);
        return ResponseEntity.ok(ApiResponse.<List<RoomResponse>>builder()
                        .message("Lấy thông tin phòng thành công")
                        .result(roomResponse)
                .build());
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getAllRooms() {
        List<RoomResponse> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(ApiResponse.<List<RoomResponse>>builder()
                .message("Lấy danh sách phòng thành công")
                .result(rooms)
                .build());
    }

    @GetMapping("/{roomID}")
    public ResponseEntity<ApiResponse<RoomResponse>> getRoom(@PathVariable int roomID) {
        RoomResponse roomResponse = roomService.getRoomById(roomID);
        return ResponseEntity.ok(ApiResponse.<RoomResponse>builder()
                .message("Lấy thông tin phòng thành công")
                .result(roomResponse)
                .build());
    }
    @PutMapping("/{roomID}")
    public ResponseEntity<ApiResponse<RoomResponse>> updateRoom(
            @PathVariable int roomID,
            @RequestBody @Valid RoomRequest request) {
        RoomResponse roomResponse = roomService.updateRoom(roomID, request);
        return ResponseEntity.ok(ApiResponse.<RoomResponse>builder()
                .message("Cập nhật phòng thành công")
                .result(roomResponse)
                .build());
    }
    @DeleteMapping("/{roomID}")
    public ResponseEntity<ApiResponse<Void>> deleteRoom(@PathVariable int roomID) {
        roomService.deleteRoom(roomID);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .message("Xóa phòng thành công")
                .build());
    }
}


