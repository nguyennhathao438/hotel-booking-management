package com.hotelbooking.hotel_booking.repository;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.HotelService;
import com.hotelbooking.hotel_booking.service.dichvu;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<HotelService,Integer> {
    List<HotelService> findByHotel(Hotel hotel);
}
