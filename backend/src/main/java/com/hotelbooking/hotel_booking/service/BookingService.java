package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.BookingRequest;
import com.hotelbooking.hotel_booking.dto.response.BookingResponse;
import com.hotelbooking.hotel_booking.entity.Booking;
import com.hotelbooking.hotel_booking.entity.Room;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.BookingRepository;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;

    public List<BookingResponse> getAllBookings(){
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(this::mapToBookingRespone)
                .toList();
    }

    public BookingResponse getBookingById(int id){
        Booking booking = bookingRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        return mapToBookingRespone(booking);
    }

//    public BookingResponse saveBooking(BookingRequest request,int roomId){
//        if(request.getCheckOutDate().isBefore(request.getCheckInDate())){
//            throw new AppException(ErrorCode.BOOKING_FAILED);
//        }
//        User user = getCurrentUser();
//        Room room = roomRepository.findById(roomId).orElseThrow(()->new AppException(ErrorCode.ROOM_NOT_EXISTED));
//        List<Booking> existBookings = room.getBookings();
//        boolean roomIsAvailable = roomIsAvailable(request,existBookings);
//        Booking booking = Booking.builder()
//                .adults(request.getAdults())
//                .checkOutDate(request.getCheckOutDate())
//                .checkInDate(request.getCheckInDate())
//                .children(request.getChildren())
//                .totalPerson(request.getTotalPerson())
//                .room(room)
//                .user(user)
//                .build();
//        if(roomIsAvailable){
//            room.addBooking(booking);
//            bookingRepository.save(booking);
//        }
//        else{
//            throw new AppException(ErrorCode.BOOKING_FAILED);
//        }
//        return mapToBookingRespone(booking);
//    }
    public List<BookingResponse> getAllBookingsByRoomId(int roomId){
        List<Booking> listBookings =bookingRepository.getBookingByRoom_RoomId(roomId);
        return listBookings.stream()
                .map(this::mapToBookingRespone)
                .toList();
    }
    public BookingResponse getBookingByUserEmail(String email){
        Booking booking = bookingRepository.getBookingByUser_Email(email);
        return mapToBookingRespone(booking);
    }
    public void cancleBooking(int id){
        bookingRepository.deleteById(id);
    }

    public boolean roomIsAvailable(BookingRequest request, List<Booking> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        request.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                                && request.getCheckOutDate().isAfter(existingBooking.getCheckInDate())
                );
    }

    public BookingResponse mapToBookingRespone(Booking booking){
        return BookingResponse.builder()
                .id(booking.getId())
                .adults(booking.getAdults())
                .checkOutDate(booking.getCheckOutDate())
                .checkInDate(booking.getCheckInDate())
                .children(booking.getChildren())
                .totalPerson(booking.getTotalPerson())
                .room(booking.getRoom())
                .user(booking.getUser())
                .build();
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
}
