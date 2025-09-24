package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.HotelRequest;
import com.hotelbooking.hotel_booking.dto.response.HotelResponse;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.hotelbooking.hotel_booking.service.UserSevice.mapToUserResponse;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HotelService {

private HotelRepository hotelRepository;
private UserRepository userRepository;
@Autowired
    public HotelService(HotelRepository hotelRepository,UserRepository userRepository) {
    this.hotelRepository = hotelRepository;
    this.userRepository = userRepository;
}
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
    public HotelResponse createHotel(HotelRequest request) {
        if(hotelRepository.existsByHotelName(request.getHotelName())) {
            throw new AppException(ErrorCode.HOTEL_EXISTED);
        }
        User user = getCurrentUser();
        Hotel hotel = Hotel.builder()
                .hotelName(request.getHotelName())
                .hotelAddress(request.getHotelAddress())
                .hotelPhone(request.getHotelPhone())
                .hotelRating(request.getHotelRating())
                .hotelTotalRoom(request.getHotelTotalRoom())
                .hotelCost(request.getHotelCost())
                .hotelDescription(request.getHotelDescription())
                .status(0)
                .user(user)
                .build();

        hotelRepository.save(hotel);
        return mapToHotelResponse(hotel);
    }
public List<HotelResponse> getAllHotels() {
    List<Hotel> hotels = hotelRepository.findAll();
    return hotels.stream()
            .map(this::mapToHotelResponse)
            .toList();
}
public HotelResponse getHotelById(int id) {
    Hotel hotel = hotelRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
    return mapToHotelResponse(hotel);
}
    public HotelResponse updateHotel(int hotelId, HotelRequest request) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));

        if (request.getHotelName() != null && !request.getHotelName().isBlank()) {
            hotel.setHotelName(request.getHotelName());
        }
        if (request.getHotelAddress() != null && !request.getHotelAddress().isBlank()) {
            hotel.setHotelAddress(request.getHotelAddress());
        }
        if (request.getHotelPhone() != null && !request.getHotelPhone().isBlank()) {
            hotel.setHotelPhone(request.getHotelPhone());
        }
        if (request.getHotelRating() != null) {
            hotel.setHotelRating(request.getHotelRating());
        }
        if (request.getHotelTotalRoom() != null) {
            hotel.setHotelTotalRoom(request.getHotelTotalRoom());
        }
        if (request.getHotelCost() != null) {
            hotel.setHotelCost(request.getHotelCost());
        }
        if (request.getHotelDescription() != null && !request.getHotelDescription().isBlank()) {
            hotel.setHotelDescription(request.getHotelDescription());
        }
        if (request.getStatus() != null) {
            hotel.setStatus(request.getStatus());
        }

        hotelRepository.save(hotel);
        return mapToHotelResponse(hotel);
    }

    private HotelResponse mapToHotelResponse(Hotel hotel) {
        if (hotel == null) return null;

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
                .user(hotel.getUser() != null ? mapToUserResponse(hotel.getUser()) : null)
                .build();
    }
}
