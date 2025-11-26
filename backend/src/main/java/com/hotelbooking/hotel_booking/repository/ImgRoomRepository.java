package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.ImgRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImgRoomRepository extends JpaRepository<ImgRoom, Integer> {
    List<ImgRoom> findByRoom_RoomId(int roomId);
}
