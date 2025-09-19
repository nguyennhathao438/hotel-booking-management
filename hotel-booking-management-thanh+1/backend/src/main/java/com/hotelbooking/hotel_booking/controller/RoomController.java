package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.RoomRequest.RoomRegisterRequest;
import com.hotelbooking.hotel_booking.dto.request.RoomRequest.RoomUpdateRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.entity.Room;
import com.hotelbooking.hotel_booking.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/room")

public class RoomController {
@Autowired
RoomService roomService;
@PostMapping("/register")
ApiResponse registerRoom(@RequestBody @Valid RoomRegisterRequest request){
    ApiResponse<Room> apiResponse = new ApiResponse<>();
    apiResponse.setResult(roomService.registerRoom(request));
    return apiResponse;
}
@PutMapping("/{roomID}")
Room updateRoom(@RequestBody RoomUpdateRequest request, @PathVariable int roomID) {
    return roomService.updateRoom(request,roomID);
}
}
