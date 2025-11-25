package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.HotelRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.HotelResponse;
import com.hotelbooking.hotel_booking.dto.response.InvoiceResponse;
import com.hotelbooking.hotel_booking.entity.ImgHotel;
import com.hotelbooking.hotel_booking.repository.ImgHotelRepository;
import com.hotelbooking.hotel_booking.service.HotelService;
import com.hotelbooking.hotel_booking.service.ImgHotelService;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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
                                .build());
        }

        @GetMapping("/search/{province}")
        public ResponseEntity<ApiResponse<List<HotelResponse>>> findByHotelAddressContainingIgnoreCase(
                        @PathVariable String province) {
                List<HotelResponse> hotelProvinceList = hotelService.findByHotelAddressContainingIgnoreCase(province);
                return ResponseEntity.ok(ApiResponse.<List<HotelResponse>>builder()
                                .code(1)
                                .message("Tìm khách sạn theo tỉnh thành công")
                                .result(hotelProvinceList)
                                .build());
        }


        @GetMapping("/{hotelID}")
        public ResponseEntity<ApiResponse<HotelResponse>> getHotelById(@PathVariable int hotelID) {
                HotelResponse hotelResponse = hotelService.getHotelById(hotelID);
                return ResponseEntity.ok(ApiResponse.<HotelResponse>builder()
                                .code(1)
                                .message("Lấy khách sạn theo ID thành công")
                                .result(hotelResponse)
                                .build());
        }


        @GetMapping("/all")
        public ResponseEntity<ApiResponse<List<HotelResponse>>> getAllHotels() {
                List<HotelResponse> hotelList = hotelService.getAllHotels();
                return ResponseEntity.ok(ApiResponse.<List<HotelResponse>>builder()
                                .code(1)
                                .message("Lấy danh sách khách sạn thành công")
                                .result(hotelList)
                                .build());
        }

        @PutMapping("/update/{hotelID}")
        public ResponseEntity<ApiResponse<HotelResponse>> updateHotel(@PathVariable int hotelID,
                        @RequestBody @Valid HotelRequest request) {
                HotelResponse hotelResponse = hotelService.updateHotel(hotelID, request);
                return ResponseEntity.ok(ApiResponse.<HotelResponse>builder()
                                .code(1)
                                .message("Cập nhật khách sạn thành công")
                                .result(hotelResponse)
                                .build());
        }

        @GetMapping("/user/{userId}")
        public ResponseEntity<ApiResponse<List<HotelResponse>>> getHotelsByUserId(@PathVariable int userId) {
                List<HotelResponse> hotels = hotelService.getHotelsByUserId(userId);
                ApiResponse<List<HotelResponse>> response = ApiResponse.<List<HotelResponse>>builder()
                                .message("Lấy danh sách khách sạn theo userId thành công")
                                .result(hotels)
                                .build();
                return ResponseEntity.ok(response);
        }

        @GetMapping("/getkhong")
        public ResponseEntity<ApiResponse<List<HotelResponse>>> getAllHotels0() {
                List<HotelResponse> hotelList = hotelService.getAllHotels0();
                return ResponseEntity.ok(ApiResponse.<List<HotelResponse>>builder()
                                .message("Danh sách khách sạn")
                                .result(hotelList)
                                .build());
        }

        @GetMapping("/see/{hotelID}")
        public ResponseEntity<ApiResponse<HotelResponse>> getHotelsById(@PathVariable int hotelID) {
                HotelResponse hotelResponse = hotelService.getHotelById(hotelID);
                return ResponseEntity.ok(ApiResponse.<HotelResponse>builder()
                                .message("Thông tin khách sạn")
                                .result(hotelResponse)
                                .build());
        }

        @PutMapping("/approve/{id}")
        public ResponseEntity<ApiResponse> approveHotel(@PathVariable("id") int id) {
                HotelResponse response = hotelService.approveHotel(id);
                return ResponseEntity.ok(ApiResponse.builder()
                                .code(1000)
                                .message("Duyệt khách sạn thành công")
                                .result(response)
                                .build());
        }

        @GetMapping("/all/get-page")
        public ResponseEntity<ApiResponse<Page<HotelResponse>>> getAllHotelSearch(
                        @RequestParam(defaultValue = "1") int pageNo,
                        @RequestParam(defaultValue = "7") int pageSize,
                        @RequestParam(required = false) Double hotelRating,
                        @RequestParam(required = false) String sortByCost,
                        @RequestParam(required = false) String keyword) {
                Page<HotelResponse> hotels = hotelService.getAllHotelSearch(pageNo, pageSize, hotelRating, sortByCost,
                                keyword);
                return ResponseEntity.ok(ApiResponse.<Page<HotelResponse>>builder()
                                .message("Danh sách Phân trang khách sạn")
                                .result(hotels)
                                .build());
        }

        @DeleteMapping("/{hotelId}")
        public ResponseEntity<ApiResponse<Void>> deleteRequiredAddHotel(@PathVariable int hotelId) {
                hotelService.deleteRequestAddHotel(hotelId);
                return ResponseEntity.ok(ApiResponse.<Void>builder()
                                .message("Xóa yêu cầu khách sạn thành công")
                                .build());
        }

        @GetMapping("/all/page")
        public ResponseEntity<ApiResponse<Page<HotelResponse>>> getAdminHotel(
                        @RequestParam(defaultValue = "1") int pageNo,
                        @RequestParam(defaultValue = "5") int pageSize,
                        @RequestParam(required = false) Double hotelRating,
                        @RequestParam(required = false) String sortByCost,
                        @RequestParam(required = false) String keyword) {
                Page<HotelResponse> hotels = hotelService.getAdminHotel(pageNo, pageSize, hotelRating, sortByCost,
                                keyword);
                return ResponseEntity.ok(ApiResponse.<Page<HotelResponse>>builder()
                                .message("Danh sách Phân trang khách sạn Admin")
                                .result(hotels)
                                .build());
        }

        @DeleteMapping("delete/{HotelId}")
        public ResponseEntity<ApiResponse<HotelResponse>> deleteHotel(@PathVariable int HotelId) {
                HotelResponse hotelResponse = hotelService.banHotel(HotelId);
                return ResponseEntity.ok(ApiResponse.<HotelResponse>builder()
                                .message("Xóa khách sạn thành công")
                                .result(hotelResponse)
                                .build());
        }
}
