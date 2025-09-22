package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    boolean existsByHotelName(String hotelName);
}
