package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Integer> {
    public List<Booking> getBookingByRoom_RoomId(int roomId);
    public Booking getBookingByUser_Email(String email);
}
