package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.ReviewRequest;
import com.hotelbooking.hotel_booking.dto.response.ReviewResponse;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.Review;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.ReviewRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class ReviewService {
    ReviewRepository reviewRepository;
    UserRepository userRepository;
    HotelRepository hotelRepository;
    public ReviewResponse createReview(ReviewRequest request){
        User user = userRepository.findById(request.getUserId()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        Hotel hotel = hotelRepository.findById(request.getHotelId()).orElseThrow(()-> new AppException(ErrorCode.HOTEL_NOT_EXISTED));

        Review review = Review.builder()
                .user(user)
                .hotel(hotel)
                .feedback(request.getFeedback())
                .star(request.getStar())
                .build();
        reviewRepository.save(review);
        return mapToReviewResponse(review);
    }
    public List<Review> getReviewByHotelId(int id){
        Hotel hotel = hotelRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        return reviewRepository.findAllByHotel(hotel);
    }
    static ReviewResponse mapToReviewResponse(Review review){
        return ReviewResponse.builder()
                .userId(review.getUser().getId())
                .hotelId(review.getHotel().getHotelId())
                .feedback(review.getFeedback())
                .star(review.getStar())
                .createAt(review.getCreateAt())
                .build();
    }
}
