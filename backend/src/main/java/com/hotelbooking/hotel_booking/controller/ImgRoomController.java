package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.ImgRoomResponse;
import com.hotelbooking.hotel_booking.service.ImgRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/api/imageRoom")
public class ImgRoomController {
    @Autowired
    ImgRoomService imgRoomService;
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<List<ImgRoomResponse>>> uploadRoomImg(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("roomId") int hotelId) throws IOException
    {
        List<ImgRoomResponse> listImg = imgRoomService.uploadRoomImage(files, hotelId);
        return ResponseEntity.ok(ApiResponse.<List<ImgRoomResponse>>builder()
                .code(1)
                .message("Tạo ảnh khách sạn thành công")
                .result(listImg)
                .build());
    }

    @DeleteMapping("/delete/{idImg}")
    public ResponseEntity<ApiResponse<String>> deleteImgRoomById(@PathVariable int idImg) {
        imgRoomService.deleteImgRoomById(idImg);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .code(1)
                .message("Xoa anh thanh cong")
                .result("Xoa anh thanh cong")
                .build());
    }
    @GetMapping("/room/{roomId}")
    public ResponseEntity<ApiResponse<List<ImgRoomResponse>>> findByRoom_RoomId(@PathVariable int roomId) {
        List<ImgRoomResponse> listImg = imgRoomService.findByRoom_RoomId(roomId);
        return ResponseEntity.ok(ApiResponse.<List<ImgRoomResponse>>builder()
                .code(1)
                .message("Lay anh theo id phong thanh cong")
                .result(listImg)
                .build());
    }
}
