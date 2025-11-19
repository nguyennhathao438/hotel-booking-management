package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.ReviewRequest;
import com.hotelbooking.hotel_booking.dto.response.*;
import com.hotelbooking.hotel_booking.entity.*;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.InvoiceRepository;
import com.hotelbooking.hotel_booking.repository.ReviewRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.hotelbooking.hotel_booking.service.UserSevice.mapToUserResponse;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    HotelRepository hotelRepository;
    @Autowired
    InvoiceRepository invoiceRepository;
    public ReviewResponse createReview(ReviewRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Hotel hotel = hotelRepository.findById(request.getHotelId()).orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        Invoice invoice = invoiceRepository.findById(request.getInvoiceId()).orElseThrow(()->new AppException(ErrorCode.INVOICE_FAILED));
        if (request.getStar() < 0 || request.getStar() > 5) {
            throw new AppException(ErrorCode.INVALID_INPUT);
        }
        Review review = Review.builder()
                .user(user)
                .hotel(hotel)
                .invoice(invoice)
                .feedback(request.getFeedback())
                .star(request.getStar())
                .build();
        reviewRepository.save(review);
        double avgStar = reviewRepository.findByAvgStarByHotel_hotelId(request.getHotelId());
        hotel.setHotelRating(avgStar);
        hotelRepository.save(hotel);
        return mapToReviewResponse(review);
    }
    public List<ReviewResponse> findByHotel_hotelId(int hotelId){
        List<Review> reviews = reviewRepository.findByHotel_hotelId(hotelId);
        return reviews.stream()
                .map(this::mapToReviewResponse)
                .toList();
    }
    public ReviewResponse findByInvoice_Id(int invoiceId){
        Review review = reviewRepository.findByInvoice_Id(invoiceId);
        return mapToReviewResponse(review);
    }

    public ReviewResponse updateReviewResponse(int reviewId, ReviewRequest request) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new AppException(ErrorCode.FEEDBACK_NOT_EXISTED));
        review.setStar(request.getStar());
        review.setFeedback(request.getFeedback());
        Hotel hotel = hotelRepository.findById(request.getHotelId()).orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        Invoice invoice = invoiceRepository.findById(request.getInvoiceId()).orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        review.setHotel(hotel);
        review.setInvoice(invoice);
        review.setUser(user);
        reviewRepository.save(review);
        double avgStar = reviewRepository.findByAvgStarByHotel_hotelId(request.getHotelId());
        hotel.setHotelRating(avgStar);
        hotelRepository.save(hotel);
        return mapToReviewResponse(review);
    }

    public List<ReviewResponse> findAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream()
                .map(this::mapToReviewResponse)
                .toList();
    }
    public List<Review> getReviewByHotelId(int id){
        Hotel hotel = hotelRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        return reviewRepository.findAllByHotel(hotel);
    }
    public ReviewResponse mapToReviewResponse(Review review){
        User user = userRepository.findById(review.getUser().getId()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Hotel hotel = hotelRepository.findById(review.getHotel().getHotelId()).orElseThrow(()->new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        Invoice invoice = invoiceRepository.findById(review.getInvoice().getId()).orElseThrow(()->new AppException(ErrorCode.INVOICE_FAILED));
        return ReviewResponse.builder()
                .id(review.getId())
                .user(mapToUserResponse(user))
                .hotel(mapToHotelResponse(hotel))
                .invoice(mapToInvoiceResponse(invoice))
                .feedback(review.getFeedback())
                .star(review.getStar())
                .createAt(review.getCreateAt())
                .build();
    }
    public UserResponse mapToUserResponse(User user){
        Set<String> roleNames = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .roles(roleNames)
                .dateOfBirth(user.getDateOfBirth())
                .avatar(user.getAvatar())
                .createAt(user.getCreateAt())
                .updateAt(user.getUpdateAt())
                .build();
    }
    public HotelResponse mapToHotelResponse(Hotel hotel) {
        return HotelResponse.builder()
                .hotelId(hotel.getHotelId())
                .hotelName(hotel.getHotelName())
                .hotelAddress(hotel.getHotelAddress())
                .hotelPhone(hotel.getHotelPhone())
                .hotelRating(hotel.getHotelRating())
                .hotelTotalRoom(hotel.getHotelTotalRoom())
                .hotelCost(hotel.getHotelCost())
                .hotelDescription(hotel.getHotelDescription())
                .status(hotel.getStatus())
                .user(mapToUserResponse(hotel.getUser()))
                .build();
    }
    public InvoiceResponse mapToInvoiceResponse(Invoice invoice) {
        return InvoiceResponse.builder()
                .id(invoice.getId())
                .checkInDate(invoice.getCheckInDate())
                .checkOutDate(invoice.getCheckOutDate())
                .createdAt(invoice.getCreatedAt())
                .totalAmount(invoice.getTotalAmount())
                .payment(invoice.getPayment())
                .status(invoice.getStatus())
                .room(mapToRoomResponse(invoice.getRoom()))
                .user(mapToUserResponse(invoice.getUser()))
                .build();
    }

    public RoomResponse mapToRoomResponse(Room room) {
        return RoomResponse.builder()
                .roomId(room.getRoomId())
                .roomName(room.getRoomName())
                .roomType(room.getRoomType())
                .roomCapacity(room.getRoomCapacity())
                .roomArea(room.getRoomArea())
                .bedRoomCount(room.getBedRoomCount())
                .bedCount(room.getBedCount())
                .roomPrice(room.getRoomPrice())
                .status(room.getStatus())
                .hotel(mapToHotelResponse(room.getHotel()))
                .roomCreateAt(room.getRoomCreateAt())
                .roomUpdateAt(room.getRoomUpdateAt())
                .build();
    }
}
