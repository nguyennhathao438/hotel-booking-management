package com.hotelbooking.hotel_booking.repository;
import com.hotelbooking.hotel_booking.entity.HotelService;
import com.hotelbooking.hotel_booking.service.dichvu;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface ServiceRepository extends JpaRepository<HotelService,Integer> {
}
