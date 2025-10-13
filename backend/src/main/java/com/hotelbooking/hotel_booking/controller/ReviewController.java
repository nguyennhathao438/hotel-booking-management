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
    @PostMapping
    ResponseEntity<ApiResponse<ReviewResponse>> createReview(@Valid @RequestBody ReviewRequest request){
        return ResponseEntity.ok(
                ApiResponse.<ReviewResponse>builder()
                        .message("Success")
                        .result(reviewService.createReview(request))
                        .build());
    }
    @GetMapping("/{hotelId}")
    ResponseEntity<ApiResponse<List<Review>>> getReviewByHotel(@PathVariable int hotelId){
        return ResponseEntity.ok(
                ApiResponse.<List<Review>>builder()
                        .message("Success")
                        .result(reviewService.getReviewByHotelId(hotelId))
                        .build()
        );
    }
}
