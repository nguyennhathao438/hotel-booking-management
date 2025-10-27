package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Integer> {
    List<Review> findByHotel_hotelId(int hotelId);
    @Query("SELECT AVG(r.star) FROM Review r WHERE r.hotel.hotelId = :hotelId ")
    double findByAvgStarByHotel_hotelId(int hotelId);
}
