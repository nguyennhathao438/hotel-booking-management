package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.ReviewRequest;
import com.hotelbooking.hotel_booking.dto.response.ReviewResponse;
import com.hotelbooking.hotel_booking.entity.*;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class ReviewServiceTest {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    private User user;
    private Hotel hotel;
    private Invoice invoice;


    @BeforeEach
    void setup() {


        user = User.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@test.com")
                .phone("0123456789")
                .roles(Set.of())
                .build();
        user = userRepository.save(user);


        hotel = Hotel.builder()
                .hotelName("Hotel Test")
                .hotelAddress("123 Street")
                .hotelPhone("0123456789")
                .hotelCost(500.0)
                .hotelTotalRoom(10.0)
                .hotelRating(0.0)
                .status(1)
                .user(user)
                .build();
        hotelRepository.save(hotel);

        Room room = Room.builder()
                .roomName("Room 101")
                .roomType("Single")
                .roomCapacity(2)
                .roomArea(20.0)
                .bedCount(1)
                .bedRoomCount(1)
                .roomPrice(500.0)
                .status(1)
                .hotel(hotel)
                .build();
        roomRepository.save(room);

        invoice = Invoice.builder()
                .user(user)
                .room(room)
                .checkInDate(LocalDate.now())
                .checkOutDate(LocalDate.now().plusDays(2))
                .totalAmount(1000.0)
                .payment(1)
                .status(1)
                .build();
        invoiceRepository.save(invoice);
    }

    @Test
    @DisplayName("Tạo review thành công")
    void createReview_Success() {
        ReviewRequest request = new ReviewRequest();
        request.setUserId(user.getId());
        request.setHotelId(hotel.getHotelId());
        request.setInvoiceId(invoice.getId());
        request.setFeedback("Rất tốt!");
        request.setStar(5);

        ReviewResponse response = reviewService.createReview(request);

        assertThat(response).isNotNull();
        assertThat(response.getFeedback()).isEqualTo("Rất tốt!");
        assertThat(response.getStar()).isEqualTo(5);
        assertThat(reviewRepository.findAll()).hasSize(1);
    }

    @Test
    @DisplayName("Tạo review thất bại khi user không tồn tại")
    void createReview_UserNotExist_Throws() {
        ReviewRequest request = new ReviewRequest();
        request.setUserId(9999);
        request.setHotelId(hotel.getHotelId());
        request.setInvoiceId(invoice.getId());
        request.setFeedback("Rất tốt!");
        request.setStar(5);

        AppException ex = assertThrows(AppException.class, () -> reviewService.createReview(request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.USER_NOT_EXISTED);
    }

    @Test
    @DisplayName("Tạo review thất bại khi hotel không tồn tại")
    void createReview_HotelNotExist_Throws() {
        ReviewRequest request = new ReviewRequest();
        request.setUserId(user.getId());
        request.setHotelId(9999);
        request.setInvoiceId(invoice.getId());
        request.setFeedback("Rất tốt!");
        request.setStar(5);

        AppException ex = assertThrows(AppException.class, () -> reviewService.createReview(request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.HOTEL_NOT_EXISTED);
    }

    @Test
    @DisplayName("Lấy review theo hotelId")
    void findByHotelId_Success() {
        ReviewRequest request = new ReviewRequest();
        request.setUserId(user.getId());
        request.setHotelId(hotel.getHotelId());
        request.setInvoiceId(invoice.getId());
        request.setFeedback("Rất tốt!");
        request.setStar(5);

        ReviewResponse response = reviewService.createReview(request);

        List<ReviewResponse> reviews = reviewService.findByHotel_hotelId(hotel.getHotelId());
        assertThat(reviews).hasSize(1);
        assertThat(reviews.get(0).getFeedback()).isEqualTo("Rất tốt!");
    }


    @Test
    @DisplayName("Tạo review thất bại vì số sao không hợp lệ (0 hoặc >5)")
    void createReview_InvalidStar_Fail() {
        ReviewRequest request = new ReviewRequest();
        request.setUserId(user.getId());
        request.setHotelId(hotel.getHotelId());
        request.setInvoiceId(invoice.getId());
        request.setFeedback("Tệ");
        request.setStar(-1);

        AppException exception = assertThrows(AppException.class, () ->
                reviewService.createReview(request)
        );

        assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);
    }


    @Test
    @DisplayName("Cập nhật review thành công")
    void updateReview_Success() {
        ReviewRequest request = new ReviewRequest();
        request.setUserId(user.getId());
        request.setHotelId(hotel.getHotelId());
        request.setInvoiceId(invoice.getId());
        request.setFeedback("Rất tốt!");
        request.setStar(4);

        ReviewResponse response = reviewService.createReview(request);

        ReviewRequest updateRequest = new ReviewRequest();
        updateRequest.setUserId(user.getId());
        updateRequest.setHotelId(hotel.getHotelId());
        updateRequest.setInvoiceId(invoice.getId());
        updateRequest.setFeedback("Rất tốt!!!");
        updateRequest.setStar(5);
        ReviewResponse updated = reviewService.updateReviewResponse(response.getId(), updateRequest);

        assertThat(updated.getFeedback()).isEqualTo("Rất tốt!!!");
        assertThat(updated.getStar()).isEqualTo(5);
    }

    @Test
    @DisplayName("Cập nhật review thất bại khi review không tồn tại")
    void updateReview_NotExist_Throws() {
        ReviewRequest updateRequest = new ReviewRequest(user.getId(), hotel.getHotelId(), invoice.getId(), "Rất tốt!", 5);

        AppException ex = assertThrows(AppException.class,
                () -> reviewService.updateReviewResponse(9999, updateRequest));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.FEEDBACK_NOT_EXISTED);
    }

    /// ///
    @Test
    @DisplayName("Lấy review theo invoiceId thành công")
    void findByInvoiceId_Success() {
        ReviewRequest request = new ReviewRequest();
        request.setUserId(user.getId());
        request.setHotelId(hotel.getHotelId());
        request.setInvoiceId(invoice.getId());
        request.setFeedback("Rất tốt!");
        request.setStar(4);

        ReviewResponse response2 = reviewService.createReview(request);


        ReviewResponse response = reviewService.findByInvoice_Id(invoice.getId());
        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(response.getId());
        assertThat(response.getFeedback()).isEqualTo("Rất tốt!");
    }

    @Test
    @DisplayName("Lấy tất cả review")
    void findAllReviews_Success() {
        ReviewRequest request = new ReviewRequest();
        request.setUserId(user.getId());
        request.setHotelId(hotel.getHotelId());
        request.setInvoiceId(invoice.getId());
        request.setFeedback("Rất tốt!");
        request.setStar(4);

        ReviewResponse response = reviewService.createReview(request);

        List<ReviewResponse> reviews = reviewService.findAllReviews();
        assertThat(reviews).hasSize(1);
    }


    @Test
    @DisplayName("Lấy danh sách review theo hotel")
    void getReviewByHotelId_Success() {
        ReviewRequest request = new ReviewRequest();
        request.setUserId(user.getId());
        request.setHotelId(hotel.getHotelId());
        request.setInvoiceId(invoice.getId());
        request.setFeedback("Rất tốt!");
        request.setStar(4);

        ReviewResponse response = reviewService.createReview(request);

        List<Review> reviews = reviewService.getReviewByHotelId(hotel.getHotelId());
        assertThat(reviews).hasSize(1);
    }


    @Test
    @DisplayName("Map review to ReviewResponse")
    void mapToReviewResponse_Success() {
        ReviewRequest request = new ReviewRequest();
        request.setUserId(user.getId());
        request.setHotelId(hotel.getHotelId());
        request.setInvoiceId(invoice.getId());
        request.setFeedback("Rất tốt!");
        request.setStar(4);

        ReviewResponse response2 = reviewService.createReview(request);

        Review reviewEntity = reviewRepository.findById(response2.getId())
                .orElseThrow(() -> new RuntimeException("Review không tồn tại"));

        ReviewResponse response = reviewService.mapToReviewResponse(reviewEntity);

        assertThat(response.getStar()).isEqualTo(4);
        assertThat(response.getFeedback()).isEqualTo("Rất tốt!");
        assertThat(response.getUser().getId()).isEqualTo(user.getId());
        assertThat(response.getHotel().getHotelId()).isEqualTo(hotel.getHotelId());
    }

}
