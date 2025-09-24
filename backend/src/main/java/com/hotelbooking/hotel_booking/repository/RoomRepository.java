package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room,Integer> {
    boolean existsByRoomName(String roomName);
}
