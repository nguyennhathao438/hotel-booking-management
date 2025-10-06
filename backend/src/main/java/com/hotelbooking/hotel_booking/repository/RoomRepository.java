package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room,Integer> {
    boolean existsByRoomName(String roomName);

    List<Room> findAllByHotel_HotelId(Integer hotelHotelId);
}
