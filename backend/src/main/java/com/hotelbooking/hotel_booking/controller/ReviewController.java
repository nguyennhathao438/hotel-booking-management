package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.ReviewRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.ReviewResponse;
import com.hotelbooking.hotel_booking.entity.Review;
import com.hotelbooking.hotel_booking.service.ReviewService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/review")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ReviewController {
    ReviewService reviewService;
    @PostMapping("/create")
    ResponseEntity<ApiResponse<ReviewResponse>> createReview(@Valid @RequestBody ReviewRequest request){
        return ResponseEntity.ok(
                ApiResponse.<ReviewResponse>builder()
                        .code(1)
                        .message("Thêm feedback thành công")
                        .result(reviewService.createReview(request))
                        .build());
    }
    @GetMapping("/invoice/{invoiceId}")
    public ResponseEntity<ApiResponse<ReviewResponse>> findByInvoice_Id(@PathVariable("invoiceId") int invoiceId) {
        ReviewResponse reviewResponse = reviewService.findByInvoice_Id(invoiceId);
        return ResponseEntity.ok(ApiResponse.<ReviewResponse>builder()
                .code(1)
                .message("Lấy danh sách feedback theo id invoice thành công")
                .result(reviewResponse)
                .build());
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> findByHotel_hotelId(@PathVariable("hotelId") int hotelId) {
        return ResponseEntity.ok(ApiResponse.<List<ReviewResponse>>builder()
                .code(1)
                .message("Lấy danh sách feedback theo id hotel thành công")
                .result(reviewService.findByHotel_hotelId(hotelId))
                .build());
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> findAllReviews() {
        return ResponseEntity.ok(ApiResponse.<List<ReviewResponse>>builder()
                .code(1)
                .message("Lấy danh sách feedback thành công")
                .result(reviewService.findAllReviews())
                .build());
    }
}
