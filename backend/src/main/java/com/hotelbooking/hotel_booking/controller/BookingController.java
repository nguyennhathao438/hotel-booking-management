package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.BookingRequest;
import com.hotelbooking.hotel_booking.dto.response.BookingResponse;
import com.hotelbooking.hotel_booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @GetMapping("/all")
    public List<BookingResponse> getAllBookings(){
        return bookingService.getAllBookings();
    }
    @GetMapping("/{id}")
    public BookingResponse getBookingById(@PathVariable int id){
        return bookingService.getBookingById(id);
    }
    @GetMapping("/rooms/{roomId}")
    public List<BookingResponse> getAllBookingsByRoomId(@PathVariable int roomId){
        return bookingService.getAllBookingsByRoomId(roomId);
    }
    @GetMapping("/user/{userEmail}")
    public BookingResponse getBookingByUserEmail(@PathVariable String userEmail){
        return bookingService.getBookingByUserEmail(userEmail);
    }
    @PostMapping("/save")
//    public BookingResponse saveBooking(@RequestBody BookingRequest bookingRequest,@PathVariable int roomId){
//        return bookingService.saveBooking(bookingRequest,roomId);
//    }
    @DeleteMapping("/cancle")
    public void cancleBooking(@PathVariable int id){
        bookingService.cancleBooking(id);
    }
}
