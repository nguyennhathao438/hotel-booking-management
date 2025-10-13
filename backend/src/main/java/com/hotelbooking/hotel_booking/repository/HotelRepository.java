package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    boolean existsByHotelName(String hotelName);
    List<Hotel> findByStatus(Integer status);
    List<Hotel> findByHotelId(Integer hotelID);
}