package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.ImgHotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImgHotelRepository extends JpaRepository<ImgHotel,Integer> {
    List<ImgHotel> findImgHotelByHotel_HotelId(int hotelId);
}
