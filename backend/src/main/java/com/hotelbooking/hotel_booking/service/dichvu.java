package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.ServiceRequest;
import com.hotelbooking.hotel_booking.dto.response.HotelResponse;
import com.hotelbooking.hotel_booking.dto.response.ServiceResponse;
import com.hotelbooking.hotel_booking.dto.response.UserResponse;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.HotelService;
import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class dichvu {
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    public ServiceResponse createService(ServiceRequest serviceRequest) {
        Hotel hotel = hotelRepository.findById(serviceRequest.getHotelID())
                .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        HotelService  hotelService = HotelService.builder()
                .serviceId(serviceRequest.getServiceId())
                .icon(serviceRequest.getIcon())
                .description(serviceRequest.getDescription())
                .hotel(hotel)
                .build();
        serviceRepository.save(hotelService);
        return mapToServiceResponse(hotelService);
    }
    private ServiceResponse mapToServiceResponse(HotelService hotelService) {
        return ServiceResponse.builder()
                .serviceId(hotelService.getServiceId())
                .icon(hotelService.getIcon())
                .description(hotelService.getDescription())
                .hotel(hotelService.getHotel() != null ? mapToHotelResponse(hotelService.getHotel()) : null)
                .build();
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
    public static UserResponse mapToUserResponse(User user){
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
}
