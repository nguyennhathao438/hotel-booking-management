package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.ImgHotelRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.ImgHotelRespone;
import com.hotelbooking.hotel_booking.service.ImgHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImgHotelController {
    @Autowired
    private ImgHotelService imgHotelService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<List<ImgHotelRespone>>> uploadImages(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("hotelId") int hotelId) throws IOException {
        List<ImgHotelRespone> responses = imgHotelService.uploadImages(files, hotelId);
        return ResponseEntity.ok(ApiResponse.<List<ImgHotelRespone>>builder()
                .message("Tạo ảnh khách sạn thành công")
                .result(responses)
                .build());
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<ApiResponse<List<ImgHotelRespone>>> getImgHotelBy_HotelId(@PathVariable int hotelId) {
        List<ImgHotelRespone> listResponses = imgHotelService.getImgHotelsBy_HotelId(hotelId);
        return ResponseEntity.ok(ApiResponse.<List<ImgHotelRespone>>builder()
                .message("Lấy danh sách ảnh khách sạn thành công")
                .result(listResponses)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImgHotelRespone> getImage(@PathVariable int id) {
        return ResponseEntity.ok(imgHotelService.getImgHotelById(id));
    }
}
